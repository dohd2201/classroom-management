import { TodoNS } from "./todo";

export class TodoBLLBase implements TodoNS.BLL {
    constructor(private dal : TodoNS.DAL) { }

    async init() { }

    async GetTodo(id : string) {
        const doc = await this.dal.GetTodo(id);
        return doc;
    }

    async ListTodo() {
        const docs = await this.dal.ListTodo();
        return docs;
    }

    async CreateTodo(params : TodoNS.CreateTodoParams) {
        const todo : TodoNS.Todo = {
            id : TodoNS.Generator.NewTodoId(),
            name : params.name,
            title : params.title,
            ctime : Date.now(),
            mtime : Date.now()
        }
        await this.dal.CreateTodo(todo);
        return todo;
    }

    async UpdateTodo(id : string, params : TodoNS.UpdateTodoParams) {
        const todo = await this.GetTodo(id);
        if (params.name) {
            todo.name = params.name;
        }
        if (params.title) {
            todo.title = params.title;
        }
        todo.mtime = Date.now();
        await this.dal.UpdateTodo(todo);
        return todo;
    }

    async DeleteTodo(id : string) {
        const todo = await this.GetTodo(id);
        await this.dal.DeleteTodo(id);
        return todo;
    }
}