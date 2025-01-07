from aiogram import Bot, Dispatcher
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.contrib.fsm_storage.redis import RedisStorage2

from data.config import load_config
from spamBot.subscribtion import SubscribeMiddleware

config = load_config(".env")
storage = MemoryStorage()
bot = Bot(token=config.tg_bot.spam_token, parse_mode='HTML')
dp = Dispatcher(bot, storage=storage)
dp.middleware.setup(SubscribeMiddleware())
