import { APIGatewayProxyEvent } from "aws-lambda";
import dynamoDBClient from "../dynamodb/useDynamoDB";
import { main } from "../../src/functions/films/createFilm/handler";
import {FilmStarWarsES} from "../interfaces/star-wars-es";

// Mock DynamoDB Client
jest.mock("../dynamodb/useDynamoDB", () => {
    const mockPut = jest.fn();
    return {
        put: jest.fn().mockReturnThis(),
        promise: mockPut,
    }
});

describe("Create Film Handler", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a film and return the result", async () => {
        // Set up the event object with the film data in the request body
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
                titulo: 'A New Hope',
                episodio_id: 4,
                apertura: 'It is a period of civil war...',
                director: 'George Lucas',
                productor: 'Gary Kurtz, Rick McCallum',
                fecha_estreno: '1977-05-25',
            } as FilmStarWarsES),
        } as APIGatewayProxyEvent;

        // Set up the mock response from DynamoDB (successful creation)
        const mockDynamoDBResponse = {};
        const mockDynamoDBPut = dynamoDBClient.put as jest.Mock;
        mockDynamoDBPut.mockReturnValueOnce({
            promise: jest.fn().mockResolvedValueOnce(mockDynamoDBResponse),
        });

        // Call the main function and get the response
        const response = await main(event, null, null) as any;

        // Verify that the response is correct
        expect(response.statusCode).toBe(201)
        expect(response.body).toBeDefined();
        expect(JSON.parse(response.body)).toMatchObject({
            message: 'Película creada exitosamente.',
            data: {
                id: expect.any(String),
                titulo: 'A New Hope',
                episodio_id: 4,
                apertura: 'It is a period of civil war...',
                director: 'George Lucas',
                productor: 'Gary Kurtz, Rick McCallum',
                fecha_estreno: '1977-05-25',
            },
        });
    });

    it("should return a 422 error if the request body is invalid", async () => {
        // Set up the event object with the film data in the request body
        const mockInvalidEvent = {
            body: JSON.stringify({
                titulo: 'A New Hope',
                episodio_id: 4,
                apertura: 'It is a period of civil war...',
                director: 'George Lucas',
                productor: 'Gary Kurtz, Rick McCallum',
                // fecha_estreno is missing
            }),
        } as APIGatewayProxyEvent;

        const response = await main(mockInvalidEvent, null, null) as any;

        expect(response.statusCode).toBe(422);
        expect(response.body).toBeDefined();
        expect(JSON.parse(response.body)).toMatchObject({
            message: 'No se pudo crear la película.',
            errors: {
                fecha_estreno: ["El campo 'fecha_estreno' es requerido."],
            },
        });
    });

    it("should return a 422 error if the request body fecha_estreno format is not yyyy-MM-dd", async () => {
        // Set up the event object with the film data in the request body
        const mockInvalidEvent = {
            body: JSON.stringify({
                titulo: 'A New Hope',
                episodio_id: 4,
                apertura: 'It is a period of civil war...',
                director: 'George Lucas',
                productor: 'Gary Kurtz, Rick McCallum',
                fecha_estreno: '1977-05-25T10:00:00.000Z',
            }),
        } as APIGatewayProxyEvent;

        const response = await main(mockInvalidEvent, null, null) as any;

        expect(response.statusCode).toBe(422);
        expect(response.body).toBeDefined();
        expect(JSON.parse(response.body)).toMatchObject({
            message: 'No se pudo crear la película.',
            errors: {
                fecha_estreno: ["El campo 'fecha_estreno' debe tener el formato 'yyyy-MM-dd'."],
            },
        });
    })

    it("should return a 500 error if the film could not be created", async () => {
        // Set up the event object with the film data in the request body
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
                titulo: 'A New Hope',
                episodio_id: 4,
                apertura: 'It is a period of civil war...',
                director: 'George Lucas',
                productor: 'Gary Kurtz, Rick McCallum',
                fecha_estreno: '1977-05-25',
            } as FilmStarWarsES),
        } as APIGatewayProxyEvent;

        // Set up the mock response from DynamoDB (failed creation)
        const mockDynamoDBResponse = {};
        const mockDynamoDBPut = dynamoDBClient.put as jest.Mock;
        mockDynamoDBPut.mockReturnValueOnce({
            promise: jest.fn().mockRejectedValueOnce(mockDynamoDBResponse),
        });

        // Call the main function and get the response
        const response = await main(event, null, null) as any;

        // Verify that the response is correct
        expect(response.statusCode).toBe(500);
        expect(response.body).toBeDefined();
        expect(JSON.parse(response.body)).toMatchObject({
            error: 'Error de Servidor.'
        });
    });
});
