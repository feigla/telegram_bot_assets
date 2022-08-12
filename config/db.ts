import {Pool} from 'pg'
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB
})

pool.connect()

export default pool