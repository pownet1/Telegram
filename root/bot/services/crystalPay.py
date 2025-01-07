import aiohttp
import asyncio
import json
from loader import config


async def create_invoice(id_of_purchase: int) -> [str]:
    headers = {
        "auth_login": config.payment.auth_login,
        "auth_secret": config.payment.auth_secret,
        "amount": config.tg_bot.prices[id_of_purchase],
        "type": "purchase",
        "lifetime": "3600",
        "description": "Оплата подписки"
    }
    async with aiohttp.ClientSession() as session:
        async with session.post('https://api.crystalpay.io/v2/invoice/create/', json=headers) as resp:
            data = json.loads(await resp.text())
            return data['id'], data['url']


async def get_invoice(invoice_id: str) -> bool:
    headers = {
        "auth_login": config.payment.auth_login,
        "auth_secret": config.payment.auth_secret,
        "id": invoice_id,
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(f'https://api.crystalpay.io/v2/invoice/info/', json=headers) as resp:
            data = json.loads(await resp.text())
            if data['state'] == "payed":
                return True
            return False

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(get_invoice("315784629_NhIIoKSMve"))
    loop.close()
