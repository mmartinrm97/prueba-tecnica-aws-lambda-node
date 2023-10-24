
import { handlerPath } from '@libs/handler-resolver';

export const createFilm =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'star-wars/films',
      },
    },
  ],
};
