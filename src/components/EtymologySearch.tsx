import React, { useState } from 'react';
import { analisarEtimologia } from '../lib/gemini';

interface EtimologiaResult {
  palavra: string;
  origem: string;
  explicacao: string;
  raiz: string;
  evolucao: string;
  palavras_relacionadas: string[];
}

export const EtymologySearch: React.FC = () => {
  const [palavra, setPalavra] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<EtimologiaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!palavra.trim()) {
      setError('Digite uma palavra para analisar');
      return;
    }

    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const analise = await analisarEtimologia(palavra.trim());
      setResultado(analise);
    } catch (err: any) {
      console.error('Erro na análise:', err);
      setError('Erro ao analisar a palavra. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Formulário de Busca */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={palavra}
            onChange={(e) => setPalavra(e.target.value)}
            placeholder="Digite uma palavra para analisar sua etimologia..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !palavra.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analisando...' : 'Analisar'}
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analisando etimologia com IA...</p>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Etimologia: {resultado.palavra}
          </h2>
          
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Origem</h3>
              <p className="text-gray-700">{resultado.origem}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Explicação</h3>
              <p className="text-gray-700 leading-relaxed">{resultado.explicacao}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Raiz</h3>
              <p className="text-gray-700">{resultado.raiz}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Evolução</h3>
              <p className="text-gray-700">{resultado.evolucao}</p>
            </div>

            {resultado.palavras_relacionadas && resultado.palavras_relacionadas.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Palavras Relacionadas</h3>
                <div className="flex flex-wrap gap-2">
                  {resultado.palavras_relacionadas.map((palavra, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {palavra}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};