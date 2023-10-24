import { formatJSONResponse } from '@libs/api-gateway';
import { translateAttributes } from 'src/utils/translationUtils';
import useApi from 'src/api/useApi';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { PeopleStarWars } from 'src/interfaces/star-wars';
import dynamoDBClient from 'src/dynamodb/useDynamoDB';
import { peopleTranslation } from 'src/utils/translations';


export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        // Obtener el id de los parametros
        const { id } = event.pathParameters

        // Verificar si los datos existen en DynamoDB
        const params = {
            TableName: 'StarWarsTable',
            Key: { id }
        }

        const dbResponse = await dynamoDBClient.get(params).promise();

        if (dbResponse.Item) {

            // Los datos están en la base de datos, devuelve los datos traducidos sin el id
            const resultWithoutId = { ...dbResponse.Item };
            delete resultWithoutId.id;

            

            return formatJSONResponse({
                data: resultWithoutId,
            });
        }


        // Los datos no están en la base de datos, realiza una solicitud a la API SWAPI
        const response = await useApi<PeopleStarWars>(`/people/${id}`)

        // Traducir los atributos de inglés a español
        const translatedData = translateAttributes(response.data, peopleTranslation);

        // Agrega el id al objeto de datos traducidos
        translatedData.id = id;

        // Almacena los datos en la base de datos antes de devolverlos al cliente
        await dynamoDBClient.put({
            TableName: 'StarWarsTable',
            Item: translatedData,
        }).promise();


        // Retorna los datos traducidos al cliente sin el id
        const resultWithoutId = { ...translatedData };
        delete resultWithoutId.id;

        

        return formatJSONResponse({
            data: resultWithoutId
        })

    } catch (error) {

        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error de Servidor.' }),
        };
    }
}
