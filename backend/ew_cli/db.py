from tinydb import TinyDB, Query
from pathlib import Path
from dataclasses import dataclass
from typing import TypeVar
from pydantic import BaseModel


Schema = TypeVar('Schema')

@dataclass
class TinyDBWrapper:
    
    pathToDb:str 
    
    def __post_init__(self):
        self.pathToDb = Path(self.pathToDb)
        if not self.pathToDb.exists():
            self.pathToDb.touch()
        self.tdb = TinyDB(str(self.pathToDb))

    def insertSchema(self, schema: BaseModel) -> int:
        """
        Overview
        ---------
        Insert a schema from the schema class into the db\n
        and return the id of the inserted document.
        
        
        Parameter
        ---------
        schema : Schema
            A schema from the schema class.

        Returns
        -------
        int:
            The id of the inserted document
        
        Messages
        --------
        success: "New Entry in db: {id}"
        print: {id, *schema}
        """
        id = self.tdb.insert(schema.dict()) #asdict(schema))
        
        #Messages.success(f"New Entry in db: {id}")        
        print("\t" , {"id": id} | self.tdb.get(doc_id=id))
        
        return id


saf_db = TinyDBWrapper(Path(__file__).parent / "saf_db.json")
aa_db = TinyDBWrapper(Path(__file__).parent / "aa_db.json")
env_db = TinyDBWrapper(Path(__file__).parent / "env_db.json")