import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

import schoolsRoutes from './modules/schools/schools.route';

const app = Fastify();
const port = 3000;

const main = async () => {
  app.register(schoolsRoutes, { prefix: 'schools-list' });

  app.register(fastifyCors, {
    credentials: true,
    origin: true,
  });
  app.register(fastifyHelmet, { global: true });

  try {
    await app.listen({ port });
    console.log(`Server ready at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();
