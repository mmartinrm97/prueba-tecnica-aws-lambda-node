import * as AWS from 'aws-sdk';

let options = {};

// Conéctate a la base de datos local si se está ejecutando offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    sslEnabled: false,
  };
}

const dynamoDBClient  = new AWS.DynamoDB.DocumentClient(options);

export default dynamoDBClient ;
