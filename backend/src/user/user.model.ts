import { UserNS } from "./user";
import { Db } from "mongodb";
import { FromMongoMany , FromMongoOne, MongoModel, ToMongoData } from "../../lib/mongodb";

export class UserMongoData implements UserNS.DAL {
    constructor(private db : Db) { }

    private col_user = this.db.collection<MongoModel<UserNS.User>>("user");
    private col_contact = this.db.collection<MongoModel<UserNS.Contact>>("contact");

    async init() { }

    //////////////// User DAL /////////////////
    async ListUser(){
        const docs = await this.col_user.find().toArray()
        return FromMongoMany<UserNS.User>(docs)
    }

    async GetUser(code: string){
        const doc = await this.col_user.findOne({code})
        return FromMongoOne<UserNS.User>(doc)
    }

    async CreateUser(user: UserNS.User){
        try {
            await this.col_user.insertOne(ToMongoData(user))
        } catch (error) {
            throw error
        }
    }

    async UpdateUser(user: UserNS.User){
        await this.col_user.updateOne({_id: user.id}, {$set: user})
    }

    async DeleteUser(code: string){
        await this.col_user.deleteOne({code})
    }

    //////////////// Contact DAL /////////////////
    async ListContact(filter: any){
        const docs = await this.col_contact.find(filter).toArray()
        return FromMongoMany<UserNS.Contact>(docs)
    }

    async GetContact(code: string){
        const doc = await this.col_contact.findOne({ref_id: code})
        return FromMongoOne<UserNS.Contact>(doc)
    }

    async CreateContact(contact: UserNS.Contact){
        try {
            await this.col_contact.insertOne(ToMongoData(contact))
        } catch (error) {
            throw error
        }
    }

    async UpdateContact(contact: UserNS.Contact){
        await this.col_contact.updateOne({ref_id: contact.ref_id}, {$set: contact})
    }

    async DeleteContact(code: string){
        await this.col_contact.deleteMany({ref_id: code})
    }
}