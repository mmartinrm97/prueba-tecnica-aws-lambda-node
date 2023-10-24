
import { handlerPath } from '@libs/handler-resolver';

export const getSwapiData =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/{id}',
      },
    },
  ],
};
