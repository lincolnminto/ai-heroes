# Formato de ADR (Architectural Decision Records)

ADRs ficam em `docs/adr/` e usam numeração sequencial: `0001-slug.md`, `0002-slug.md`, etc.

Crie o diretório `docs/adr/` sob demanda (lazily) — somente quando o primeiro ADR for necessário.

## Template

```md
# {Título curto da decisão}

{1-3 frases: qual é o contexto, o que decidimos e por quê.}
````

É isso. Um ADR pode ser um único parágrafo. O valor está em registrar *que* uma decisão foi tomada e *por quê* — não em preencher seções.

## Seções opcionais

Inclua estas seções apenas quando elas agregarem valor real. A maioria dos ADRs não precisarão delas.

* **Status** no frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`) — útil quando decisões são revisitadas
* **Opções Consideradas** — somente quando as alternativas rejeitadas valem a pena ser lembradas
* **Consequências** — somente quando efeitos posteriores (downstream effects) não óbvios precisam ser destacados

## Numeração

Faça uma varredura em `docs/adr/` para encontrar o maior número existente e incremente em um.

## Quando oferecer um ADR

Todas estas três condições devem ser verdadeiras:

1. **Difícil de reverter** — o custo de mudar de ideia depois é significativo
2. **Surpreendente sem contexto** — um leitor futuro olhará para o código e pensará: "por que diabos fizeram assim?"
3. **Resultado de um trade-off real** — havia alternativas genuínas e você escolheu uma por motivos específicos

Se uma decisão é fácil de reverter, pule-a — você simplesmente irá revertê-la. Se ela não é surpreendente, ninguém vai se perguntar o porquê. Se não havia uma alternativa real, não há nada a registrar além de que "fizemos o óbvio."

### O que se qualifica

* **Forma arquitetural.** "Estamos usando um monorepo." "O modelo de escrita (write model) é baseado em eventos (event-sourced), e o modelo de leitura (read model) é projetado no Postgres."
* **Padrões de integração entre contextos.** "Pedidos (Ordering) e Faturamento (Billing) se comunicam via eventos de domínio (domain events), não por HTTP síncrono."
* **Escolhas de tecnologia que geram lock-in.** Banco de dados, barramento de mensagens (message bus), provedor de autenticação (auth provider), alvo de deploy (deployment target). Nem toda biblioteca — apenas aquelas que levariam um trimestre para serem substituídas.
* **Decisões de limites e escopo.** "Os dados de cliente pertencem ao contexto de Cliente (Customer context); outros contextos os referenciam apenas por ID." Os "nãos" explícitos são tão valiosos quanto os "sins".
* **Desvios deliberados do caminho óbvio.** "Estamos usando SQL manual em vez de um ORM porque X." Qualquer coisa em que um leitor razoável assumiria o contrário. Isso impede que o próximo engenheiro "corrija" algo que foi deliberado.
* **Restrições não visíveis no código.** "Não podemos usar AWS por causa de requisitos de compliance." "Os tempos de resposta devem ficar abaixo de 200ms por causa do contrato com a API do parceiro."
* **Alternativas rejeitadas quando a rejeição não é óbvia.** Se você considerou GraphQL e escolheu REST por motivos sutis, registre isso — caso contrário, alguém vai sugerir GraphQL novamente em seis meses.

```
