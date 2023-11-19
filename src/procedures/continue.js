import { OpenAIService } from "../services/OpenAIService.js";

export default (playersPromp) => {
	const openAIService = OpenAIService.getInstance();
	return new Promise((resolve, reject) => {
		openAIService
			.continue(playersPromp)
			.then((response) => {
				resolve({
					success: true,
					response: response,
				});
			})
			.catch((error) => reject(error));
	});
};
