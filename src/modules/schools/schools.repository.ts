import axios, { AxiosResponse } from "axios";
import moment from "moment";
import fs from "fs";

interface receiveSchool {
	name: string;
	schoolUrl: string;
	id: string;
}
interface responseSchool {
	name: string;
	url: string;
	id?: string;
}

const filePath = "./data/schoolsList.json";

const alphabet = [
	"a",
	"á",
	"b",
	"c",
	"č",
	"d",
	"ď",
	"e",
	"é",
	"ě",
	"f",
	"g",
	"h",
	"ch",
	"i",
	"í",
	"j",
	"k",
	"l",
	"m",
	"n",
	"ň",
	"o",
	"ó",
	"p",
	"q",
	"r",
	"ř",
	"s",
	"š",
	"t",
	"ť",
	"u",
	"ú",
	"ů",
	"v",
	"w",
	"x",
	"y",
	"ý",
	"z",
	"ž",
];

const getSchoolsList = async () => {
	let logFile = fs.createWriteStream(
		`./logs/${moment().format("YYYY-MM-DD")}.log`,
		"utf-8"
	);
	logFile.on("error", () =>
		console.log(`${moment().format("YYYY-MM-DD hh:mm:ss")} log failed`)
	);

	const message = (text: string) =>
		logFile.write("\n " + moment().format("hh:mm:ss") + "  |  " + text);
	logFile.write("LOG " + moment().format("YYYY-MM-DD").toString());
	logFile.write("\n------------------\n");
	message("Started generating schools list\n");

	const schools: responseSchool[] = [];
	for (const letter of alphabet) {
		try {
			message(`Fetching letter '${letter}'`);
			const response: AxiosResponse<{
				name: string;
				schools: receiveSchool[];
			}> = await axios({
				baseURL: process.env.SCHOOLS_URL,
				headers: { accept: "application/json" },
				url: encodeURI(letter),
			});
			response.data.schools.forEach(({ name, schoolUrl, id }) => {
				schools.push({
					name,
					url: schoolUrl,
					// id,
				});
			});
			message("Success\n");
		} catch (err) {
			message("ERROR - " + (err as Error).message + "\n");
		}
	}
	fs.writeFile(filePath, JSON.stringify(schools), "utf-8", (err) =>
		message(err ? "ERROR - " + err.message : "List of schools was generated")
	);
	message("\n\n Fetching is DONE\n\n\n");

	logFile.end(() =>
		console.log(`${moment().format("YYYY-MM-DD hh:mm:ss")} log was finished`)
	);
};

export { getSchoolsList };
