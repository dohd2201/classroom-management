import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import "./config";
import { Connect } from "../lib/mongodb";

import { NewTodoAPI } from "./todo/todo.api";
import { TodoBLLBase } from "./todo/todo.business";
import { TodoMongoData } from "./todo/todo.model";

import { NewUserAPI } from "./user/user.api";
import { UserBLLBase } from "./user/user.business";
import { UserMongoData } from "./user/user.model";

import { NewAddressAPI } from "./address/address.api";
import { AddressBLLBase } from "./address/address.business";
import { AddressMongoData } from "./address/address.model";

async function main() {
    dotenv.config();
    const client = await Connect(process.env.DB_URL);
    const db = client.db(process.env.DB_NAME);
    console.log("connected to database")
    /***************************************************/
    const todoDAL = new TodoMongoData(db);
    await todoDAL.init();
    const todoBLL = new TodoBLLBase(todoDAL);
    await todoBLL.init();

    //user
    const userDAL = new UserMongoData(db);
    await userDAL.init();
    const userBLL = new UserBLLBase(userDAL);
    await userBLL.init();

    //address
    const addressDAL = new AddressMongoData(db)
    await addressDAL.init()
    const addressBLL = new AddressBLLBase(addressDAL)
    await addressBLL.init()
    /***************************************************/
    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors());
    app.use("/api/todo/", NewTodoAPI(todoBLL));
    app.use("/api/user/", NewUserAPI(userBLL));
    app.use("/api/address", NewAddressAPI(addressBLL))
    /***************************************************/
    app.listen(process.env.PORT, () => {
        console.log("Server listen on " + process.env.PORT);
    })
}

main().catch(err => console.log(err))