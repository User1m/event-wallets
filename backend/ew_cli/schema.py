from pydantic import BaseModel

from enum import Enum

class NetworkEnum(str, Enum):
    MAINNET = "mainnet"
    GOERLI = "goerli"
    BASE = "base"
    MUMBAI = "mumbai"

class SimpleAccountFactorySchema(BaseModel):
    deploy_timestamp: str
    network: NetworkEnum
    entrypoint_address: str
    pk_used: str
    contract_address: str
    etherscan_link: str
    nick_name: str = None


class AbstractAccountSchema(BaseModel):
    deploy_timestamp: str
    account_address: str
    network: NetworkEnum
    owner_address: str
    salt: str
    
    pk_used: str
    SAF_address: str
    etherscan_link: str
    nick_name: str = None
    


class ENVSchema(BaseModel):
    var: str 
    val: str
