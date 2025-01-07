import datetime
import os
import aiosqlite

DB_PATH = f"/root/bot/data.db"
def str_to_date(str_date: str) -> datetime:
    return datetime.datetime.strptime(str_date, '%Y-%d-%m')


def date_to_str(date: datetime) -> str:
    return date.strftime('%Y-%d-%m')


async def get_count_logs(telegram_id):
    # get domain where telegram_id = telegram_id
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT count_logs FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()


async def add_one_logs(telegram_id):
    logs = await get_count_logs(telegram_id) + 1
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET count_logs = ? WHERE telegram_id = ?",
                         (logs, telegram_id,))
        await db.commit()


async def get_domains():
    # get all domain and value name where domain != 0
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT domain, name FROM user WHERE domain != 0") as cursor:
            return await cursor.fetchall()


async def get_domain_by_telegram_id(telegram_id):
    # get domain where telegram_id = telegram_id
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT domain FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()


async def get_domain(domain):
    # get domain where domain = domain
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT domain FROM user WHERE domain = ?", (domain,)) as cursor:
            return await cursor.fetchone()

async def get_ssl_status(telegram_id):
    # get ssl_status where telegram_id = telegram_id
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT ssl FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()


async def get_telegram_id_by_domain(domain):
    # get telegram_id where domain = domain
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT telegram_id FROM user WHERE domain = ?", (domain,)) as cursor:
            return await cursor.fetchone()

async def get_stats():
    # get all name and count_logs and sort by count_logs
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT name, count_logs FROM user ORDER BY count_logs DESC") as cursor:
            return await cursor.fetchall()


async def set_domain(telegram_id, domain):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET domain = ? WHERE telegram_id = ?", (domain, telegram_id))
        await db.commit()


async def get_all_users():
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT telegram_id, name, access_level, date FROM user") as cursor:
            return await cursor.fetchall()


async def get_auto_convert_status(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT auto_convert FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()

async def get_auto_2fa_status(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT auto_convert FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()            

async def set_date(telegram_id, date):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET date = ? WHERE telegram_id = ?", (date_to_str(date), telegram_id))
        await db.commit()


async def access_permit(telegram_id, name, access_level, date):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET name = ?, access_level = ?, date = ? WHERE telegram_id = ?",
                         (name, access_level, date_to_str(date), telegram_id))
        await db.commit()


async def revoke_permit(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET access_level = 0 WHERE telegram_id = ?", (telegram_id,))
        await db.commit()


async def get_date(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT date FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()


async def get_date_and_name(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT name, date FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()


async def get_access_level(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT access_level FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return (await cursor.fetchone())[0]

async def get_dump_access(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT dump_access FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return (await cursor.fetchone())[0]

async def get_spam_access(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT spam_access FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return (await cursor.fetchone())[0]

async def set_auto_convert_status(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        [status] = await get_auto_convert_status(telegram_id)
        status = 1 - status
        await db.execute("UPDATE user SET auto_convert = ? WHERE telegram_id = ?", (status, telegram_id,))
        await db.commit()

async def set_auto_2fa_status(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        [status] = await get_auto_2fa_status(telegram_id)
        status = 1 - status
        await db.execute("UPDATE user SET auto_2fa = ? WHERE telegram_id = ?", (status, telegram_id,))
        await db.commit()


async def get_user(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT * FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()


async def add_new_user(telegram_id, name):
    async with aiosqlite.connect(DB_PATH) as db:
            if not await get_user(telegram_id):
                date = date_to_str(datetime.datetime.now())
                await db.execute("INSERT INTO user (telegram_id, date, name) VALUES (?, ?, ?)", (telegram_id, date, name,))
                await db.commit()
                return True

    return False

async def add_new_log_data(telegram_id, data):
    async with aiosqlite.connect(DB_PATH) as db:
            date = date_to_str(datetime.datetime.now())
            await db.execute("INSERT INTO logs (telegram_id, data, creation_date) VALUES (?, ?, ?)", (telegram_id, data, date,))
            await db.commit()

async def get_logs_by_date(telegram_id, days):
    async with aiosqlite.connect(DB_PATH) as db:
        now_date = datetime.datetime.now()
        if days == -1:
            date = datetime.datetime(1970, 1, 1)
        else:
            date = datetime.datetime.now() - datetime.timedelta(days=days)
         
        async with db.execute("SELECT data, creation_date FROM logs WHERE telegram_id = ?", (telegram_id,)) as cursor:
            result = await cursor.fetchall()
            sorted_result = []
            for row in result:
                row_date = str_to_date(row[1])
                if date <= row_date <= now_date:
                    sorted_result.append(row[0])

            return sorted_result
            
async def get_template_status(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT template, template_status FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()

async def get_keyword(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT keyword FROM user WHERE telegram_id = ?", (telegram_id,)) as cursor:
            return await cursor.fetchone()

async def set_access_level(telegram_id, access_level):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET access_level = ? WHERE telegram_id = ?", (access_level, telegram_id))
        await db.commit()


async def set_access_spam(telegram_id, spam_access):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET spam_access = ? WHERE telegram_id = ?", (spam_access, telegram_id))
        await db.commit()

async def set_access_dump(telegram_id, dump_access):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET dump_access = ? WHERE telegram_id = ?", (dump_access, telegram_id))
        await db.commit()

async def add_new_log(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET count_logs = count_logs + 1 WHERE telegram_id = ?", (telegram_id,))
        await db.commit()

async def switch_templates(telegram_id):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET template_status = 1 - template_status WHERE telegram_id = ?", (telegram_id,))
        await db.commit()

async def set_template(telegram_id, template):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET template = ? WHERE telegram_id = ?", (template, telegram_id,))
        await db.commit()


async def set_key(telegram_id, key: str):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE user SET keyword = ? WHERE telegram_id = ?", (key, telegram_id,))
        await db.commit()