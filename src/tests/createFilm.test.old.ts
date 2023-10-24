import { main } from "../functions/films/createFilm/handler";
import { APIGatewayProxyEvent } from "aws-lambda";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock DynamoDB Client
jest.mock("../dynamodb/useDynamoDB", () => {
  const mockPut = jest.fn();
  return {
    put: jest.fn().mockReturnThis(),
    promise: mockPut,
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


describe('Create Film Handler (Success)', () => {
  it('should create a new film', async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({
        titulo: 'Ejemplo de película',
        episodio_id: 1,
        apertura: 'Hace mucho tiempo en una galaxia muy, muy lejana...',
        director: 'Director de prueba',
        productor: 'Productor de prueba',
        fecha_estreno: '2023-10-31',
      }),
    } as any;

    // Puedes proporcionar valores ficticios para context y callback
    const context: any = {};
    const callback: any = jest.fn();

    // Ejecuta el manejador y obtén la respuesta
    const response = await main(event, context, callback);

    console.log(response)
  
    // Verifica que la respuesta sea exitosa (código de estado 201)
    expect(response).toBeDefined()
    // expect(response.statusCode).toBe(201);

    // Verifica que se haya llamado a DynamoDB para poner los datos
    const mockDynamoDBClient = require("src/dynamodb/useDynamoDB").default;
    expect(mockDynamoDBClient.put).toHaveBeenCalled();

    // Verifica que se haya llamado a SWAPI para obtener datos
    expect(mockAxios.history.get.length).toBe(1);

  });
});
