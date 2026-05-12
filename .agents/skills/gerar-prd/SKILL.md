---
name: gerar-prd
description: Transforme o contexto atual da conversa em um PRD (Product Requirements Document) e publique-o no issue tracker do projeto. Use quando o usuário quiser criar um PRD a partir do contexto atual.
---

Esta skill obtém o contexto atual da conversa e o entendimento da base de código (codebase) e produz um PRD. NÃO entreviste o usuário — apenas sintetize o que você já sabe.

## Processo

1. Explore o repositório para entender o estado atual do codebase, se ainda não tiver feito isso. Use o vocabulário do glossário de domínio do projeto (CONTEXT.md ou CONTEXT-MAP.md) ao longo de todo o PRD e respeite quaisquer ADRs na área em que você estiver atuando.

2. Esboce os principais módulos que você precisará construir ou modificar para concluir a implementação. Procure ativamente oportunidades para extrair módulos profundos (deep modules) que possam ser testados isoladamente.

Um módulo profundo (deep module), em oposição a um módulo raso (shallow module), é aquele que encapsula muita funcionalidade em uma interface simples, testável e que raramente muda.

Confirme com o usuário se esses módulos correspondem às expectativas dele. Confirme com o usuário para quais módulos ele quer que testes sejam escritos.

3. Escreva o PRD usando o template abaixo e, em seguida, sugira a utilização da skill `/gerar-issues` para publicar as tarefas de implementação no issue tracker do projeto.

<prd-template>

## Declaração do Problema

O problema que o usuário está enfrentando, da perspectiva do usuário.

## Solução

A solução para o problema, da perspectiva do usuário.

## Histórias de Usuário

Uma lista LONGA e numerada de histórias de usuário (user stories). Cada história de usuário deve estar no formato:

1. Como um <ator>, eu quero uma <funcionalidade>, para que <benefício>

<user-story-example>
1. Como cliente de um banco mobile, eu quero ver o saldo das minhas contas, para que eu possa tomar decisões mais bem embasadas sobre meus gastos
</user-story-example>

Esta lista de histórias de usuário deve ser extremamente extensa e cobrir todos os aspectos da funcionalidade.

## Decisões de Implementação

Uma lista das decisões de implementação tomadas. Isso pode incluir:

- Os módulos que serão construídos/modificados
- As interfaces desses módulos que serão modificadas
- Esclarecimentos técnicos vindos do desenvolvedor
- Decisões arquiteturais
- Alterações de schema
- Contratos de API
- Interações específicas

NÃO inclua caminhos específicos de arquivos nem snippets de código. Eles podem ficar desatualizados muito rapidamente.

Exceção: se um protótipo produziu um snippet que codifica uma decisão de forma mais precisa do que a explicação em texto consegue fazer — máquina de estados (state machine), reducer, schema, estrutura de tipos (type shape) — insira-o diretamente na decisão correspondente e mencione brevemente que ele veio de um protótipo. Reduza o snippet às partes ricas em decisão — não um demo funcional, apenas os trechos importantes e os pontos cruciais da decisão.

## Decisões de Teste

Uma lista das decisões de teste tomadas. Inclua:

- Uma descrição do que constitui um bom teste: testar apenas o comportamento externo, não detalhes de implementação
- Quais módulos serão testados
- Referências anteriores para os testes (prior art), isto é, tipos de testes similares já existentes no codebase

## Fora de Escopo

Uma descrição das coisas que estão fora do escopo deste PRD.

## Notas Adicionais

Quaisquer notas adicionais sobre a funcionalidade.

</prd-template>