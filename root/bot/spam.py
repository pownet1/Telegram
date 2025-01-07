import asyncio
import logging
from spamBot.subscribtion import SubscribeMiddleware
from spamBot.handlers import register_user
from spamBot.loader import bot, dp

logger = logging.getLogger(__name__)


def register_all_handlers(dp):
    register_user(dp)


async def main():
    logging.basicConfig(
        level=logging.INFO,
        format=u'%(filename)s:%(lineno)d #%(levelname)-8s [%(asctime)s] - %(name)s - %(message)s',
    )
    logger.info("Starting bot")

    dp.middleware.setup(SubscribeMiddleware())
    register_all_handlers(dp)
    try:
        await dp.start_polling()
    finally:
        await dp.storage.close()
        await dp.storage.wait_closed()
        await bot.session.close()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.error("Bot stopped!")
