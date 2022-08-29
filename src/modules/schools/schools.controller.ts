import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';

const schoolsHandler = (req: FastifyRequest, res: FastifyReply) => {
  fs.readFile('./data/schoolsList.json', (err, data) => {
    res
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(err || data);
  });
};

export { schoolsHandler };
