import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyEnv from "@fastify/env";
import fastifyStatic from "@fastify/static";
import schedule from "node-schedule";

import path from "path";

import schoolsRoutes from "./modules/schools/schools.route";
import { getSchoolsList } from "./modules/schools/schools.repository";

const app = Fastify();

const envSchema = {
	type: "object",
	required: ["SCHOOLS_URL"],
	properties: {
		SCHOOLS_URL: {
			type: "string",
		},
	},
};

const initialize = () => {
	app.register(schoolsRoutes, { prefix: "schools-list" });
	app.register(fastifyCors, {
		credentials: true,
		origin: true,
	});
	app.register(fastifyHelmet, { global: true });
	app.register(fastifyEnv, {
		schema: envSchema,
		dotenv: true,
	});
	app.after((err) =>
		err ? console.log(err) : console.log("Env Plugin is ready.")
	);

	app.register(fastifyStatic, {
		root: path.join(__dirname, "../data"),
	});
};
initialize();

const main = async () => {
	schedule.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 7 }, getSchoolsList);
	const port = 3000;
	try {
		await app.ready();
		await app.listen({ port });
		console.log(`Server ready at http://localhost:${port}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
main();
