from datetime import datetime

from aiogram import types
from aiogram.dispatcher.handler import CancelHandler
from aiogram.dispatcher.middlewares import BaseMiddleware
import services.convertDate as convertDate
import utils.database as db
from keyboards.inline import subscribe_markup
from data.config import load_config
import asyncio
from loader import bot
config = load_config()

class SubscribeMiddleware(BaseMiddleware):
    def __init__(self):
        super().__init__()

    async def on_process_message(self, message: types.Message, _):
        is_new = await db.add_new_user(message.from_user.id, message.from_user.first_name)
        if is_new:
            for admin_id in config.tg_bot.admin_ids:
                await bot.send_message(admin_id,
                                       f"Новый пользователь: "
                                       f"<a href=\"tg://user?id="
                                       f"{message.from_user.id}\">{message.from_user.first_name}</a>")
                await asyncio.sleep(0.05)

        access_level = await db.get_access_level(message.from_user.id)
        date = await db.get_date(message.from_user.id)
        if access_level == 0 or access_level == 2 and convertDate.str_to_date(date[0]) < datetime.now():
            if message.from_user.id not in config.tg_bot.admin_ids:
                # await message.answer("Чтобы приобрести доступ нажмите кнопку ниже.", reply_markup=await subscribe_markup()) !!! ЕСЛИ ПОДКЛЮЧИТЕ ПЛАТЕЖКУ !!!
                await message.answer("Чтобы приобрести доступ напишите владельцу @react_code")
                raise CancelHandler()
