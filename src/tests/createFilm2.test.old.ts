import { main } from "../functions/films/findFilmById/handler";
import { APIGatewayProxyEvent } from "aws-lambda";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock DynamoDB Client
jest.mock("../dynamodb/useDynamoDB", () => {
  const mockGet = jest.fn();
  return {
    get: jest.fn().mockReturnThis(),
    promise: mockGet,
  };
});

// Mock SWAPI Axios
const mockAxios = new MockAdapter(axios);
mockAxios.onGet("https://swapi.dev/api/films/1").reply(200, {
  title: "Example Film",
  episode_id: 1,
  opening_crawl: "A long time ago in a galaxy far, far away...",
  director: "Test Director",
  producer: "Test Producer",
  release_date: "2023-10-31",
});

describe("Find Film By Id Handler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the film data from DynamoDB if it exists", async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      pathParameters: { id: "1" },
    } as any;

    // Act
    const response = await main(event, null, null) as any;

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(JSON.parse(response.body)).toEqual({ title: "Example Film" });

    // Verify DynamoDB client was called with correct parameters
    const mockDynamoDBClient = require("../dynamodb/useDynamoDB").default;
    expect(mockDynamoDBClient.get).toHaveBeenCalledWith({
      TableName: "FilmsTable",
      Key: { id: "1" },
    });

    // Verify SWAPI was not called
    expect(mockAxios.history.get.length).toBe(0);
  });

  it("should return the film data from SWAPI if it does not exist in DynamoDB", async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      pathParameters: { id: "1" },
    } as any;

    // Act
    const response = await main(event, null, null) as any;

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(JSON.parse(response.body)).toEqual({
      title: "Example Film",
      episode_id: 1,
      opening_crawl: "A long time ago in a galaxy far, far away...",
      director: "Test Director",
      producer: "Test Producer",
      release_date: "2023-10-31",
    });

    // Verify DynamoDB client was called with correct parameters
    const mockDynamoDBClient = require("../dynamodb/useDynamoDB").default;
    expect(mockDynamoDBClient.get).toHaveBeenCalledWith({
      TableName: "FilmsTable",
      Key: { id: "1" },
    });

    // Verify SWAPI was called with correct parameters
    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe("/films/1");

    // Verify DynamoDB client was called with correct parameters
    expect(mockDynamoDBClient.put).toHaveBeenCalledWith({
      TableName: "FilmsTable",
      Item: {
        id: "1",
        title: "Example Film",
        episode_id: 1,
        opening_crawl: "A long time ago in a galaxy far, far away...",
        director: "Test Director",
        producer: "Test Producer",
        release_date: "2023-10-31",
      },
    });
  });

  it("should return an error response if there is an error in the implementation", async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      pathParameters: { id: "1" },
    } as any;

    // Mock DynamoDB client to throw an error
    const mockDynamoDBClient = require("../dynamodb/useDynamoDB").default;
    mockDynamoDBClient.get.mockImplementationOnce(() => {
      throw new Error("Test Error");
    });

    // Act
    const response = await main(event, null, null) as any;

    // Assert
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
    expect(JSON.parse(response.body)).toEqual({
      error: "Error de Servidor.",
    });
  });
});
