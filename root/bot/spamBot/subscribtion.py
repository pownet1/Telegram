from datetime import datetime

from aiogram import types
from aiogram.dispatcher.handler import CancelHandler
from aiogram.dispatcher.middlewares import BaseMiddleware
import services.convertDate as convertDate
import utils.database as db
from keyboards.inline import subscribe_markup
from data.config import load_config

config = load_config()

class SubscribeMiddleware(BaseMiddleware):
    def __init__(self):
        super().__init__()

    async def on_process_message(self, message: types.Message, _):
        await db.add_new_user(message.from_user.id, message.from_user.first_name)
        spam_access = await db.get_spam_access(message.from_user.id)
        print(spam_access)
        if spam_access == 0:
            if message.from_user.id not in config.tg_bot.admin_ids:
                await message.answer("У вас нет доступа.")
                raise CancelHandler()
