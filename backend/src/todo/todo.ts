import rand from "../../lib/rand";
export namespace TodoNS {
    export interface Todo {
        id : string;
        name : string;
        title : string;
        ctime : number;
        mtime : number; 
    }

    export interface CreateTodoParams {
        name : string;
        title : string;
    }

    export interface UpdateTodoParams {
        name? : string;
        title? : string;
    }

    export interface BLL {
        ListTodo() : Promise<Todo[]>;
        GetTodo(id : string) : Promise<Todo>;
        CreateTodo(params : CreateTodoParams) : Promise<Todo>;
        UpdateTodo(id : string, params : UpdateTodoParams) : Promise<Todo>;
        DeleteTodo(id : string) : Promise<Todo>;
    }

    export interface DAL {
        ListTodo() : Promise<Todo[]>;
        GetTodo(name : string) : Promise<Todo>;
        CreateTodo(todo : Todo) : Promise<void>;
        UpdateTodo(todo : Todo) : Promise<void>;
        DeleteTodo(id : string) : Promise<void>;
    }

    export const Generator = {
        NewTodoId : () => rand.uppercase(8)
    }

    export const Errors = {
        ErrTodoNotFound : "Todo not found"
    }
}

