---
name: gerar-issues
description: Quebre um plano, especificação ou PRD em issues que possam ser atribuídas forma independente no issue tracker do projeto, usando fatias verticais "bala traçante" (vertical slices / tracer bullets). Use quando o usuário quiser converter um plano em issues, criar tickets de implementação ou dividir trabalho em issues.
---

# Gerar Issues

Quebre um plano em issues que possam ser atribuídas e tratadas de forma independente usando fatias verticais "bala traçante" (*vertical slices* / *tracer bullets*).

Garanta que o issue tracker e o vocabulário de labels de triagem (triage label vocabulary) tenham sido fornecidos a você — solicite ao usuário caso contrário.

## Processo

### 1. Reunir contexto

Trabalhe a partir do que já estiver no contexto da conversa. Se o usuário passar uma referência de issue (número da issue, URL ou caminho) como argumento, busque-a no issue tracker e leia o corpo completo e os comentários.

### 2. Explorar o codebase (opcional)

Se você ainda não explorou o codebase, faça isso para entender o estado atual do código. Os títulos e descrições das issues devem usar o vocabulário do glossário de domínio do projeto e respeitar os ADRs na área em que você estiver atuando.

### 3. Rascunhar fatias verticais

Quebre o plano em issues do tipo **tracer bullet**. Cada issue é uma fatia vertical fina que atravessa TODAS as camadas de integração de ponta a ponta (end-to-end), NÃO uma slice horizontal de uma única camada.

As fatias podem ser `HITL` ou `AFK`. Slices `HITL` exigem interação humana (human-in-the-loop), como uma decisão arquitetural ou uma revisão de design. Slices `AFK` podem ser implementadas e mergeadas sem interação humana (Away from Keyboard). Prefira `AFK` em vez de `HITL` sempre que possível.
  
<vertical-slice-rules>
- Cada fatia entrega um caminho estreito, mas COMPLETO, por todas as camadas: schema, API, UI e testes
- Uma fatia concluída é demonstrável ou verificável por conta própria
- Prefira **muitas fatias** finas em vez de poucas fatias grossas
</vertical-slice-rules>

### 4. Questionar o usuário

Apresente a divisão proposta como uma lista numerada. Para cada fatia, mostre:

- **Título**: nome curto e descritivo
- **Tipo**: HITL / AFK
- **Bloqueado por**: quais outras fatias (se houver) precisam ser concluídas primeiro
- **Histórias de usuário cobertas**: quais histórias de usuário isso atende (se o material de origem as contiver)

Pergunte ao usuário:

- A granularidade parece correta? Está ampla demais ou detalhada demais?
- As relações de dependência estão corretas?
- Alguma fatia deve ser mesclada ou dividida ainda mais?
- As fatias corretas estão marcadas como `HITL` e `AFK`?

Itere até que o usuário aprove a divisão.

### 5. Publicar as issues no issue tracker

Para cada fatia aprovada, publique uma nova issue no issue tracker. Use o template do corpo da issue abaixo. Essas issues são consideradas prontas para agentes AFK (AFK agents), então publique-as com a label de triagem correta, a menos que seja instruído de outra forma.

Publique as issues em ordem de dependência — bloqueadores primeiro — para que você possa referenciar identificadores reais de issues no campo "Bloqueado por".

<issue-template>
## Parent

Uma referência à issue pai no issue tracker (se a origem foi uma issue existente, caso contrário, omita esta seção).

## O que construir

Uma descrição concisa desta fatia vertical. Descreva o comportamento de ponta a ponta (end-to-end), não a implementação camada por camada (layer-by-layer).

NÃO inclua caminhos específicos de arquivos nem snippets de código. Eles podem ficar desatualizados muito rapidamente.

Exceção: se um protótipo produziu um snippet que codifica uma decisão de forma mais precisa do que a explicação em texto consegue fazer — máquina de estados (state machine), reducer, schema, estrutura de tipos (type shape) — insira-o diretamente na decisão correspondente e mencione brevemente que ele veio de um protótipo. Reduza o snippet às partes ricas em decisão — não um demo funcional, apenas os trechos importantes e os pontos cruciais da decisão.

## Critérios de aceitação (Definition of Done)

- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Bloqueado por

- Uma referência ao ticket bloqueador, se houver

Ou "Nenhum — pode começar imediatamente" se não houver bloqueadores.

</issue-template>

NÃO feche nem modifique nenhuma issue pai.