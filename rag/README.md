# Exemplos de RAG (Retrieval-Augmented Generation)

Este diretório contém os artefatos para demonstração de conceitos de RAG. O exemplo principal está consolidado no notebook Jupyter.

## Estrutura

- `rag.ipynb`: Notebook Jupyter contendo o passo a passo interativo de carregamento de documentos, criação de embeddings, busca vetorial e geração de respostas usando o modelo de linguagem.
- `docs/`: Diretório de suporte contendo arquivos de texto/markdown (`documento_exemplo.md`) que são usados como "base de conhecimento" para serem indexados e buscados durante o laboratório.
- `.env` / `.env.example`: Arquivos para configuração de variáveis de ambiente (como as chaves da API necessárias para os LLMs e modelos de embeddings).

## Como Executar o Exemplo

1. **Configurar as Variáveis de Ambiente:**
   Copie o arquivo de exemplo para criar o seu arquivo de ambiente local:
   ```bash
   cp .env.example .env
   ```
   Abra o arquivo `.env` e preencha as variáveis necessárias (ex: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.).

2. **Instalar as Dependências:**
   O projeto já possui um ambiente virtual configurado na raiz (`.venv`). Certifique-se de que ele está ativado:
   ```bash
   # A partir da raiz do projeto:
   source .venv/bin/activate
   ```
   E instale as dependências listadas no projeto (caso ainda não estejam instaladas):
   ```bash
   pip install jupyter langchain openai python-dotenv ... # (Adequar para os pacotes usados no rag.ipynb)
   ```

3. **Iniciar o Jupyter Notebook:**
   ```bash
   # Estando dentro do diretório rag/, inicie o servidor:
   jupyter notebook rag.ipynb
   ```
   
4. **No Navegador:**
   O comando acima abrirá o seu navegador padrão. Você poderá rodar as células do notebook sequencialmente. O código irá demonstrar como carregar o conteúdo da pasta `docs/` e realizar consultas usando RAG!