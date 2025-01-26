import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const genAI = new GoogleGenerativeAI("AIzaSyC3GRnyUHwALJhOFcmDQvZP5fJ3mEzF1HE");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const GeminiServiceContent = async(prompt) => {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const htmlContent = marked(response);
    return htmlContent
}

export default GeminiServiceContent