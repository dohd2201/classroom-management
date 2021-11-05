import { TodoNS } from "./todo";
import { Db } from "mongodb";
import { FromMongoMany , FromMongoOne, MongoModel, ToMongoData } from "../../lib/mongodb";

export class TodoMongoData implements TodoNS.DAL {
    constructor(private db : Db) { }

    private col_todo = this.db.collection<MongoModel<TodoNS.Todo>>("todo");

    async init() { }
    
    async ListTodo() {
        const docs = await this.col_todo.find().toArray();
        return FromMongoMany<TodoNS.Todo>(docs);
    }

    async GetTodo(id : string) {
        const doc = await this.col_todo.findOne({_id : id});
        return FromMongoOne<TodoNS.Todo>(doc);
    }

    async CreateTodo(todo : TodoNS.Todo) {
        try {
            const doc = ToMongoData(todo);
            await this.col_todo.insertOne(doc);
        } catch (err) {
            throw err;
        }
    }

    async UpdateTodo(todo : TodoNS.Todo) {
        await this.col_todo.updateOne({_id : todo.id }, { $set : todo });
    }

    async DeleteTodo(id : string) {
        await this.col_todo.deleteOne({ _id : id });
    }
}