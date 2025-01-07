from aiogram.dispatcher.filters.state import StatesGroup, State


class User(StatesGroup):
    UserDomain = State()
    UserDump = State()
    UserConvert = State()
    UserConvertType = State()
    UserSessionForSpam = State()
    UserTextForSpam = State()
    UserTitleForSpam = State()
    UserChangeTemplate = State()
    UserSetKey = State()
class Admin(StatesGroup):
    IssuePermitID = State()
    IssuePermitDate = State()
    IssuePermitName = State()
    IssuePermitLevel = State()

    IssueSpamPermitID = State()
    RevokeSpamPermitID = State()
    
    IssueDumpPermitID = State()
    RevokeDumpPermitID = State()

    RevokePermitID = State()
    
    TellText = State()
