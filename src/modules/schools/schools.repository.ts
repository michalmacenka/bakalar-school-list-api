import axios, { AxiosResponse } from "axios";
import fs from "fs";

interface receiveSchool {
	name: string;
	schoolUrl: string;
	id: string;
}
interface responseSchool {
	name: string;
	url: string;
	id: string;
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
	const schools: responseSchool[] = [];
	for (const letter of alphabet) {
		try {
			const response: AxiosResponse<{
				name: string;
				schools: receiveSchool[];
			}> = await axios({
				baseURL: process.env.SCHOOLS_URL,
				headers: { accept: "application/json" },
				url: encodeURI(letter),
			});
			console.log("success");
			response.data.schools.forEach(({ name, schoolUrl, id }) => {
				schools.push({
					name,
					url: schoolUrl,
					id,
				});
			});
		} catch (err) {
			console.error("err");
		}
	}
	fs.writeFile(filePath, JSON.stringify(schools), "utf-8", () => {
		console.log("List of schools was generated");
	});
};

export { getSchoolsList };
