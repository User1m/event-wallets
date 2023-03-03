import sabi from "./simpleAcctABI.json" assert { type: "json" };
import safbi from "./SimpleAccountFactory.json" assert { type: "json" };
import dotenv from 'dotenv';

dotenv.config();

export const abis = {
    simpleAccount:        sabi,
    simpleAccountFactory: safbi
}

export const networks = {
	goerli: {
                url:     process.env.GOERLI_INFURA_URL, 
                chainId: 5,
                
                SAFAddress:  "0x822cFC6B982285Ccb35Df85287DE57f44cb25814",
            },
            
	mumbai: {
                url:     process.env.MUMBAI_INFURA_URL, 
                chainId: 80001,

                SAFAddress:  "0xC529a6A67181E50859808eEFe5bBc589eB3dd609",
            },
            
	base:   {
                url:     process.env.BASE_INFURA_URL,   
                chainId: 84531,
                
                SAFAddress:  "0x???",
            },

}


export const prevCreatedSimpleAccts = {
    goerli: "0x5914594613c2fb4a3fb80f22f7baa8906368e3b3",
    mumbai: "0x2Cd8961b040c831eFC31DFdFaC6Aa52D33C79f2f",
    base:   "0x???",
}















