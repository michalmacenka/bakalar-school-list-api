import { FastifyInstance } from 'fastify';
import { schoolsHandler } from './schools.controller';

const schoolsRoutes = async (app: FastifyInstance) => {
  app.get('/', schoolsHandler);
};

export default schoolsRoutes;
