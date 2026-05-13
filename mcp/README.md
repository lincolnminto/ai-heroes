# Servidor MCP de Exemplo (Workshop)

Este diretório contém um servidor Model Context Protocol (MCP) construído em TypeScript, criado especificamente para demonstrações em workshops. Ele exemplifica a criação de ferramentas (Tools) com dois níveis de complexidade:

1. **`consultar_futebol`**: Uma ferramenta simples que retorna uma resposta hardcoded e bem-humorada sobre qual é o pior time de futebol do mundo.
2. **`buscar_pokemon`**: Uma ferramenta mais complexa que recebe um parâmetro (`nome_pokemon`), faz uma requisição HTTP real para a [PokeAPI](https://pokeapi.co/), e formata a resposta.

## Como Executar e Testar

O servidor usa o transporte via `stdio` (entrada e saída padrão), que é o padrão ouro para integração de clientes locais.

### Opção 1: Usando o MCP Inspector (Recomendado para a Aula)

A forma mais fácil e visual de testar o servidor é usando a ferramenta oficial de inspeção:

```bash
# Estando dentro deste diretório (mcp/), execute:
npx @modelcontextprotocol/inspector npm start
```
Isso abrirá uma interface web no seu navegador. Você poderá listar as ferramentas disponíveis e testar a execução delas com diferentes parâmetros (ex: enviando "charizard" para a tool do Pokémon).

## Configurando em Clientes MCP (Ex: Claude Desktop, Cursor)

Para que um cliente ou agente interaja com este servidor no seu dia a dia, você precisa adicionar a configuração deste servidor local no arquivo de configuração do cliente desejado.

### Claude Desktop

Abra ou crie o arquivo de configuração do Claude Desktop:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json` (se suportado/aplicável)

Adicione a seguinte configuração (lembre-se de substituir o caminho absoluto até a pasta `mcp`):

```json
{
  "mcpServers": {
    "ai-heroes-workshop": {
      "command": "npx",
      "args": [
        "tsx",
        "/caminho/absoluto/para/ai-heroes/mcp/index.ts"
      ],
      "env": {}
    }
  }
}
```

*Nota: Se o Claude Desktop não conseguir resolver o binário do `npx`, você pode precisar apontar o caminho absoluto do nó (ex: `/usr/local/bin/node`) no "command", e passar o caminho absoluto do `tsx` no início do array de argumentos.*

### Cursor IDE

No Cursor, vá até as configurações (Settings) -> MCP.
Adicione um novo servidor:
- **Name:** ai-heroes-workshop
- **Type:** command
- **Command:** `npx tsx /caminho/absoluto/para/ai-heroes/mcp/index.ts`

Após isso, o agente conseguirá descobrir e utilizar as ferramentas de Pokemon e de Futebol de forma autônoma!