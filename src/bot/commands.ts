import TelegramBot from "node-telegram-bot-api";
import Bot from "./bot";


class Commands extends Bot{
    bot: TelegramBot

    constructor() {
        super()
        this.bot = super.getBot()
    }

    setCommands() {
        this.bot.setMyCommands([
            this.addCommand('/start', 'Слежка за добавленными активами'),
            this.addCommand('/instruction', 'Инструкция'),
            this.addCommand('/all', 'Посмотреть все добавленные активы'),
            this.addCommand('/stop', 'Остановить слежку')
        ])
    }

    addCommand(command: string, description: string) {
        return {command, description}
    }
}

export default Commands