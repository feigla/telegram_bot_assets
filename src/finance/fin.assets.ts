import {SendMessageOptions} from "node-telegram-bot-api";
import {IAssets} from "../types/IAssets";

class FinAssets {
    getAssetsOption(assets: IAssets[]): SendMessageOptions {
        let assetsLength = assets.length - 1

        const inline_keyboard = new Array(assets.length).fill([]).map(() => {
            return new Array(1).fill([]).map(() => {
                const symbol = assets[assetsLength].symbol
                assetsLength--;
                return this.setAssetClient(symbol, symbol)
            })
        })

        return {
            reply_markup: {
                inline_keyboard
            }
        }
    }

    setAssetClient(text: string, callback_data: string) {
        return {text, callback_data}
    }

}

export default FinAssets
