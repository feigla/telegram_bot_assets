import db from "../../config/db";

class AssetsRepo {
    async create(chatId: number, symbol: string) {
        const {rows} = await db.query('INSERT INTO assets (chat_id, symbol) VALUES ($1, $2) RETURNING *',
            [chatId, symbol])
        return rows[0]
    }

    async findByChatId(chatId: number) {
        const {rows} = await db.query('SELECT * FROM assets WHERE chat_id = $1', [chatId])
        return rows
    }

    async delete(chatId: number, symbol: string) {
        const {rows} = await db.query('DELETE FROM assets WHERE (chat_id = $1) AND (symbol = $2)',
            [chatId, symbol])
        return rows
    }
}
export default AssetsRepo