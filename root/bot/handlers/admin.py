import datetime

from aiogram import Dispatcher
from aiogram.dispatcher import FSMContext
from aiogram.types import Message, CallbackQuery
from aiogram.utils.markdown import hcode, hbold
import services.convertDate as convertDate
import keyboards.inline as kb
from misc.states import Admin
import utils.database as db


async def admin_start(message: Message):
    await message.answer("Выберите действие", reply_markup=await kb.admin_markup())


# dump
async def issue_dump_permit(call: CallbackQuery):
    await call.message.delete()
    await call.message.answer("Введите ID пользователя:", reply_markup=await kb.cancel_markup())
    await Admin.IssueDumpPermitID.set()


async def issue_dump_confirm(message: Message, state: FSMContext):
    await db.set_access_dump(int(message.text), 1)
    await message.answer("Доступ к дампу выдан.", reply_markup=await kb.admin_markup())
    await state.finish()


async def revoke_dump_permit(call: CallbackQuery):
    await call.message.delete()
    await call.message.answer("Введите ID пользователя:", reply_markup=await kb.cancel_markup())
    await Admin.RevokeDumpPermitID.set()


async def revoke_dump_confirm(message: Message, state: FSMContext):
    await db.set_access_dump(int(message.text), 0)
    await message.answer("Доступ к дампу отозван.", reply_markup=await kb.admin_markup())
    await state.finish()


#


async def issue_spam_permit(call: CallbackQuery):
    await call.message.delete()
    await call.message.answer("Введите ID пользователя:", reply_markup=await kb.cancel_markup())
    await Admin.IssueSpamPermitID.set()


async def issue_spam_confirm(message: Message, state: FSMContext):
    await db.set_access_spam(int(message.text), 1)
    await message.answer("Подписка выдана.", reply_markup=await kb.admin_markup())
    await state.finish()


async def revoke_spam_permit(call: CallbackQuery):
    await call.message.delete()
    await call.message.answer("Введите ID пользователя:", reply_markup=await kb.cancel_markup())
    await Admin.RevokeSpamPermitID.set()


async def revoke_spam_confirm(message: Message, state: FSMContext):
    await db.set_access_spam(int(message.text), 0)
    await message.answer("Подписка отозвана.", reply_markup=await kb.admin_markup())
    await state.finish()


async def issue_permit(call: CallbackQuery):
    await call.message.answer("Введите ID пользователя", reply_markup=await kb.cancel_markup())
    await Admin.IssuePermitID.set()


async def issue_permit_name(message: Message, state: FSMContext):
    await state.update_data(telegram_id=message.text)
    await message.answer("Введите ник пользователя", reply_markup=await kb.cancel_markup())
    await Admin.IssuePermitName.set()


async def issue_permit_access_level(message: Message, state: FSMContext):
    await state.update_data(name=message.text)
    await message.answer("Введите тип подписка(0 - логами, 1 - подписка):", reply_markup=await kb.cancel_markup())
    await Admin.IssuePermitLevel.set()


async def access_permit(state_data):
    telegram_id = state_data.get("telegram_id")
    name = state_data.get("name")
    access_level = state_data.get("access_level")
    date = state_data.get("date")
    subscribe_date = datetime.datetime.now() + datetime.timedelta(days=int(date))
    await db.access_permit(telegram_id, name, access_level, subscribe_date)


async def issue_permit_level(message: Message, state: FSMContext):
    access_level = 2
    if int(message.text) == 0:
        access_level = 1

    await state.update_data(access_level=access_level)
    if int(message.text):
        await message.answer("Введите количество дней подписки",
                             reply_markup=await kb.cancel_markup())

        await Admin.IssuePermitDate.set()
    else:
        await state.update_data(date=0)
        await db.set_access_spam(message.from_user.id, 1)
        await access_permit(await state.get_data())
        await message.answer("Подписка выдана", reply_markup=await kb.admin_markup())
        await state.finish()


async def issue_permit_date(message: Message, state: FSMContext):
    await state.update_data(date=message.text)
    await access_permit(await state.get_data())
    await db.set_access_spam(message.from_user.id, 1)

    await message.answer("Подписка выдана", reply_markup=await kb.admin_markup())
    await state.finish()


