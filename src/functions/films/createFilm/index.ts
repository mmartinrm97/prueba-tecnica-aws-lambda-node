
import { handlerPath } from '@libs/handler-resolver';

export const createFilm =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'star-wars/films',
        // documentation:{
        //   summary: 'Create a film',
        //   description: 'Create a film',
        //   methodResponses: [
        //     {
        //       statusCode: 201,
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
        //       statusCode: 422,
        //       responseBody: {
        //         description: 'The film was not created',
        //         content: {
        //           'application/json': {
        //             schema: {
        //               $ref: '#/components/schemas/BadRequest',
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
