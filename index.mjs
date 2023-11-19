import { readFileSync, createReadStream } from "fs";
import OpenAI from "openai";

// Function to read API key from file
function readApiKeyFromFile() {
	try {
		const apiKey = readFileSync("./secrets/key.key", "utf8").trim();
		return apiKey;
	} catch (error) {
		console.error("Error reading API key from file:", error.message);
		process.exit(1);
	}
}

// Function to read API key from file
function readInstuctionsFromFile() {
	try {
		const inst = readFileSync("./resources/GPT_init_query.txt", "utf8");
		return inst;
	} catch (error) {
		console.error("Error reading API key from file:", error.message);
		process.exit(1);
	}
}

// Replace 'your-api-key' with the readApiKeyFromFile() function
const apiKey = readApiKeyFromFile();

const openai = new OpenAI({ apiKey });

/*async function main2() {
	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: "You are a helpful assistant." }],
		model: "gpt-3.5-turbo",
	});

	console.log(completion.choices[0]);
}*/

async function checkRunStatus(threadId, createRunId) {
	const run = await openai.beta.threads.runs.retrieve(threadId, createRunId);

	if (run.status === "in_progress") {
		// Llamar recursivamente después de 20 segundos
		setTimeout(() => {
			checkRunStatus(threadId, createRunId);
		}, 20000);
	} else {
		const messages = await openai.beta.threads.messages.list(threadId);

		let datas = messages.data;
		for (let dataid in datas) {
			console.log(datas[dataid].content);
		}
	}
}

async function main() {
	const assistant = await openai.beta.assistants.create({
		name: "Your automatic DM",
		instructions: readInstuctionsFromFile(),
		tools: [{ type: "code_interpreter" }],
		model: "gpt-3.5-turbo-1106",
		//model: "gpt-4-1106-preview",
	});

	const thread = await openai.beta.threads.create();

	const initialMessage = await openai.beta.threads.messages.create(thread.id, {
		role: "user",
		content: "We are two players. Dreina, a lvl 3 elf druid and Jose, a lvl 2 human paladin",
	});

	const createRun = await openai.beta.threads.runs.create(thread.id, {
		assistant_id: assistant.id,
	});

	//console.log(messages);

	checkRunStatus(thread.id, createRun.id);
}

main();
