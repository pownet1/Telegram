import os

import sqlite3
import shutil

environment = {
    "1": "149.154.175.53",
    "2": "149.154.167.51",
    "3": "149.154.175.100",
    "4": "149.154.167.91",
    "5": "91.108.56.130",
}

async def prepare_account(dc_id: int, auth_key: str, telegram_phone: str, folder: str):
    if not os.path.exists(folder):
        os.makedirs(folder)

    auth_key = bytes.fromhex(auth_key)
    session_file_path = f"{folder}/{telegram_phone}.session"

    shutil.copy2("/root/bot/default.session", session_file_path)

    con = sqlite3.connect(session_file_path)
    cur = con.cursor()
    cur.execute(f"UPDATE sessions SET server_address = ?, dc_id = ?, auth_key = ? WHERE port = 443", (environment[str(dc_id)], dc_id, auth_key))

    con.commit()
    con.close()