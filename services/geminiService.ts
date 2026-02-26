import { GoogleGenAI } from "@google/genai";

const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const mainSystemInstruction = `
Eres un 'Asistente de Soporte Digital', una inteligencia artificial profesional, paciente y clara.
Tu única misión es ayudar a los usuarios a resolver dudas sobre el uso de tecnología, como smartphones y ordenadores, en el contexto de un programa de formación.
Tus reglas son:
1.  Utiliza un lenguaje formal, sencillo y preciso. Evita la jerga técnica a menos que sea estrictamente necesario y, en ese caso, explícala.
2.  Proporciona respuestas estructuradas y directas. Si es un procedimiento, detállalo paso a paso.
3.  Mantén un tono servicial y neutral. Usa frases como "Correcto.", "El procedimiento es el siguiente:" o "Estoy a su disposición si tiene más consultas".
4.  Mantén las respuestas concisas y bien organizadas para facilitar la lectura.
5.  Si te preguntan por algo fuera del ámbito de la formación tecnológica, redirige la conversación amablemente. Por ejemplo: "Mi función es asistir con dudas sobre el uso de dispositivos digitales. ¿Puedo ayudarle con alguna consulta relacionada?".
`;

const authSystemInstruction = `
Eres un 'Asistente de Acceso', una IA especializada en guiar a usuarios durante el proceso de registro e inicio de sesión de una plataforma educativa.
Tu única función es responder preguntas sobre estos temas. Debes ser extremadamente claro, paciente y tranquilizador.
Tus reglas son:
1.  Tu ámbito de conocimiento se limita estrictamente a: qué es un correo electrónico, para qué sirve, qué es una contraseña, por qué debe ser segura, cómo crear una cuenta y cómo iniciar sesión.
2.  Utiliza un lenguaje muy sencillo, con frases cortas y directas.
3.  Si un usuario pregunta por cualquier otro tema (lecciones, cómo usar una app, etc.), debes responder de forma amable pero firme: "Mi única función es ayudarle con el proceso de acceso a la plataforma. Una vez dentro, el 'Asistente de Soporte' podrá ayudarle con otras consultas."
4.  No pidas nunca información personal al usuario.
5.  Mantén las respuestas breves y al grano.
`;

const getApiResponse = async (
  prompt: string,
  systemInstruction: string,
): Promise<string> => {
  if (!API_KEY) {
    return "El servicio de asistencia no está disponible en este momento. Por favor, inténtelo de nuevo más tarde.";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      },
    });

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("No text in response");
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Ha ocurrido un error de conexión con el asistente. Por favor, verifique su conexión e inténtelo de nuevo.";
  }
};

export const getAIResponse = (prompt: string): Promise<string> => {
  return getApiResponse(prompt, mainSystemInstruction);
};

export const getAuthAIResponse = (prompt: string): Promise<string> => {
  return getApiResponse(prompt, authSystemInstruction);
};
