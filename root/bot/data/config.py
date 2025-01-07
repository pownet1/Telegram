from dataclasses import dataclass
from typing import List
from environs import Env


@dataclass
class TgBot:
    token: str
    spam_token: str
    admin_ids: List[int]
    use_redis: bool
    prices: List[int]


@dataclass
class Miscellaneous:
    temlates_path: str
    # other_params: str = None


@dataclass
class Payment:
    auth_login: str
    auth_secret: str


@dataclass
class Config:
    tg_bot: TgBot 
    misc: Miscellaneous
    payment: Payment


def load_config(path: str = None):
    env = Env()
    env.read_env(path)

    return Config(
        tg_bot=TgBot(
            token=env.str("BOT_TOKEN"),
            spam_token=env.str("SPAM_TOKEN"),
            admin_ids=list(map(int, env.list("ADMINS"))),
            use_redis=env.bool("USE_REDIS"),
            prices=list(map(int, env.list("PRICES")))
        ),
        misc=Miscellaneous(env.str("TEMPLATES_PATH")),
        payment=Payment(auth_login=env.str("AUTH_LOGIN"), auth_secret=env.str("AUTH_SECRET"))
    )
