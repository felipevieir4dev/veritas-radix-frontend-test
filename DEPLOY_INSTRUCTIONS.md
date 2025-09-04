# Deploy na Vercel - Análise Etimológica com Gemini

## Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. API Key do Google Gemini (https://makersuite.google.com/app/apikey)

## Passos para Deploy

### 1. Preparar o projeto
```bash
npm install
```

### 2. Configurar variáveis de ambiente
No painel da Vercel, adicione:
- `VITE_GEMINI_API_KEY`: Sua chave da API do Gemini

### 3. Deploy via CLI da Vercel
```bash
# Instalar CLI da Vercel
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

### 4. Deploy via GitHub
1. Conecte seu repositório no GitHub
2. Importe o projeto na Vercel
3. Configure a variável de ambiente
4. Deploy automático

## Funcionalidades

- ✅ Análise etimológica com IA (Gemini)
- ✅ Interface responsiva
- ✅ Deploy otimizado para Vercel
- ✅ Configuração de ambiente

## Uso

1. Digite uma palavra no campo de busca
2. Clique em "Analisar"
3. Veja a análise etimológica completa

A análise inclui:
- Origem da palavra
- Explicação detalhada
- Raiz etimológica
- Evolução histórica
- Palavras relacionadas