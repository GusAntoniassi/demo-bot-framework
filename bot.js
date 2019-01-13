// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');
const climaTempo = require('./climatempo');
const db = require('./db');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            let text = turnContext.activity.text;
            let lowerCaseText = text.toLowerCase();

            if (lowerCaseText.startsWith('previsão do tempo')) {
                let cidadeEstado = lowerCaseText.split('previsão do tempo')[1].trim();

                // @TODO: Validar input
                let cidade = cidadeEstado.split('-')[0];
                let estado = cidadeEstado.split('-')[1];

                let previsao = await climaTempo.getPrevisaoTempo(cidade, estado);

                await turnContext.sendActivity(previsao);
            } else if (lowerCaseText.startsWith('insert db:')) {
                let conteudo = text.split(':')[1].trim();

                // @TODO: Validar input

                let retorno = await db.insert(conteudo);

                await turnContext.sendActivity(retorno);
            } else if (lowerCaseText.startsWith('select db')) {
                let retorno = await db.select();

                await turnContext.sendActivity(retorno);
            } else if (lowerCaseText.startsWith('count db')) {
                let retorno = await db.count();

                await turnContext.sendActivity(retorno);
            } else {
                await turnContext.sendActivity(`Comando inválido! Comandos atualmente disponíveis: \n` +
                    `- "**Previsão do tempo {Cidade}-{UF}**": Retorna a previsão do tempo para a cidade {Cidade} no estado de {UF}.\n` +
                    `- "**Insert DB: {Conteudo}**": Insere {Cidade} no banco de dados.\n` +
                    `- "**Select DB**": Retorna os últimos 50 registros no banco de dados.\n` +
                    `- "**Count DB**": Retorna a quantidade de registros inseridos no banco de dados.\n`
                );
            }
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
