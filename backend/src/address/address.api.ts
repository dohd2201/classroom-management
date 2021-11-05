import * as express from "express";
import { AddressNS } from "./address";
import { HttpParamValidators, HttpStatusCodes } from "../../lib/http";

export function NewAddressAPI(addressBLL: AddressNS.BLL) {
    const router = express.Router();
    router.use(express.json());
    const type_values = Object.values(AddressNS.Type);

    router.get("/address/list", async(req, res)=>{
        const filter : AddressNS.FilterAddress = {
            type: HttpParamValidators.MustBeOneOf(req, res, req.query, "type", type_values)
        } 
        if(req.query.parent_id )
            filter.parent_id = HttpParamValidators.MustBeString(req, res, req.query, "parent_id", 6)

        const docs = await addressBLL.ListAddress(filter)
        res.json(docs)
    })

    router.get("/address/get", async(req, res)=>{
        const name = HttpParamValidators.MustBeString(req, res, req.query, "name", 6)
        const doc = await addressBLL.GetAddress(name)
        if (!doc) {
            return res.status(HttpStatusCodes.NotFound).json(AddressNS.Errors.ErrNotFound)
        }
        res.json(doc)
    })    

    return router;
}