from aiogram.dispatcher.filters.state import StatesGroup, State


class User(StatesGroup):
    EnterSession = State()
    EnterName = State()
    EnterText = State()

