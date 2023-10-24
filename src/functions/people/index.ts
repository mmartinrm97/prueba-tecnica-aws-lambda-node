
import { handlerPath } from '@libs/handler-resolver';

export const getPeopleDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/people/{id}',
      },
    },
  ],
};
