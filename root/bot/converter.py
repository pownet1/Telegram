from opentele.td import TDesktop
from opentele.tl import TelegramClient
from opentele.api import API, UseCurrentSession
import asyncio


async def main():
    client = TelegramClient("telethon.session")
    tdesk = await client.ToTDesktop(flag=UseCurrentSession)
    tdesk.SaveTData("tdata")


asyncio.run(main())