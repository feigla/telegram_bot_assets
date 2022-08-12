import {DefaultApi} from "finnhub-ts";

export const finnhubClient = new DefaultApi({
    apiKey: process.env.API_KEY,
    isJsonMime: (input) => {
        try {
            JSON.parse(input)
            return true
        } catch (error) {}
        return false
    },
})