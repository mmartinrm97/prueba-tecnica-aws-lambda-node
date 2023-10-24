
import { handlerPath } from '@libs/handler-resolver';

export const getStarshipsDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/starships/{id}',
      },
    },
  ],
};
