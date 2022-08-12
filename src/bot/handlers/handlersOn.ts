import {IAssets} from "../../types/IAssets";
import AssetsRepo from "../../db/assets.repo";
import Prices from "../../finance/prices";
import FinAssets from "../../finance/fin.assets";
import Handlers from "./handlers";
import {emitter} from "../../utils/emitter";

class HandlersOn extends Handlers {
    constructor() {
        super(new FinAssets(), new Prices(), new AssetsRepo())
    }


    async startHandler(assets: IAssets[], chatId: number) {
        if (!assets.length) {
            return await this.bot.sendMessage(chatId, 'У вас нет добавленных активов')
        }
        await this.prices.comparePrices(assets, chatId)
        return await this.bot.sendMessage(chatId, 'Вы запустили слежку за добавленными активами')
    }

    async allHandler(assets: IAssets[], chatId: number) {
        return assets.length
            ? await this.bot.sendMessage(chatId, 'Добавленные активы', this.finAssets.getAssetsOption(assets))
            : await this.bot.sendMessage(chatId, 'Вы пока ничего не добавляли')
    }

    async instructionHandler(chatId: number) {
        return await this.bot.sendMessage(chatId,
            'Для того, чтобы добавить нужный актив следует ввести команду: \"add + КОТИРОВКА АКТИВА\".\n' +
            'Например: \"/add BTC-USD\" (Добавление биткоина).\n' +
            'ПОМНИТЕ, что добавить можно только не более 10 активов.\n\n' +
            'Чтобы удалить актив напишите команду: \"/remove + КОТИРОВКА ЭЛЕМЕНТА\".\n' +
            'Например: \"/remove BTC-USD\" (Удаление биткоина).\n\n' +
            'При включение режима слежки, введя команду: \"/start\", вас уведомлят, когда случится резкий перепад на ' +
            '3% ваших добавленных активов')
    }

    async callbackQueryHandler(symbol: string, chatId: number) {
        const price = await this.prices.getPrice(symbol)
        await this.bot.sendMessage(chatId, `${symbol}. ТЕКУЩАЯ СТОИМОСТЬ: ${price}$`)
    }

    async stopHandler(chatId: number) {
        emitter.emit('stopInterval')
        await this.bot.sendMessage(chatId, 'Слежка остановлена')
    }

}

export default HandlersOn