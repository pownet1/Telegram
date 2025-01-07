from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.callback_data import CallbackData
from data.config import load_config
import utils.database as db

config = load_config()
price_markup = CallbackData("price_markup", "id")
check_markup = CallbackData("check_markup", "invoice_id", "type_purchase")
download_markup = CallbackData("download", "interval")

async def main_markup(telegram_id):
    [get_auto_convert_status] = await db.get_auto_convert_status(telegram_id)
    dump_access = await db.get_dump_access(telegram_id)
    domain = await db.get_domain_by_telegram_id(telegram_id)
    markup = InlineKeyboardMarkup()

    if get_auto_convert_status:
        markup.add(InlineKeyboardButton("🟢 Автоконвертация", callback_data="auto_convert"))
    else:
        markup.add(InlineKeyboardButton("🔴 Автоконвертация", callback_data="auto_convert"))

    markup.add(InlineKeyboardButton("📁 Шаблоны", callback_data="user_templates"))
    if dump_access:
        markup.add(InlineKeyboardButton("📁 Дамп", callback_data="dump"))
    markup.add(InlineKeyboardButton("♻️ Конвертация", callback_data="converter"))
    # markup.add(InlineKeyboardButton("Начать спам", callback_data="start_spam")) ОТКЛЮЧЕН!
    markup.add(InlineKeyboardButton("📤 Выгрузить логи", callback_data="download_logs"))
    if domain[0] is not None:
        markup.add(InlineKeyboardButton("🌐 Изменить домен", callback_data="add_domain"))
        markup.add(InlineKeyboardButton("🔑 Установить ключ", callback_data="set_key"))
    else:
        markup.add(InlineKeyboardButton("🌐 Добавить домен", callback_data="add_domain"))
    markup.add(InlineKeyboardButton("📊 Статистика", callback_data="get_stats"))

    markup.add(InlineKeyboardButton("❤️ Автор", url="https://t.me/react_code"))
    return markup


def choose_template_markup(_status):
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton(f"{['🔴', '🟢'][_status]} Шаблоны", callback_data="switch_template"))
    if _status:
        markup.add(InlineKeyboardButton("Изменить шаблон", callback_data="change_template"))
    markup.add(InlineKeyboardButton("🕊 В меню", callback_data="go_menu"))
    return markup

def set_interval_markup():
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton(f"1 день", callback_data=download_markup.new(interval=1)))
    markup.add(InlineKeyboardButton(f"7 дней", callback_data=download_markup.new(interval=7)))
    markup.add(InlineKeyboardButton(f"30 дней", callback_data=download_markup.new(interval=30)))
    markup.add(InlineKeyboardButton(f"За все время", callback_data=download_markup.new(interval=-1)))
    markup.add(InlineKeyboardButton("🕊 В меню", callback_data="go_menu"))
    return markup

async def subscribe_markup():
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("✅ Приобрести доступ", callback_data="buy-permit"))
    return markup


async def price_of_subscribe_markup():
    markup = InlineKeyboardMarkup()
    prices = config.tg_bot.prices
    markup.add(InlineKeyboardButton(f"1 месяц - {prices[0]}р", callback_data=price_markup.new(id="0")))
    markup.add(InlineKeyboardButton(f"2 месяца - {prices[1]}р", callback_data=price_markup.new(id="1")))
    markup.add(InlineKeyboardButton(f"3 месяца - {prices[2]}р", callback_data=price_markup.new(id="2")))
    markup.add(InlineKeyboardButton(f"Навсегда - {prices[3]}р", callback_data=price_markup.new(id="3")))
    return markup


async def check_payment_markup(invoice_id, type_purchase):
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("✅ Проверить оплату", callback_data=check_markup.new(invoice_id, type_purchase)))
    return markup


async def admin_markup():
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("✅ Выдать доступ", callback_data="issue_permit"),
               InlineKeyboardButton("❌ Забрать доступ", callback_data="revoke_permit"))
    markup.add(InlineKeyboardButton("✅ Выдать доступ к рассылке", callback_data="issue_spam_permit"),
               InlineKeyboardButton("❌ Забрать доступ рассылки", callback_data="revoke_spam_permit"))
    markup.add(InlineKeyboardButton("✅ Выдать доступ к дампу", callback_data="issue_dump_access"),
               InlineKeyboardButton("❌ Забрать доступ к дампу", callback_data="revoke_dump_access"))
    markup.add(InlineKeyboardButton("👨🏽‍💻 Пользователи", callback_data="users"))
    markup.add(InlineKeyboardButton("🌐 Домены", callback_data="domains"))
    markup.add(InlineKeyboardButton("📮 Рассылка", callback_data="make_tell"))
    return markup


async def cancel_markup():
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("❌ Отменить", callback_data="admin_cancel"))
    return markup


async def go_main_markup():
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("🕊 В меню", callback_data="go_menu"))
    return markup


async def converter_markup():
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("TDATA", callback_data="converter_tdata"))
    markup.add(InlineKeyboardButton("SESSION", callback_data="converter_session"))
    return markup

async def proxy_type_markup():
    markup = InlineKeyboardMarkup()

    markup.add(InlineKeyboardButton("HTTP", callback_data="proxy_type_http"))
    markup.add(InlineKeyboardButton("SOCKS5", callback_data="proxy_type_socks5"))

    return markup