---
name: me-sabatine-com-docs
description: Sessão de grilling que desafia seu plano contra o modelo de domínio existente, refina a terminologia e atualiza a documentação inline (CONTEXT.md, ADRs) à medida que as decisões se consolidam e se cristalizam. Use quando o usuário quiser fazer stress-test de um plano contra a linguagem do projeto e decisões documentadas.
---

<what-to-do>

Me entreviste de forma implacável sobre todos os aspectos deste plano até chegarmos a um entendimento compartilhado. Percorra cada ramificação da árvore de decisões do projeto (design tree), resolvendo as dependências entre decisões uma a uma. Para cada pergunta feita, forneça sua resposta recomendada.

Faça as perguntas uma de cada vez, aguardando feedback sobre cada pergunta antes de continuar.

Se uma pergunta puder ser respondida explorando a codebase, explore a codebase em vez de perguntar.

</what-to-do>

<supporting-info>

## Consciência de domínio (Domain awareness)

Durante a exploração da codebase, procure também por documentação existente:

### Estrutura de arquivos

A maioria dos repositórios tem um único arquivo de contexto (CONTEXT.md):

```

/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/

```

Se um `CONTEXT-MAP.md` existir na raiz, o repositório tem múltiplos contextos. O mapa aponta para onde cada um deles fica:

```

/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← decisões de todo o sistema (system-wide decisions)
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← decisões específicas do contexto (context-specific decisions)
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/

```

Crie arquivos sob demanda (lazily) — somente quando houver algo a escrever. Se nenhum `CONTEXT.md` existir, crie um quando o primeiro termo for resolvido. Se nenhum `docs/adr/` existir, crie-o quando o primeiro ADR for necessário.

## Durante a sessão

### Desafie contra o glossário

Quando o usuário usar um termo que conflite com a linguagem existente em `CONTEXT.md`, aponte isso imediatamente. "Seu glossário define 'cancelamento' como X, mas você parece querer dizer Y — qual dos dois é?"

### Refine linguagem imprecisa

Quando o usuário usar termos vagos ou sobrecarregados, proponha um termo canônico (canonical term) preciso. "Você está dizendo 'conta' — você quer dizer Customer ou User? São coisas diferentes."

### Discuta cenários concretos

Quando relações de domínio estiverem sendo discutidas, faça stress-test nelas com cenários específicos. Invente cenários que investiguem edge cases e obriguem o usuário a ser preciso sobre os limites entre conceitos.

### Faça referência cruzada com o código

Quando o usuário afirmar como algo funciona, verifique se o código concorda. Se encontrar uma contradição, exponha-a: "Seu código cancela Pedidos (Orders) inteiros, mas você acabou de dizer que cancelamento parcial é possível — qual está correto?"

### Atualize o CONTEXT.md inline

Quando um termo for resolvido, atualize o `CONTEXT.md` naquele momento. Não acumule essas atualizações em lote — capture-as conforme elas acontecem. Use o formato em [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

Não acople o `CONTEXT.md` a detalhes de implementação. Inclua apenas termos que sejam significativos para especialistas de domínio.

### Ofereça ADRs com moderação

Ofereça criar um ADR somente quando todas as três condições forem verdadeiras:

1. **Difícil de reverter** — o custo de mudar de ideia depois é significativo
2. **Surpreendente sem contexto** — um leitor futuro se perguntará "por que fizeram dessa forma?"
3. **Resultado de um trade-off real** — havia alternativas genuínas e uma delas foi escolhida por razões específicas

Se qualquer uma das três estiver ausente, pule o ADR. Use o formato em [ADR-FORMAT.md](./ADR-FORMAT.md).

</supporting-info>
