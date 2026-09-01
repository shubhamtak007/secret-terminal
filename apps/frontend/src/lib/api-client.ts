import axios from 'axios';
import { setupInterceptors } from "./http-interceptor";

const secretTerminalClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const binanceClient = axios.create({
    baseURL: 'https://api.binance.com/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const clientList = [binanceClient, secretTerminalClient];

for (const client of clientList) {
    setupInterceptors(client);
}

export { secretTerminalClient, binanceClient }