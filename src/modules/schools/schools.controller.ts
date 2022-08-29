import { FastifyReply, FastifyRequest } from 'fastify';

const schoolsHandler = (req: FastifyRequest, res: FastifyReply) => {
  res
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ hello: 'world' });
};

export { schoolsHandler };
