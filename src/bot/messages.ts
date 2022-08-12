import TelegramBot from "node-telegram-bot-api";
import {emitter} from "../utils/emitter";
import HandlersOn from "./handlers/handlersOn";
import {IAssets} from "../types/IAssets";
import AssetsRepo from "../db/assets.repo";
import Bot from "./bot";
import HandlersOnText from "./handlers/handlersOnText";
import {IPrice} from "../types/IPrice";

class Messages extends Bot {
    bot: TelegramBot

    private handlersOn: HandlersOn
    private handlersOnText: HandlersOnText
    private assetsRepo: AssetsRepo

    constructor() {
        super()
        this.bot = super.getBot()

        this.assetsRepo = new AssetsRepo()
        this.handlersOn = new HandlersOn()
        this.handlersOnText = new HandlersOnText()
    }

    setMessages() {
        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text

            const assets: IAssets[] = await this.assetsRepo.findByChatId(chatId)

            switch (text) {
                case '/start':
                    return await this.handlersOn.startHandler(assets, chatId)
                case '/all':
                    return await this.handlersOn.allHandler(assets, chatId)
                case '/instruction':
                    return await this.handlersOn.instructionHandler(chatId)
                case '/stop':
                    return await this.handlersOn.stopHandler(chatId)
            }
        });
    }

    setOnText(command: string) {
        const regexp = new RegExp(`/${command} (.+)`)
        this.bot.onText(regexp, async (msg, match) => {
            const chatId = msg.chat.id;
            if (!match) {
                await this.bot.sendMessage(chatId, `Неправильно введенна команда`)
                return;
            }
            const symbol = match[1];
            const assets: IAssets[] = await this.assetsRepo.findByChatId(chatId)

            switch (command) {
                case 'remove':
                    return await this.handlersOnText.deleteHandler(chatId, assets, symbol)
                case 'add':
                    return await this.handlersOnText.addHandler(chatId, assets, symbol)
            }
        });
    }

    setCallbackQuery() {
        this.bot.on('callback_query', async (msg) => {
            const data = msg.data as string
            const chatId = msg.message?.chat.id as number
            await this.handlersOn.callbackQueryHandler(data, chatId)
        })
    }

    notifyClients() {
        emitter.on('checkPrices', async (chatId: number, price: number, asset: IPrice) => {
            await this.bot.sendMessage(chatId, `ПЕРЕПАД ${asset.symbol} C ${asset.price}. ТЕКУЩАЯ СТОИМОСТЬ: ${price}$`)
        })
    }
}

export default Messages