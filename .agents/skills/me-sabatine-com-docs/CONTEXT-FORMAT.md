# Formato do CONTEXT.md (CONTEXT.md Format)

## Estrutura

```md
# {Nome do Contexto}

{Descrição em uma ou duas frases sobre o que é este contexto e por que ele existe.}

## Linguagem

**Order**:
{Uma descrição concisa do termo}
_Evitar_: Purchase, transaction

**Invoice**:
Uma solicitação de pagamento enviada a um customer após a entrega.
_Evitar_: Bill, payment request

**Customer**:
Uma pessoa ou organização que realiza orders.
_Evitar_: Client, buyer, account

## Relacionamentos

- Uma **Order** produz uma ou mais **Invoices**
- Uma **Invoice** pertence a exatamente um **Customer**

## Exemplo de diálogo

> **Dev:** "Quando um **Customer** realiza uma **Order**, criamos a **Invoice** imediatamente?"
> **Especialista de domínio:** "Não — uma **Invoice** só é gerada quando um **Fulfillment** é confirmado."

## Ambiguidades sinalizadas

- "account" foi usado para significar tanto **Customer** quanto **User** — resolução: são conceitos distintos.
```

## Regras

- **Seja opinativo.** Quando existirem várias palavras para o mesmo conceito, escolha a melhor e liste as outras como aliases para evitar.
- **Sinalize conflitos explicitamente.** Se um termo for usado de forma ambígua, aponte isso em "Ambiguidades sinalizadas" com uma resolução clara.
- **Mantenha definições enxutas.** No máximo uma frase. Defina o que o termo É, não o que ele faz.
- **Mostre relacionamentos.** Use nomes de termos em negrito e expresse cardinalidade quando ela for evidente.
- **Inclua apenas termos específicos do contexto deste projeto.** Conceitos gerais de programação, como timeouts, tipos de erro (error types) e padrões utilitários (utility patterns), não devem aparecer aqui, mesmo que o projeto os use extensivamente. Antes de adicionar um termo, pergunte: este é um conceito único deste contexto ou um conceito geral de programação? Apenas o primeiro pertence a este escopo.
- **Agrupe termos sob subtítulos** quando surgirem clusters naturais. Se todos os termos pertencerem a uma única área coesa, uma lista plana (flat list) é suficiente.
- **Escreva um exemplo de diálogo.** Uma conversa entre um dev e um especialista de domínio que demonstre como os termos interagem naturalmente e esclareça os limites entre conceitos relacionados.

## Repositórios de contexto único vs múltiplos contextos (Single vs multi-context repos)

**Contexto único (a maioria dos repositórios):** Um `CONTEXT.md` na raiz do repositório.

**Múltiplos contextos:** Um `CONTEXT-MAP.md` na raiz do repositório lista os contextos, onde eles ficam e como se relacionam entre si:

```md
# Mapa de Contexto (Context Map)

## Contextos

- [Ordering](./src/ordering/CONTEXT.md) — recebe e acompanha orders de customers
- [Billing](./src/billing/CONTEXT.md) — gera invoices e processa payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — gerencia a separação em estoque (warehouse picking) e o envio

## Relacionamentos

- **Ordering → Fulfillment**: Ordering emite eventos `OrderPlaced`; Fulfillment os consome para iniciar o picking
- **Fulfillment → Billing**: Fulfillment emite eventos `ShipmentDispatched`; Billing os consome para gerar invoices
- **Ordering ↔ Billing**: Tipos compartilhados para `CustomerId` e `Money`
```

A skill infere qual estrutura se aplica:

* Se `CONTEXT-MAP.md` existir, leia-o para encontrar os contextos
* Se existir apenas um `CONTEXT.md` na raiz, é um contexto único
* Se nenhum dos dois existir, crie um `CONTEXT.md` na raiz sob demanda (lazily) quando o primeiro termo for resolvido

Quando múltiplos contextos existirem, infira a qual deles o tópico atual se relaciona. Se não estiver claro, pergunte.