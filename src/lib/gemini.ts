import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analisarEtimologia(palavra: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Analise a etimologia da palavra "${palavra}". Forneça em formato JSON:
  {
    "palavra": "${palavra}",
    "origem": "língua de origem",
    "explicacao": "explicação detalhada da etimologia",
    "raiz": "raiz da palavra",
    "evolucao": "como a palavra evoluiu",
    "palavras_relacionadas": ["palavra1", "palavra2"]
  }
  
  Responda apenas o JSON, sem texto adicional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return JSON.parse(response.replace(/```json|```/g, '').trim());
  } catch (error) {
    console.error('Erro na análise etimológica:', error);
    throw new Error('Erro ao analisar etimologia');
  }
}