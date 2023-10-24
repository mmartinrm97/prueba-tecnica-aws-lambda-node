import {APIGatewayProxyEvent} from "aws-lambda";
import dynamoDBClient from "../dynamodb/useDynamoDB";
import {main} from "../../src/functions/films/findFilmById/handler";
import useApi from "../api/useApi";

// Mock Axios
jest.mock("../api/useApi", () => {
    return {
        get: jest.fn(),
        post: jest.fn(),
    };
});

// Mock DynamoDB Client
jest.mock("../dynamodb/useDynamoDB", () => {
    const mockGet = jest.fn();
    return {
        get: jest.fn().mockReturnThis(),
        put: jest.fn().mockReturnThis(),
        promise: mockGet,
    }
});

describe("Find Film By Id Handler", () => {


    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return the film data from DynamoDB if it exists", async () => {
        // Set up the event object with the path parameter
        const event: APIGatewayProxyEvent = {
            pathParameters: { id: "123" },
        } as any;

        // Set up the mock response from DynamoDB
        const mockDynamoDBResponse = {
            Item: {
                // id: "123",
                title: "Example Film",
                episode_id: 1,
                opening_crawl: "A long time ago in a galaxy far, far away...",
                director: "Test Director",
                producer: "Test Producer",
                release_date: "2023-10-31",
            },
        };
        const mockGet = dynamoDBClient.get as jest.Mock;
        mockGet.mockReturnValueOnce({
            promise: jest.fn().mockResolvedValueOnce(mockDynamoDBResponse),
        });

        // Call the main function and get the response
        const response = await main(event, null, null) as any;

        // Verify that the response is correct
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify({ data: mockDynamoDBResponse.Item }));
    });

    it("should return the film data when the item does not exist in DynamoDB but it exists in the SWAPI API", async () => {
        // Set up the event object with the path parameter
        const event: APIGatewayProxyEvent = {
            pathParameters: { id: "456" },
        } as any;

        // Set up the mock response from DynamoDB
        const mockDynamoDBResponse = {};
        const mockGet = dynamoDBClient.get as jest.Mock;
        mockGet.mockReturnValueOnce({
            promise: jest.fn().mockResolvedValueOnce(mockDynamoDBResponse),
        });

        // Set up the mock response from SWAPI Axios
        const mockAxiosResponse = {
            data: {
                titulo: "Example Film",
                episodio_id: 1,
                apertura: "A long time ago in a galaxy far, far away...",
                director: "Test Director",
                productor: "Test Producer",
                fecha_estreno: "2023-10-31",
            },
        };

        const mockUseApiGet = useApi.get as jest.Mock; // Utiliza useApi para mockear la respuesta
        mockUseApiGet.mockResolvedValueOnce(mockAxiosResponse);

        // Call the main function and get the response
        const response = await main(event, null, null) as any;

        // Verify that the response is correct
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify({ data: mockAxiosResponse.data }));
    });


    it("should return 404 when the film is not found in dynamodb or in the API", async () => {
        // Set up the event object with the path parameter
        const event: APIGatewayProxyEvent = {
            pathParameters: { id: "9999999" },
        } as any;

        // Set up the mock response from DynamoDB (no item found)
        const mockDynamoDBResponse = {};
        const mockDynamoDBGet = dynamoDBClient.get as jest.Mock;
        mockDynamoDBGet.mockReturnValueOnce({
            promise: jest.fn().mockResolvedValueOnce(mockDynamoDBResponse),
        });

        // Set up the mock response from SWAPI (no item found)
        const mockAxiosResponse = {

        };
        const mockUseApiGet = useApi.get as jest.Mock;
        mockUseApiGet.mockResolvedValueOnce(mockAxiosResponse);


        // Call the main function and get the response
        const response = await main(event, null, null) as any;

        // Verify that the response is correct
        expect(response.statusCode).toBe(404);
        expect(response.body).toBe(
            JSON.stringify({ error: "No se encontró la película." })
        );
    });

    it("should return 500 when there is a server error", async () => {
        // Set up the event object with the path parameter
        const event: APIGatewayProxyEvent = {
            pathParameters: { id: "789" },
        } as any;

        // Set up the mock response from DynamoDB
        const mockError = new Error("Test error");
        const mockGet = dynamoDBClient.get as jest.Mock;
        mockGet.mockReturnValueOnce({
            promise: jest.fn().mockRejectedValueOnce(mockError),
        });

        // Call the main function and get the response
        const response = await main(event, null, null) as any;

        // Verify that the response is correct
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe(
            JSON.stringify({ error: "Error de Servidor." })
        );
    });
});
