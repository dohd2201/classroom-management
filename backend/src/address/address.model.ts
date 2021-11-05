'use strict';
import { AddressNS } from "./address";
import { Db } from "mongodb";
import { FromMongoMany , FromMongoOne, MongoModel  } from "../../lib/mongodb";

export class AddressMongoData implements AddressNS.DAL {
    constructor(private db : Db) { }

    private col_address = this.db.collection<MongoModel<AddressNS.Address>>("address");
    
    async init() { }

    async ListAddress(filter){
        const docs = await this.col_address.find(filter).toArray()
        return FromMongoMany<AddressNS.Address>(docs)
    }

    async GetAddress(name: string){
        const address = await this.col_address.findOne({name})
        return FromMongoOne<AddressNS.Address>(address)
    }
}