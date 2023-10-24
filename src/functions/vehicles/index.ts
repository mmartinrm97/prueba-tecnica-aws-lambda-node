
import { handlerPath } from '@libs/handler-resolver';

export const getVehiclesDataById =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'star-wars/vehicles/{id}',
      },
    },
  ],
};
