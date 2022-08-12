import Bot from "../bot";
import TelegramBot from "node-telegram-bot-api";
import FinAssets from "../../finance/fin.assets";
import Prices from "../../finance/prices";
import AssetsRepo from "../../db/assets.repo";

class Handlers extends Bot {
    bot: TelegramBot

    protected finAssets: FinAssets
    protected prices: Prices
    protected assetsRepo: AssetsRepo

    constructor(finAssets: FinAssets, prices: Prices, assetsRepo: AssetsRepo) {
        super()
        this.bot = super.getBot()

        this.finAssets = new FinAssets()
        this.prices = new Prices()
        this.assetsRepo = new AssetsRepo()
    }
}

export default Handlers