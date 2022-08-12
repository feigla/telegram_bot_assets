import {IPrice} from "../types/IPrice";
import {emitter} from "../utils/emitter";
import {finnhubClient} from "../../config/finnhub";
import {IAssets} from "../types/IAssets";
import AssetsRepo from "../db/assets.repo";

class Prices {
    assetsRepo: AssetsRepo

    constructor() {
        this.assetsRepo = new AssetsRepo()
    }


    getPrice(symbol: string) {
        return finnhubClient.quote(symbol).then((res) => {
            let currentPrice: number;
            currentPrice = res?.data?.c as number;
            return currentPrice
        })
    }

    async getAvailablePrices(assets: IAssets[]) {
        let prevPrices: IPrice[] = []

        for (const asset of assets) {
            const price = await this.getPrice(asset.symbol)
            prevPrices.push({price, symbol: asset.symbol})
        }

        return prevPrices
    }


    async comparePrices(assets: IAssets[], chatId: number) {
        let prevPrices = await this.getAvailablePrices(assets)

        const ms = 6000

        let idInterval = setInterval(() => {
            this.checkPrice(prevPrices.length - 1, prevPrices, chatId)
        }, ms)

        emitter.on('stopInterval', () => {
            clearInterval(idInterval)
            prevPrices = []
        })
    }

    checkPrice(i: number, prevPrices: IPrice[], chatId: number) {
        setTimeout(async () => {
            let asset = prevPrices[i]
            let currentPrice = await this.getPrice(asset.symbol)
            if (Math.abs((currentPrice - asset.price) / asset.price) > 0.03) {
                emitter.emit('checkPrices', chatId, currentPrice, asset)
                asset.price = currentPrice
            }
            i--;
            if (i >= 0) {
                this.checkPrice(i, prevPrices, chatId)
            }
        }, 3000)
    }
}

export default Prices