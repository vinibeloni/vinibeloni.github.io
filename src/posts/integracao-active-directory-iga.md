---
title: Integração com Active Directory para governança de identidade
date: 2025-03-01
role: Tech Lead
company: Niuco
period: fev/2025 – nov/2026
---

Construí a integração end-to-end com Active Directory para a plataforma de governança de identidade (IGA), com foco em segurança.

## Contexto

O cliente tinha dois problemas. O primeiro era de governança de identidade (IGA): precisava gerenciar usuários e grupos de forma segura, criando, atualizando e revogando acessos no onboarding e no offboarding, e movendo pessoas entre grupos. O segundo era de gestão de SaaS: o custo não era visível e ninguém sabia ao certo quantos usuários existiam.

## Como foi

A arquitetura macro foi definida pelo CTO. Na época eu estava havia pouco tempo na empresa e ainda não conhecia todo o ecossistema. Mesmo assim, participei ativamente da construção: fiz o refinamento técnico, quebrei o trabalho em tarefas e desenvolvi a integração. Também fui o responsável pela entrega no cliente e participei da reunião de implantação.

O agente é um Windows Service em C# que roda na rede do cliente, integrado ao Active Directory. Como a nossa plataforma não tinha acesso de entrada nessa rede, o fluxo foi invertido: a máquina do cliente chamava um endpoint autenticado nosso, que devolvia as tarefas a executar. Uma rotina agendada no próprio serviço enviava usuários e grupos para a plataforma, onde os atributos eram mapeados.

Segurança guiou as decisões. Ao conectar a integração pela plataforma, o usuário recebia uma secret única, guardada no AWS Secrets Manager e usada pelo serviço para se autenticar. Na máquina do cliente, o arquivo de configuração ficava criptografado com DPAPI, do próprio Windows.

## Desafios

O primeiro foi a infraestrutura: subir as EC2, configurar o servidor do AD e a máquina do agente, e deixar o ambiente o mais parecido possível com o do cliente.

O segundo foi entender os códigos de erro da integração com o AD. Muito veio na tentativa e erro, até eu achar um artigo que explicava direitinho como fazer essa integração.

O terceiro foi a observabilidade. O serviço roda no computador do cliente, então eu não tinha a mesma visibilidade de um serviço na nossa nuvem. Por isso usei também uma estratégia de alertar quando não recebíamos o "ping" do agente. Assim era fácil identificar se ele tinha parado e avisar o cliente proativamente.

## Resultado

- Primeiro projeto de IGA de ponta a ponta da empresa.
- O cliente elogiou o trabalho feito por mim e pelo CTO, com peso na renovação do contrato.

## O que aprendi

Aprendi muito sobre segurança, auditoria e monitoramento de serviços que rodam fora da nossa infraestrutura, onde não dá para simplesmente abrir um log.
