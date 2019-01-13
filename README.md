# demo-bot-framework
Demonstração do serviço Bot Framework da Microsoft com um robô que realiza a previsão do tempo para uma determinada cidade com base na API do ClimaTempo, e executa consultas e inserção em um banco de dados remoto.

## Pré-requisitos
- [Node.js][4] version 8.5 or higher
    ```bash
    # determine node version
    node --version
    ```
# Executar o bot
- Instalar os módulos
    ```bash
    npm install
    ```
- Iniciar o bot
    ```bash
    npm start
    ```

# Testando o bot com o Bot Framework Emulator **v4**
[Bot Framework Emulator][5] é uma aplicação desktop que permite desenvolvedores testar e debugar seus bots no localhost ou remotamente através de um túnel.

- Instalar o Bot Framework Emulator versão 4.2.0 ou superior [aqui][6]

## Conectar-se ao bot usando o Bot Framework Emulator **v4**
- Abra o Bot Framework Emulator
- File -> Open Bot Configuration
- Navegue até a pasta `demo-bot-framework`
- Selecione o arquivo `demo-bot-framework.bot`

[4]: https://nodejs.org
[5]: https://github.com/microsoft/botframework-emulator
[6]: https://github.com/Microsoft/BotFramework-Emulator/releases
