import type { AWS } from '@serverless/typescript';

import { tableResources } from './src/resources/tableResources';
import { createFilm, getFilmDataById } from '@functions/index';
import { ServerlessOpenAPIDocumentation } from './serverless.doc';

const serverlessConfiguration: AWS = {
  service: 'aws-lambda-node-test',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb', 'serverless-offline', 'serverless-openapi-documentation', 'serverless-aws-documentation'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-west-2",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // DYNAMODB_TABLE: '${self:service}-${opt:stage}'
      DYNAMODB_TABLE: 'FilmsTable'
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:*",
        ],
        Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"
        // Resource: "arn:aws:dynamodb:us-west-2:088266778728:table/FilmsTable"
      }
    ],
  },
  // import the function via paths
  functions: {
    getFilmDataById,
    createFilm,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        host: 'localhost',
        docker: true,
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        noStart: true, //Comment this line if you don't have a DynamoDB instance running locally.
      },
      migration: {
        dir: 'src/dynamodb/offline/migrations',
      },
    },
    // documentation: "$file(serverless.doc.ts)"
    //call the  serverless.doc.ts to documentation
    documentation: ServerlessOpenAPIDocumentation.api.info
  },
  resources: tableResources
};

module.exports = serverlessConfiguration;
