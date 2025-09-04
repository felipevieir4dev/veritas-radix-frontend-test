import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analisarEtimologia(palavra: string) {
  // Verificar se a API key está configurada
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('API Key do Gemini não configurada');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  
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
    console.log('Iniciando análise para:', palavra);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log('Resposta do Gemini:', response);
    
    const cleanResponse = response.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error('Erro detalhado:', error);
    
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Chave da API inválida');
    }
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      throw new Error('Cota da API excedida');
    }
    if (error instanceof SyntaxError) {
      throw new Error('Resposta inválida da API');
    }
    
    throw new Error(`Erro na análise: ${error.message}`);
  }
}