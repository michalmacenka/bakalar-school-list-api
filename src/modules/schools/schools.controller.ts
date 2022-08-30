import { FastifyReply, FastifyRequest } from "fastify";
import { getSchoolsList } from "./schools.repository";

const schoolsHandler = async (req: FastifyRequest, res: FastifyReply) => {
	await getSchoolsList();
	res.code(200).header("Content-Type", "application/json; charset=utf-8");
};

export { schoolsHandler };
