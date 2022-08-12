import 'dotenv/config'
import Prices from "../src/finance/prices";
import AssetsRepo from "../src/db/assets.repo";
import {IAssets} from "../src/types/IAssets";
import {IPrice} from "../src/types/IPrice";

describe('check Prices', () => {
    let fakeChatId: number
    let symbol: string
    let fakePrices: Prices
    let fakeAssetsRepo: AssetsRepo

    beforeAll(() => {
        fakeChatId = 1234123
        symbol = 'ZY'
        fakePrices = new Prices()
        fakeAssetsRepo = new AssetsRepo()
    })

    beforeEach(async () => {
        await fakeAssetsRepo.create(fakeChatId, symbol)
    })

    it('check method getPrice', async () => {
        const price = await fakePrices.getPrice(symbol)
        expect(typeof price).toBe(typeof Number(1))
    })

    it('check method getAvailablePrices', async () => {
        const fakeAssets: IAssets[] = await fakeAssetsRepo.findByChatId(fakeChatId)
        const fake: IPrice[] = await fakePrices.getAvailablePrices(fakeAssets)
        expect(fake.length).toBe(1)
    })

    afterEach(async () => {
        await fakeAssetsRepo.delete(fakeChatId, symbol)
        jest.clearAllMocks()
    })
})