import type { AWS } from '@serverless/typescript';

import { tableResources } from './src/resources/tableResources';
import { getPeopleDataById } from './src/functions/people/index';
import { getSpecieDataById } from './src/functions/species/index';
import { getStarshipsDataById } from './src/functions/starships/index';
import { getVehiclesDataById } from './src/functions/vehicles/index';
import { getPlanetDataById } from './src/functions/planets/index';
import { createFilm, getFilmDataById } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aws-lambda-node-test',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    getFilmDataById,
    createFilm,
    getPeopleDataById,
    getSpecieDataById,
    getStarshipsDataById,
    getVehiclesDataById,
    getPlanetDataById
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
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
        noStart: true, // Comenta esta línea si no tienes una instancia de DynamoDB en ejecución localmente.
      },
      migration: {
        dir: 'src/dynamodb/offline/migrations',
      },
    }

  },
  resources: tableResources
};

module.exports = serverlessConfiguration;
