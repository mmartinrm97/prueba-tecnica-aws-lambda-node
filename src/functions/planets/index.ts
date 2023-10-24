
import { handlerPath } from '@libs/handler-resolver';

export const getPlanetDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 30,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/planets/{id}',
      },
    },
  ],
};
