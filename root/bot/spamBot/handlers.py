import telethon
from aiogram.types import Message, CallbackQuery
from aiogram.dispatcher import FSMContext
from aiogram import Dispatcher
from spamBot.states import User
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.callback_data import CallbackData
from data.config import load_config
import utils.database as db
from aiogram import types
from aiogram.dispatcher.handler import CancelHandler
import asyncio
from telethon.sync import TelegramClient
from telethon import functions
from telethon.tl.types import User as TgUser
from random import randint


async def user_start(message: Message, state: FSMContext):
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("Начать спам", callback_data="start_spam"))

    await message.answer("Выберите действие", reply_markup=markup)


async def start_spam(call: CallbackQuery, state: FSMContext):
    await call.message.edit_text("Отправьте сессию")
    await User.EnterSession.set()


async def enter_title(message: Message, state: FSMContext):
    file_name = message.document.file_name
    await message.document.download(destination_file="sessions/" + file_name)

    await state.update_data(file_name=file_name)

    await message.answer("Отправьте названия для канала")
    await User.EnterName.set()


async def enter_name(message: Message, state: FSMContext):
    await state.update_data(name=message.text)
    await message.answer("Отправьте текст для спама")
    await User.EnterText.set()


async def enter_text(message: Message, state: FSMContext):
    await state.update_data(text=message.text)

    data = await state.get_data()
    file_name = data.get("file_name")
    title = data.get("name")
    text = message.text
    await message.answer("Спам запущен!")
    await state.finish()

    client = TelegramClient(f'sessions/{file_name}', 2496, '8da85b0d5bfe62527e5b244c209159c3')
    await client.connect()
    if True:
        me = await client.get_me()
        if me:
            await message.answer("Аккаунт авторизован")
        else:
            await message.answer("Аккаунт не авторизован")
            raise CancelHandler()
        users = []

        contacts = await client(functions.contacts.GetContactsRequest(
            hash=randint(1, 999999999999)
        ))

        for contact in contacts.users:
            users.append(contact)

        await asyncio.sleep(3)

        async for dialog in client.iter_dialogs():
            if isinstance(dialog.entity, TgUser) and dialog.id not in users:
                if not dialog.entity.bot and not dialog.entity.deleted:
                    print(dialog.entity.username)
                    users.append(dialog.entity)
        await asyncio.sleep(3)

        channel_created = await client(functions.channels.CreateChannelRequest(
            about=title,
            title=title
        ))
        await asyncio.sleep(3)

        message = await client.send_message(channel_created.chats[0], text)

        await asyncio.sleep(1)
        print(users)
        add_user = await client(functions.channels.InviteToChannelRequest(
            channel=channel_created.chats[0],
            users=users
        ))
        print(add_user)
        # result_pin = await client(functions.messages.UpdatePinnedMessageRequest(
        #     peer=chat_created.chats[0].id,
        #     id=message.id,
        #     unpin=False,
        #     pm_oneside=False
        # ))


    #await message.answer("Спам завершен!")
    await state.reset_state()


def register_user(dp: Dispatcher):
    dp.register_message_handler(user_start, commands=["start"], state="*")
    dp.register_callback_query_handler(start_spam, text="start_spam", state="*")
    dp.register_message_handler(enter_title, state=User.EnterSession, content_types=types.ContentTypes.DOCUMENT)
    dp.register_message_handler(enter_name, state=User.EnterName)
    dp.register_message_handler(enter_text, state=User.EnterText)

