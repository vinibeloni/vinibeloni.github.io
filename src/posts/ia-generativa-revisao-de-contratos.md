---
title: IA generativa para cadastro automático de contratos
date: 2025-02-01
role: Tech Lead
company: Niuco
period: fev/2025 – nov/2026
---

Liderei o primeiro produto de IA generativa da empresa: um fluxo com Amazon Bedrock e agentes especializados que automatiza o cadastro de contratos de software na plataforma, um processo que antes era manual.

## Contexto

O projeto nasceu para um cliente estratégico. Cada contrato de software precisava ser lido e cadastrado à mão na plataforma, campo a campo. O objetivo era que a IA fizesse esse trabalho, com uma qualidade que desse para confiar.

## Como foi

Eu arquitetei a solução, dividi e deleguei as tarefas e também desenvolvi. O time era pequeno: eu e um desenvolvedor júnior.

A decisão central foi separar o que é trabalho de código do que é trabalho de IA. Tudo o que tem regra clara ficou no código, como escolher quais anexos do contrato entram na análise. Para o modelo ficou só o que exige interpretação, como identificar o tipo de pagamento. Isso deixa o resultado mais previsível e o prompt menor.

## Desafios

O maior desafio foi refinar os prompts até a resposta ficar confiável.

Montei um gabarito: um conjunto de contratos com o cadastro correto, já revisado por pessoas. Analisando amostras desse gabarito, decidi o que tirar da IA e passar para o código, e onde o prompt precisava melhorar.

Para cada mudança no prompt ou no código, eu rodava um script com uma bateria de testes automatizados contra o gabarito, para ver se a mudança trazia ganho de verdade ou só parecia melhor. Usando o Claude Code (Opus 5.5), eu registrava as diferenças entre uma rodada e outra e o que mudar na seguinte. Assim cada ajuste era medido, não decidido no feeling.

## Resultado

- Primeiro produto de IA da empresa, em produção.
- 1.700 contratos no lançamento para o cliente estratégico.

## O que aprendi

Aprendi muito sobre Amazon Bedrock e sobre como gerenciar o contexto que vai para o modelo: o que mandar, o que deixar de fora e o que resolver antes, no código.

Também aprendi que, com IA, o que dá segurança para evoluir é ter um gabarito e testes automatizados. Sem isso, cada mudança de prompt é um palpite.

Reuni esses aprendizados em um artigo interno para o time.
