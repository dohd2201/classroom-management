import * as express from "express";
import { TodoNS } from "./todo";
import { HttpParamValidators, HttpStatusCodes } from "../../lib/http";

export function NewTodoAPI(todoBLL: TodoNS.BLL) {
    const router = express.Router();
    router.use(express.json());

    router.get("/todo/list", async (req, res) => {
        const docs = await todoBLL.ListTodo();
        res.json(docs);
    })

    router.get("/todo/get", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req, res, req.query, "id", 6);
        const doc = await todoBLL.GetTodo(id);
        if (!doc) {
            return res.status(HttpStatusCodes.NotFound).json(TodoNS.Errors.ErrTodoNotFound)
        }
        return res.json(doc);
    })

    router.post("/todo/create", async (req, res) => {
        const params: TodoNS.CreateTodoParams = {
            name: HttpParamValidators.MustBeString(req, res, req.body, "name", 2),
            title: HttpParamValidators.MustBeString(req, res, req.body, "title", 2),
        }
        const todo = await todoBLL.CreateTodo(params);
        return res.json(todo);
    })

    router.post("/todo/update", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req, res, req.query, "id", 6);
        const params: TodoNS.UpdateTodoParams = {};
        if (req.body.name) {
            params.name = HttpParamValidators.MustBeString(req, res, req.body, "name", 2);
        }
        if (req.body.title) {
            params.title = HttpParamValidators.MustBeString(req, res, req.body, "title", 2);
        }
        const doc = await todoBLL.UpdateTodo(id, params);
        return res.json(doc);
    })

    router.post("/todo/delete", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req, res, req.query, "id", 6);
        const doc = await todoBLL.DeleteTodo(id);
        return res.json(doc);
    })

    return router;
}