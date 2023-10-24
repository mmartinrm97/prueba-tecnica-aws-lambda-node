
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { FilmStarWarsES } from './../../../interfaces/star-wars-es';
import { isMatch } from 'date-fns';
import { formatJSONResponse } from './../../../libs/api-gateway';
import dynamoDBClient from './../../../dynamodb/useDynamoDB';

const TABLE_NAME = 'FilmsTable'

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const requestBody: FilmStarWarsES = JSON.parse(event.body);
        const errors: any = {};

        // Validate required fields
        const requiredFields = ['titulo', 'episodio_id', 'apertura', 'director', 'productor', 'fecha_estreno'];
        for (const field of requiredFields) {
            if (!requestBody[field]) {
                if (!errors[field]) {
                    errors[field] = [];
                }
                errors[field].push(`El campo '${field}' es requerido.`);
            }
        }

        //check if requestBody.episodio_id exists
        if (requestBody.episodio_id) {
            //check if requestBody.episodio_id is a number
            if (isNaN(requestBody.episodio_id)) {
                if (!errors?.episodio_id) {
                    errors.episodio_id = [];
                }
                errors.episodio_id.push(`El campo 'episodio_id' debe ser un número.`);
            }
        }

        //First check if requestBody.fecha_estreno exists
        if (requestBody.fecha_estreno) {
            //check if requestBody.fecha_estreno is a valid date
            if (!isMatch(requestBody.fecha_estreno, 'yyyy-MM-dd')) {
                if (!errors?.fecha_estreno) {
                    errors.fecha_estreno = [];
                }
                errors.fecha_estreno.push("El campo 'fecha_estreno' debe tener el formato 'yyyy-MM-dd'.");
            }
        }


        if (Object.keys(errors).length > 0) {
            // There are errors, return them to the client
            return formatJSONResponse({
                message: 'No se pudo crear la película.',
                errors
            }, 422);
        }


        const newResourceId = randomUUID()
        
        // Add created and edited dates
        const fechaCreacion = new Date().toISOString();
        const fechaEdicion = new Date().toISOString();

        const params = {
            TableName: TABLE_NAME,
            Item: { id: newResourceId, creado: fechaCreacion, editado: fechaEdicion, ...requestBody },
        };

        await dynamoDBClient.put(params).promise();


        return formatJSONResponse({
            message: 'Película creada exitosamente.',
            data: params.Item,
        }, 201);
    } catch (error) {
        return formatJSONResponse({ error: 'Error de Servidor.' }, 500);
    }
}
