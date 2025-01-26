import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GeminiServiceContent = async(prompt) => {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const htmlContent = marked(response);
    return htmlContent
}

export default GeminiServiceContent