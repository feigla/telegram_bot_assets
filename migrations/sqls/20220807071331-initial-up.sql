create TABLE IF NOT EXISTS "assets" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "symbol" VARCHAR(255) NOT NULL
)