import { translateAttributes } from '../../../utils/translationUtils';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { FilmStarWars } from '../../../interfaces/star-wars';
import dynamoDBClient from '../../../dynamodb/useDynamoDB';
import { filmTranslation } from "../../../utils/translations";
import { formatJSONResponse } from "./../../../libs/api-gateway";
import useApi from "../../../api/useApi";
import { AxiosError } from 'axios';

const TABLE_NAME = 'FilmsTable'
const MODEL_ROUTE = 'films'

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {

        // Obtener el id de los parametros
        const { id } = event.pathParameters

        // Verificar si los datos existen en DynamoDB
        const params = {
            TableName: TABLE_NAME,
            Key: { id }
        }

        const dbResponse = await dynamoDBClient.get(params).promise();

        if (dbResponse && dbResponse.Item) {

            // Los datos están en la base de datos, devuelve los datos traducidos sin el id
            const resultWithoutId = { ...dbResponse.Item };
            delete resultWithoutId.id;

            return formatJSONResponse({
                data: resultWithoutId,
            });
        }


        // Los datos no están en la base de datos, realiza una solicitud a la API SWAPI
        const response = await useApi.get<FilmStarWars>(`/${MODEL_ROUTE}/${id}`)

        // check if response is instance of AxiosResponse
        if (!response.data) {
            return formatJSONResponse({ error: 'No se encontró la película.' }, 404);
        }

        // Traducir los atributos de inglés a español
        const translatedData = translateAttributes(response.data, filmTranslation);

        // Agrega el id al objeto de datos traducidos
        translatedData.id = id;

        // Almacena los datos en la base de datos antes de devolverlos al cliente
        await dynamoDBClient.put({
            TableName: TABLE_NAME,
            Item: translatedData,
        }).promise();

        // Retorna los datos traducidos al cliente sin el id
        const resultWithoutId = { ...translatedData };
        delete resultWithoutId.id;

        return formatJSONResponse({
            data: resultWithoutId
        })

    } catch (error) {

        //check if error is instance of AxiosError
        if (error.isAxiosError) {
            const axiosError = error as AxiosError;
            return formatJSONResponse({ error: 'No se encontró la película.' }, axiosError.response?.status);
        }

        return formatJSONResponse({ error: 'Error de Servidor.' }, 500);

    }
}
