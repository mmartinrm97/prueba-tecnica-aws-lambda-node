
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

        // Validar que los campos requeridos estén presentes
        const requiredFields = ['titulo', 'episodio_id', 'apertura', 'director', 'productor', 'fecha_estreno'];
        for (const field of requiredFields) {
            if (!requestBody[field]) {
                if (!errors[field]) {
                    errors[field] = [];
                }
                errors[field].push(`El campo '${field}' es requerido.`);
            }
        }

        // Validar que el episodio_id sea un número
        if (typeof requestBody.episodio_id !== 'number') {
            if (!errors?.episodio_id) {
                errors.episodio_id = [];
            }
            errors?.episodio_id.push(`El campo 'episodio_id' debe ser un número.`);
        }

        //Validar que la fecha de estreno sea en formato yyyy-MM-dd
        if (!isMatch(requestBody.fecha_estreno, 'yyyy-MM-dd')) {
            if (!errors?.fecha_estreno) {
                errors.fecha_estreno = [];
            }
            errors.fecha_estreno.push(`El campo 'fecha_estreno' debe tener el formato 'yyyy-MM-dd'.`);
        }


        if (Object.keys(errors).length > 0) {
            // Si hay errores, retornarlos todos en la respuesta
            return formatJSONResponse({
                statusCode: 422,
                errors
            }, 422);
        }


        const newResourceId = randomUUID()
        
        // Genera las fechas de creación y edición
        const fechaCreacion = new Date().toISOString();
        const fechaEdicion = new Date().toISOString();

        const params = {
            TableName: TABLE_NAME,
            Item: { id: newResourceId, creado: fechaCreacion, editado: fechaEdicion, ...requestBody },
        };

        await dynamoDBClient.put(params).promise();

        return formatJSONResponse({
            statusCode: 201,
            result: params.Item,
        }, 201);
    } catch (error) {

        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Hubo un error al crear el elemento.' }),
        };
    }
}
