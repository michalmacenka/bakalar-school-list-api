import Fastify from 'fastify';

const app = Fastify();
const port = 3000;

const main = async () => {
  try {
    await app.listen({ port });
    console.log(`Server ready at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();
