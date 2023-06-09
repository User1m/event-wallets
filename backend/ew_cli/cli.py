from db import saf_db, aa_db, env_db
from schema import SimpleAccountFactorySchema, AbstractAccountSchema, ENVSchema
import fire 
from encryptor import TokenEncryptor
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()
secret_key = os.environ["SECRET"]

def add_saf(
                n: str,
                ep: str,
                pk: str,
                addr: str,
                es: str,
                nn: str = None,
                ts: str = "now",
            ) -> None:
    """
    Overview
    ---------
    Creates a new SAF (Simple Account Factory) entry.

    Parameters
    ----------
    n : str
        Network name.
    ep : str
        Entrypoint address.
    pk : str
        Public key.
    addr : str
        Contract address.
    es : str
        Etherscan link.
    nn : str, optional
        Nickname (default: None).
    ts : str, optional
        Timestamp (default: "now").

    Returns
    -------
    None

    Example Usage
    -------------
    new_saf(
        n="mainnet",
        ep="0x1234567890",
        pk="abcd1234",
        addr="0x9876543210",
        es="https://etherscan.io/address/0x9876543210",
        nn="My SAF",
        ts="2022-05-30 12:34:56"
    )

    Raises
    ------
    None

    Notes
    -----
    - If the `ts` parameter is set to "now", the current timestamp will be used.
    - This function inserts a new SAF entry into the SAF database.
    """
    if ts == "now":
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    saf_db.insertSchema(
        SimpleAccountFactorySchema(
            deploy_timestamp=ts,
            network=n,
            entrypoint_address=ep,
            pk_used=TokenEncryptor.encrypt(pk, secret_key),
            contract_address=addr,
            etherscan_link=es,
            nick_name=nn
        )
    )

def add_aa(
                n: str,
                addr: str,
                oa: str,
                salt: str,
                saf_addr: str,
                ts: str = "now",
          ) -> None:
    """
    Overview
    ---------
    Creates a new AA (Abstract Account) entry.

    Parameters
    ----------
    n : str
        Network name.
    addr : str
        Account address.
    oa : str
        Owner address.
    salt : str
        Salt value.
    saf_addr : str
        SAF (Simple Account Factory) address.
    ts : str, optional
        Timestamp (default: "now").

    Returns
    -------
    None

    Example Usage
    -------------
    new_aa(
        n="mainnet",
        addr="0x1234567890",
        oa="0xabcdef1234",
        salt="abcd1234",
        saf_addr="0x9876543210",
        ts="2022-05-30 12:34:56"
    )

    Raises
    ------
    None

    Notes
    -----
    - If the `ts` parameter is set to "now", the current timestamp will be used.
    - This function inserts a new AA (Abstract Account) entry into the AA database.
    """
    
    if ts == "now":
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    aa_db.insertSchema(
                        AbstractAccountSchema(
                                                deploy_timestamp=ts,
                                                account_address=addr,
                                                network=n,
                                                owner_address=oa,
                                                salt=salt,
                                                SAF_address=saf_addr
                                            )
                        )

def add_env_var(var:str, val: str):
    env_db.insertSchema(
                        ENVSchema(
                                    var=var,
                                    val=TokenEncryptor.encrypt(val, secret_key),
                                )
                        )

def all_aa():
    for entry in aa_db.tdb.all():
        print(f"\n\n========= Abstract Account: {entry.doc_id} =================")
        for k, v in entry.items():
            if k == "pk_used":
                v = TokenEncryptor.decrypt(v, secret_key)
            print(f'{k}: {v}')

def all_saf():
    for entry in saf_db.tdb.all():
        print(f"\n\n========= Simple Account Factory: {entry.doc_id} =================")
        for k, v in entry.items():
            print(f'{k}: {v}')

def all_env_vars():
    for entry in env_db.tdb.all():
        print(f' {entry["var"]} = "{TokenEncryptor.decrypt(entry["val"], secret_key)}" ')

if __name__ == '__main__':
    fire.Fire({
        "add_saf": add_saf,
        "add_aa": add_aa,
        "add_env_var": add_env_var,
        "all_env_vars": all_env_vars,
        "all_saf": all_saf,
        "all_aa": all_aa
    })


