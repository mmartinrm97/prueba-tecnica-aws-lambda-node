
import { handlerPath } from '@libs/handler-resolver';

export const getSpecieDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/species/{id}',
      },
    },
  ],
};
