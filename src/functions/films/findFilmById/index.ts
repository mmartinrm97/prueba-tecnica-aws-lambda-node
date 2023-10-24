
import { handlerPath } from '@libs/handler-resolver';

export const getFilmDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/films/{id}',
        // documentation: {
        //   summary: 'Get a film by id',
        //   description: 'Get a film by id',
        //   pathParams: [
        //     {
        //       name: 'id',
        //       description: 'The id of the film',
        //       required: true,
        //     },
        //   ],
        //   methodResponses: [
        //     {
        //       statusCode: 200,
        //       responseBody: {
        //         description: 'The film',
        //         content: {
        //           'application/json': {
        //             schema: {
        //               $ref: '#/components/schemas/Film',
        //             },
        //           },
        //         },
        //       },
        //     },
        //     {
        //       statusCode: 404,
        //       responseBody: {
        //         description: 'The film was not found',
        //         content: {
        //           'application/json': {
        //             schema: {
        //               $ref: '#/components/schemas/NotFound',
        //             },
        //           },
        //         },
        //       },
        //     },
        //   ],
        // }
      },
    },
  ],
};
