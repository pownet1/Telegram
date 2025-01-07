from datetime import datetime


def str_to_date(str_date: str) -> datetime:
    return datetime.strptime(str_date, '%Y-%d-%m')


def date_to_str(date: datetime) -> str:
    return date.strftime('%Y-%d-%m')
