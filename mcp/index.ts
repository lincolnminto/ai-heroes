import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// Inicializa o servidor MCP
const server = new Server(
  {
    name: "ai-heroes-workshop-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Registra as ferramentas disponíveis
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "consultar_futebol",
        description: "Retorna uma curiosidade bem-humorada sobre o pior time de futebol.",
        inputSchema: {
          type: "object",
          properties: {}, // Não requer argumentos
        },
      },
      {
        name: "buscar_pokemon",
        description: "Busca dados e habilidades de um Pokémon específico usando a PokeAPI.",
        inputSchema: {
          type: "object",
          properties: {
            nome_pokemon: {
              type: "string",
              description: "O nome do Pokémon (ex: pikachu, charizard)",
            },
          },
          required: ["nome_pokemon"],
        },
      },
    ],
  };
});

// Lida com a execução das ferramentas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "consultar_futebol") {
    return {
      content: [
        {
          type: "text",
          text: "Respondendo à pergunta 'Qual é o pior time de futebol?': Depende para quem você pergunta... mas muitos dirão que é o famoso Grupo Bahia City, conhecido mundialmente como 'Sardinha' 🐟!",
        },
      ],
    };
  }

  if (request.params.name === "buscar_pokemon") {
    const args = request.params.arguments;
    if (!args || typeof args.nome_pokemon !== "string") {
      throw new McpError(ErrorCode.InvalidParams, "O parâmetro 'nome_pokemon' é obrigatório e deve ser uma string.");
    }

    const pokemonName = args.nome_pokemon.toLowerCase().trim();

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [
              {
                type: "text",
                text: `Pokémon '${pokemonName}' não encontrado na PokeAPI.`,
              },
            ],
            isError: true,
          };
        }
        throw new Error(`Erro na API HTTP: ${response.status}`);
      }

      const data = await response.json();

      const types = data.types.map((t: any) => t.type.name).join(", ");
      const abilities = data.abilities.map((a: any) => a.ability.name).join(", ");

      const resultText = `Pokémon: ${data.name.toUpperCase()}
Tipos: ${types}
Habilidades: ${abilities}
Altura: ${data.height / 10}m
Peso: ${data.weight / 10}kg`;

      return {
        content: [
          {
            type: "text",
            text: resultText,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Ocorreu um erro ao buscar o Pokémon: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new McpError(ErrorCode.MethodNotFound, `Ferramenta desconhecida: ${request.params.name}`);
});

// Inicia o servidor com transporte via stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor MCP (AI Heroes Workshop) rodando via stdio.");
}

main().catch((error) => {
  console.error("Erro fatal no servidor:", error);
  process.exit(1);
});