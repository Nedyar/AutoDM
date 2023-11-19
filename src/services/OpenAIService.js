import OpenAI from "openai";
import { readFileSync } from "fs";

export class OpenAIService {
	static instance;
	static openai;
	static assistant;
	static thread;
	static run;
	static lastRun;

	static getInstance() {
		if (!this.instance) this.instance = new OpenAIService();
		return this.instance;
	}

	constructor() {
		this.openai = new OpenAI({ apiKey: process.env.API_KEY });
	}

	async initialize(playersPromp) {
		let initialPromp = readInstuctionsFromFile("GPT_init_query");
		for (let playerId in playersPromp) {
			initialPromp =
				initialPromp +
				`· ${playersPromp[playerId].name}, lvl${playersPromp[playerId].lvl} ${playersPromp[playerId].raze} ${playersPromp[playerId].class}\n`;
		}

		initialPromp = initialPromp + readInstuctionsFromFile("GPT_second_query");

		this.assistant = await this.openai.beta.assistants.create({
			name: process.env.NAME,
			instructions: initialPromp,
			tools: [{ type: process.env.TYPE }],
			model: process.env.MODEL,
		});

		this.thread = await this.openai.beta.threads.create();

		this.run = await this.openai.beta.threads.runs.create(this.thread.id, {
			assistant_id: this.assistant.id,
		});

		let now = new Date();
		let timeDifference;
		if (this.lastRun) {
			timeDifference = now - this.lastRun;
			timeDifference = timeDifference / 1000;
		} else {
			timeDifference = 20;
		}
		if (timeDifference >= 20) {
			//this.run = await this.openai.beta.threads.runs.retrieve(this.thread.id, this.run.id);
		} else {
			//
		}
		this.lastRun = now;
		const response = await checkRunStatus(this.openai, this.thread.id, this.run.id);
		return response;
	}
}

async function checkRunStatus(openai, threadId, createRunId) {
	const run = await openai.beta.threads.runs.retrieve(threadId, createRunId);

	if (run.status === "in_progress") {
		// Use a Promise to properly handle setTimeout
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Recursively call checkRunStatus
		return checkRunStatus(openai, threadId, createRunId);
	} else {
		const messages = await openai.beta.threads.messages.list(threadId);
		return messages.data;
	}
}

function readInstuctionsFromFile(file) {
	try {
		const inst = readFileSync(`./resources/${file}.txt`, "utf8");
		return inst;
	} catch (error) {
		console.error("Error reading instructions from file:", error.message);
		process.exit(1);
	}
}
