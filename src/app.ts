import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyEnv from '@fastify/env';
import fastifyStatic from '@fastify/static';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCron from 'fastify-cron';

import path from 'path';

import schoolsRoutes from './modules/schools/schools.route';
import { getSchoolsList } from './modules/schools/schools.repository';

const app = Fastify();

const envSchema = {
  type: 'object',
  required: ['SCHOOLS_URL'],
  properties: {
    SCHOOLS_URL: {
      type: 'string',
    },
  },
};

const initialize = () => {
  app.register(schoolsRoutes, { prefix: 'schools-list' });
  app.register(fastifyCors, {
    credentials: true,
    origin: true,
  });
  app.register(fastifyHelmet, { global: true });
  app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  });
  app.after(err =>
    err ? console.log(err) : console.log('Env Plugin is ready.')
  );
  app.register(fastifyRateLimit, {
    global: true,
    max: 10,
    timeWindow: '1 minute',
  });
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../data'),
  });
  app.register(fastifyCron, {
    jobs: [
      {
        cronTime: '* 0 0 * * 0',
        onTick: getSchoolsList,
      },
    ],
  });
};
initialize();

const main = async () => {
  const port = 3000;
  try {
    await app.ready();
    await app.listen({ port }, () => {
      app.cron.startAllJobs();
    });
    console.log(`Server ready at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();
