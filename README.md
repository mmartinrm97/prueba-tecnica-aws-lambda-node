# Proyecto AWS Lambda Node Test

Este proyecto es una prueba técnica para la empresa Softtek. Proporciona una API basada en AWS Lambda, Serverless Framework y TypeScript para acceder a datos de películas de Star Wars.

## Requisitos

Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- [Node.js](https://nodejs.org/): La versión recomendada es 14.15.0 o superior.
- [Serverless Framework](https://www.serverless.com/): Puedes instalarlo globalmente con `npm install -g serverless`.
- [Docker](https://www.docker.com/): Necesario para ejecutar DynamoDB localmente.
- AWS CLI: Configura tu perfil de AWS con las credenciales necesarias para desplegar en AWS.

## Configuración

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/aws-lambda-node-test.git
   cd aws-lambda-node-test
   ```

2. Instala las dependencias del proyecto:

    - Usando npm:

        ```bash
        npm install
        ```

    - Usando yarn:

        ```bash
        yarn
        ```

    - Usando pnpm:

        ```bash
        pnpm install
        ```

3. Configura tus credenciales de AWS en tu sistema local:

    Si aún no has configurado tus credenciales de AWS, puedes hacerlo con el comando aws configure.

4. Configura tu archivo serverless.ts:

    Asegúrate de configurar adecuadamente el archivo serverless.ts con tus preferencias de AWS, incluyendo el nombre de servicio, región, entorno, etc.

## Uso

### Ejecución Local

Puedes probar las funciones de AWS Lambda localmente con el siguiente comando:

```sh
pnpm run serverless:dev
```

Esto ejecutará tu proyecto en un entorno local.

### Despliegue en AWS

Para desplegar el proyecto en AWS, puedes ejecutar el siguiente comando:

```sh
serverless deploy
```

Esto desplegará las funciones en tu cuenta de AWS. Asegúrate de que tus credenciales de AWS estén configuradas adecuadamente en tu máquina.

## Estructura de Carpetas

- src: Contiene el código fuente de la aplicación.
- src/functions: Define las funciones Lambda.
- src/resources: Contiene definiciones de recursos de AWS como tablas DynamoDB.
- tests: Contiene pruebas unitarias para las funciones.

```
.
├── src
│   ├── api
│   │   └── useApi.ts
│   ├── config
│   │   └── loggerConfig.ts
│   ├── dynamodb
│   │   ├── offline
│   │   │   └── migrations
│   │   │   │   └── films.ts
│   │   ├── docker-compose.yml
│   │   ├── Dockerfile
│   │   └── useDynamoDB.ts
│   ├── functions
│   │   ├── films
│   │   │   ├── createFilm
│   │   │   │   ├── handler.ts
│   │   │   │   └── index.ts
│   │   │   ├── findFilmById
│   │   │   │   ├── handler.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── interfaces
│   │   ├── star-wars-es.ts
│   │   └── star-wars.ts
│   ├── libs
│   │   ├── api-gateway.ts
│   │   ├── handler-resolver.ts
│   │   └── lambda.ts
│   ├── resources
│   │   └── tableResources.ts
│   ├── tests
│   │   ├── createFilm.test.ts
│   │   └── getFilmDataById.test.ts
│   └── utils
│   │   ├── apiBaseURL.ts
│   │   ├── translations.ts
│   │   └── translationUtils.ts
├── node_modules
├── dist
├── package.json
├── serverless.ts
├── tsconfig.json
├── tsconfig.paths.json
└── webpack.config.js
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.
