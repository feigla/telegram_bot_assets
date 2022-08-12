import FinAssets from "../../finance/fin.assets";
import Prices from "../../finance/prices";
import AssetsRepo from "../../db/assets.repo";
import {IAssets} from "../../types/IAssets";
import Handlers from "./handlers";

class HandlersOnText extends Handlers {

    constructor() {
        super(new FinAssets(), new Prices(), new AssetsRepo())
    }

    async addHandler(chatId: number, assets: IAssets[], symbol: string) {
        if (assets.length > 9) {
            await this.bot.sendMessage(chatId, `Превышен лимит 10 активов`)
            return;
        }

        for (let asset of assets) {
            if (asset.symbol === symbol) {
                await this.bot.sendMessage(chatId, `Этот актив уже добавлен`)
                return;
            }
        }

        const price = await this.prices.getPrice(symbol)
        if (!price) {
            await this.bot.sendMessage(chatId, `Такой котировки не существует`)
            return;
        }

        await this.assetsRepo.create(chatId, symbol)
        await this.bot.sendMessage(chatId,
            `Успешно добавлен актив с котировкой ${symbol}.\n` +
            `Текущая цена: ${price}$`);
    }

    async deleteHandler(chatId: number, assets: IAssets[], symbol: string) {
        for (let asset of assets) {
            if (asset.symbol === symbol) {
                await this.assetsRepo.delete(chatId, symbol)
                await this.bot.sendMessage(chatId, `Актив с кодировкой ${symbol} успешно удален`);
                return;
            }
        }
        await this.bot.sendMessage(chatId, 'Такой актив у вас не добавлен');
    }
}

export default HandlersOnText