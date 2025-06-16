import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit, Genkit } from "genkit";

const ai = genkit({
    plugins: [googleAI()],
    model: gemini20Flash,
})

(async () => {
    const {text} = await ai.generate(
        'Write a short story about a robot learning to love'
    );
    console.log(text);
})();