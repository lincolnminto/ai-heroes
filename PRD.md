## Declaracao do problema

O jogador quer uma experiencia curta, tensa e clara de RPG top-down estilo Pokemon com tema domestico noturno: cumprir tarefas simples no escuro (pegar agua, voltar ao quarto, deixar o copo na pia) sem tropeçar no gato.

O desafio de produto e transformar essa ideia em um MVP jogavel que seja dificil, mas justo, reproduzivel para balanceamento e simples de implementar/testar.

## Solucao

Entregar um MVP web desktop com 1 noite e 3 missoes sequenciais em mapa fixo (vista superior em grade):

1. Luz acende, jogador observa sem mover, gato caminha e para em um ponto valido.
2. Espera de 3 segundos com luz acesa.
3. Luz apaga, jogador se move no escuro ate o destino da missao antes do timer acabar.
4. Se pisar no gato ou acabar o tempo, reinicia a missao atual no checkpoint.
5. Ao concluir a terceira missao, jogador vence.

Modos de dificuldade:

- Facil: contorno sutil do cenario, personagem parcialmente visivel, 35s por missao.
- Dificil: blackout total do cenario, personagem invisivel, orientacao por audio de passos, 25s por missao.

## User stories

1. Como jogador, quero escolher Facil ou Dificil antes de iniciar, para ajustar o desafio.
2. Como jogador, quero observar o gato com luz acesa e agir apenas no escuro, para planejar e executar por memoria.
3. Como jogador, quero uma sequencia clara de objetivos (geladeira -> quarto -> pia), para manter progresso.
4. Como jogador, quero perder so a missao atual ao falhar, para tentar de novo sem resetar a noite toda.
5. Como jogador, quero feedback sonoro de passos e colisao, para me orientar no escuro.
6. Como jogador, quero pausar e continuar depois, para jogar em sessoes curtas.
7. Como dev, quero regras de spawn do gato que nunca criem missao impossivel, para garantir justica e testabilidade.

## Decisoes de implementacao

- Escopo v1
  - Plataforma: navegador desktop.
  - Stack: Phaser 3 + TypeScript + Vite.
  - Mapa unico fixo em grade 20x12, tile de 32px (assets base 16x16 com nearest-neighbor).
  - Camera fixa mostrando a casa inteira.

- Fluxo de missoes (data-driven)
  - Missao 1: "Va ate a geladeira e pegue um copo com agua" (destino: geladeira).
  - Missao 2: "Volte para o quarto" (destino: quarto).
  - Missao 3: "Deixe o copo na pia" (destino: pia).
  - Conclusao por colisao ao entrar no tile de destino (sem botao de interacao).
  - Estado logico simples do copo (`carregandoCopo` true/false), sem inventario visual no MVP.

- Maquina de estados
  - `LIGHT_ON_PREVIEW` -> `LIGHT_ON_LOCK` -> `DARK_PLAY` -> (`MISSION_SUCCESS` | `MISSION_FAIL`).
  - Jogador travado com luz acesa.
  - Missao nova sempre reinicia ciclo completo de luz/gato.
  - Timer inicia exatamente quando luz apaga e input libera.

- Movimento e colisao
  - Movimento em grade, 4 direcoes, sem diagonal.
  - Controles: WASD e setas.
  - Cadencia fixa: 180ms por passo.
  - Repeticao de input interna (ignorar auto-repeat do SO).
  - Colisao com parede/movel bloqueia e consome 180ms.
  - So o gato causa derrota da missao.

- Gato e fairness
  - Hitbox do gato: 1 tile.
  - No claro, gato caminha visivelmente (sem teleporte) a 1 tile/220ms.
  - Escolha da posicao final em `catCandidateNodes` com validacoes:
    - nao pode ser spawn do jogador;
    - nao pode ser destino da missao;
    - distancia Manhattan minima de 3 para spawn;
    - distancia Manhattan minima de 2 para destino;
    - precisa sobrar ao menos 1 caminho valido jogador->destino.
  - Retry de sorteio (ex.: 50 tentativas) + fallback seguro.
  - Cada retry de missao rerolla a posicao final do gato.
  - Durante luz acesa, gato nao atravessa tile ocupado pelo jogador.