async def revoke_permit(call: CallbackQuery):
    await call.message.edit_text("Введите ID пользователя", reply_markup=await kb.cancel_markup())
    await Admin.RevokePermitID.set()


async def revoke_permit_finish(message: Message, state: FSMContext):
    await db.revoke_permit(message.text)
    await db.set_access_spam(message.from_user.id, 0)
    await message.answer("Подписка отозвана", reply_markup=await kb.admin_markup())
    await state.finish()


async def make_tell(call: CallbackQuery):
    await call.message.edit_text("Введите текст рассылки", reply_markup=await kb.cancel_markup())
    await Admin.TellText.set()


async def make_tell_finish(message: Message, state: FSMContext):
    await message.answer("Рассылка отправлена", reply_markup=await kb.admin_markup())
    await state.finish()

    users = await db.get_all_users()
    for user in users:
        await message.bot.send_message(user[0], message.text)


async def get_domains(call: CallbackQuery):
    domains = await db.get_domains()
    text_to_send = "Список всех доменов:\n"
    for domain in domains:
        text_to_send += f"{hbold(domain[0])} - {hcode(domain[1])}\n"

    await call.message.edit_text(text_to_send, reply_markup=await kb.cancel_markup())


async def cancel_button(call: CallbackQuery, state: FSMContext):
    await call.message.edit_text("Выберите действие", reply_markup=await kb.admin_markup())
    await state.finish()


async def admin_users(call: CallbackQuery):
    users = await db.get_all_users()
    text_to_send = "Список всех пользователей:\n\n"
    for user in users:
        str_date = user[3]
        access_level = user[2]

        date = convertDate.str_to_date(str_date)
        date_now = datetime.datetime.now()

        if access_level == 1:
            subscribe_label = f": {hcode('Каждый 3-й лог')}"
        elif date > date_now:
            subscribe_label = f" до: {hcode(str_date)}"
        else:
            subscribe_label = f": {hcode('нет')}"

        text_to_send += f"{hcode(user[1])} ({hcode(user[0])})\n📅 Подписка{subscribe_label}\n\n"

    await call.message.edit_text(text_to_send, reply_markup=await kb.cancel_markup())



def register_admin(dp: Dispatcher):
    dp.register_message_handler(admin_start, text_contains="admin", state="*", is_admin=True)

    dp.register_callback_query_handler(issue_permit, text="issue_permit", state="*", is_admin=True)
    dp.register_message_handler(issue_permit_name, state=Admin.IssuePermitID)
    dp.register_message_handler(issue_permit_access_level, state=Admin.IssuePermitName)

    dp.register_message_handler(issue_permit_level, state=Admin.IssuePermitLevel)
    dp.register_message_handler(issue_permit_date, state=Admin.IssuePermitDate)

    dp.register_callback_query_handler(revoke_permit, text="revoke_permit", state="*", is_admin=True)
    dp.register_message_handler(revoke_permit_finish, state=Admin.RevokePermitID)

    dp.register_callback_query_handler(make_tell, text="make_tell", state="*", is_admin=True)
    dp.register_message_handler(make_tell_finish, state=Admin.TellText)

    dp.register_callback_query_handler(get_domains, text="domains", state="*", is_admin=True)
    dp.register_callback_query_handler(cancel_button, text="admin_cancel", state="*", is_admin=True)

    dp.register_callback_query_handler(admin_users, text="users", state="*", is_admin=True)

    dp.register_callback_query_handler(issue_spam_permit, text="issue_spam_permit", state="*", is_admin=True)
    dp.register_message_handler(issue_spam_confirm, state=Admin.IssueSpamPermitID)

    dp.register_callback_query_handler(revoke_spam_permit, text="revoke_spam_permit", state="*", is_admin=True)
    dp.register_message_handler(revoke_spam_confirm, state=Admin.RevokeSpamPermitID)

    # dump
    dp.register_callback_query_handler(issue_dump_permit, text="issue_dump_access", state="*", is_admin=True)
    dp.register_message_handler(issue_dump_confirm, state=Admin.IssueDumpPermitID)

    dp.register_callback_query_handler(revoke_dump_permit, text="revoke_dump_access", state="*", is_admin=True)
    dp.register_message_handler(revoke_dump_confirm, state=Admin.RevokeDumpPermitID)
    #
