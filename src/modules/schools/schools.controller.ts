import { FastifyReply, FastifyRequest } from "fastify";

import { getSchoolsList } from "./schools.repository";

const schoolsHandler = (req: FastifyRequest, res: FastifyReply) => {
	// getSchoolsList();
	res
		.code(200)
		.header("Content-Type", "application/json; charset=utf-8")
		.sendFile("schoolsList.json");
};

export { schoolsHandler };
