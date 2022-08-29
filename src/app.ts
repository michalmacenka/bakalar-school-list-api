import Fastify from 'fastify';

import schoolsRoutes from './modules/schools/schools.route';

const app = Fastify();
const port = 3000;

const main = async () => {
  app.register(schoolsRoutes, { prefix: 'schools-list' });

  try {
    await app.listen({ port });
    console.log(`Server ready at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();