- Pathfinding
  - BFS para:
    - validar caminho remanescente do jogador;
    - calcular rota do gato no claro.

- Visibilidade e audio
  - Facil: cenario sutil e player parcial.
  - Dificil: cenario apagado e player invisivel.
  - Em ambos:
    - som de passo por tile;
    - som de colisao em movimento bloqueado;
    - ambiencia noturna baixa em loop;
    - click de energia nas transicoes de luz.
  - Gato sem audio no escuro.

- Falha e vitoria
  - Falha por gato: tropeço + miado, mensagem, pausa de ~1.2s, reinicio da missao.
  - Falha por timeout: mesmo fluxo, mudando apenas mensagem.
  - Sem limite de tentativas no MVP.
  - Vitoria ao concluir missao 3.
  - Painel final: tempo total, total de falhas, botao "Jogar novamente".

- UI/UX
  - HUD minimo com missao atual/progresso.
  - Destino destacado so com luz acesa.
  - No escuro, sem destaque de destino.
  - Tutorial curto: auto na primeira execucao + opcao "Como jogar".
  - Pausa com Esc: continuar, reiniciar missao, sair ao menu.
  - Idioma v1: pt-BR.

- Persistencia
  - `localStorage` para dificuldade, volumes e `tutorialVisto`.
  - Save de progresso: `missaoAtual`, `dificuldade`, `seedBase`, `config`.
  - `Continuar` sempre retoma no inicio da missao atual (luz acesa), nunca no meio do escuro.
  - Ao vencer, limpar save de continuar.

- Render e desempenho
  - Resolucao interna fixa: 640x384 (20x12 * 32px).
  - Escala 2x + letterbox quando necessario.
  - Logica a 60 FPS com tempo baseado em delta controlado.

- Licencas e assets
  - Usar apenas assets gratuitos/open-source permissivos sem obrigacao de atribuicao (CC0 ou equivalente).
  - Pacote minimo:
    - sprites: player, gato, tileset casa, destino highlight;
    - SFX: step, bump, trip_cat, power_click, mission_success, mission_fail;
    - audio ambiente: night_ambience.

- Dev/debug
  - Seed reproduzivel no modo dev.
  - Overlay debug opcional para grade/colisoes/nos do gato.

## Decisoes de teste

- O que define bons testes
  - Determinismo com seed no dev.
  - Cobertura das transicoes de estado de missao.
  - Cobertura das regras de spawn justo do gato.
  - Cobertura do timer e falha por timeout.
  - Cobertura de save/load e limpeza de save apos vitoria.
  - Cobertura da cadencia de input por passo (180ms) incluindo bloqueio.

- Modulos prioritarios para teste
  - Maquina de estados de missao.
  - BFS e validacao de caminho remanescente.
  - Spawn do gato (regras, retry e fallback).
  - Persistencia em `localStorage`.

- Criterios de aceite da v1
  - Completar as 3 missoes em Facil e Dificil.
  - Nenhuma missao impossivel em 100 execucoes de validacao de spawn.
  - Fluxo estavel: novo jogo -> vitoria -> jogar novamente.
  - Tempo medio de partida entre 2 e 5 minutos.

## Fora do escopo

- Suporte mobile/touch.
- Multiplos mapas/noites.
- Geracao procedural de mapa.
- Inventario visual completo.
- IA avancada do gato no escuro.
- Localizacao multilingue.
- Backend/leaderboard/analytics online.

## Notas adicionais

- Priorizar implementacao por nucleos profundos e testaveis: estado -> pathfinding/spawn -> timer/input -> persistencia -> UI/audio.
- O desafio deve vir de memoria espacial e risco, nao de aleatoriedade injusta.
