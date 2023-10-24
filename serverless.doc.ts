export const ServerlessOpenAPIDocumentation = {
  api: {
    info: {
      version: '1.0.0',
      title: 'Star Wars Films API',
      description: 'A simple API to manage Star Wars films',
      contact: {
        name: 'Miguel Ramos',
        email: 'mmartinrm3@gmail.com'
      },
      components: {
        schemas: {
          Film: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              director: {
                type: 'string',
              },
              release_date: {
                type: 'string',
              },
            },
          },
          BadRequest: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
              },
              message: {
                type: 'string',
              },
              error: {
                type: 'string',
              },
            },
          },
          NotFound: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
              },
              message: {
                type: 'string',
              },
              error: {
                type: 'string',
              },
            },
          },
        },
      },
      models: [
        {
          name: 'Film',
          contentType: 'application/json',
          schema: {
            $ref: '#/api/info/components/schemas/Film',
          },
          example: {
            id: '1',
            title: 'A New Hope',
            director: 'George Lucas',
            release_date: '1977-05-25',
          },
        },
        {
          name: 'BadRequest',
          contentType: 'application/json',
          schema: {
            $ref: '#/api/info/components/schemas/BadRequest',
          },
          example: {
            statusCode: 422,
            message: 'The film was not created',
            error: 'Unprocessable Entity',
          },
        },
        {
          name: 'NotFound',
          contentType: 'application/json',
          schema: {
            $ref: '#/api/info/components/schemas/NotFound',
          },
          example: {
            statusCode: 404,
            message: 'The film was not found',
            error: 'Not Found',
          },
        },
      ],
      tags: [
        {
          name: 'films',
          description: 'Films management',
        },
      ],
      paths: {
        '/star-wars/films': {
          post: {
            tags: ['films'],
            summary: 'Create a film',
            description: 'Create a film',
            operationId: 'createFilm',
            requestBody: {
              description: 'The film to create',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/api/info/components/schemas/Film',
                  },
                  example: {
                    title: 'A New Hope',
                    director: 'George Lucas',
                    release_date: '1977-05-25',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'The film',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/api/info/components/schemas/Film',
                    },
                  },
                },
              },
              422: {
                description: 'The film was not created',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/api/info/components/schemas/BadRequest',
                    },
                  },
                },
              },
            },
          },
        },
        '/star-wars/films/{id}': {
          get: {
            tags: ['films'],
            summary: 'Get a film by id',
            description: 'Get a film by id',
            operationId: 'getFilmDataById',
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'The id of the film',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'The film',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/api/info/components/schemas/Film',
                    },
                  },
                },
              },
              404: {
                description: 'The film was not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/api/info/components/schemas/NotFound',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};