
import { handlerPath } from '@libs/handler-resolver';

export const getFilmDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/films/{id}',
      },
    },
  ],
};
