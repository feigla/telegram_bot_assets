import TelegramBot from "node-telegram-bot-api";

const token = String(process.env.TELEGRAM_TOKEN)
const bot= new TelegramBot(token, {polling: true});

abstract class Bot {
    protected getBot() {
        return bot
    }
}

export default Bot