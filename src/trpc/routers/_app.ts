import {  createTRPCRouter } from '../init';
import { ImageRouter } from './images/procedure';
export const appRouter = createTRPCRouter({
  images:ImageRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;