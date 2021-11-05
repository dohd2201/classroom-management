import * as express from "express";
import { UserNS } from "./user";
import { HttpParamValidators, HttpStatusCodes } from "../../lib/http";

export function NewUserAPI(userBLL: UserNS.BLL) {
    const router = express.Router();
    router.use(express.json());
    const gender_values = Object.values(UserNS.Gender);

    /////////// User route ///////////
    router.get("/user/list", async (req, res) => {
        const docs = await userBLL.ListUser();
        res.json(docs);
    })

    router.get("/user/get", async (req, res) => {
        const code = HttpParamValidators.MustBeString(req, res, req.query, "code", 6);
        const doc = await userBLL.GetUser(code);
        if (!doc) {
            return res.status(HttpStatusCodes.NotFound).json(UserNS.Errors.ErrUserNotFound)
        }
        return res.json(doc);
    })

    router.post("/user/create", async(req, res) =>{
        const userParams: UserNS.CreateUserParams = {
            fullName: HttpParamValidators.MustBeString(req, res, req.body, "fullName", 2),
            gender: HttpParamValidators.MustBeOneOf(req, res, req.body, "gender", gender_values),
            birthday: HttpParamValidators.MustBeString(req, res, req.body, "birthday", 2),
            university: HttpParamValidators.MustBeString(req, res, req.body, "university", 2),
            majors: HttpParamValidators.MustBeString(req, res, req.body, "majors", 2),
            CCCD: HttpParamValidators.MustBeString(req, res, req.body, "CCCD", 2),
            skills: req.body.skills
        }

        const user = await userBLL.CreateUser(userParams)

        const contactParams: UserNS.CreateContactParams = {
            ref_id: user.code,
            phone: HttpParamValidators.MustBeString(req, res, req.body, "phone", 2),
            address: req.body.address,
            email: HttpParamValidators.MustBeString(req, res, req.body, "email", 2),
            facebook: HttpParamValidators.MustBeString(req, res, req.body, "facebook", 2)
        }

        const contact = await userBLL.CreateContact(contactParams)
        return res.json({...user, contact})
    })

    router.post("/user/update", async(req, res)=>{
        const code = HttpParamValidators.MustBeString(req, res, req.query, "code", 6)
        const params: UserNS.UpdateUserParams = {}

        if (req.body.fullName) 
            params.fullName = HttpParamValidators.MustBeString(req, res, req.body, "fullName", 2)
        if (req.body.gender) 
            params.gender= HttpParamValidators.MustBeOneOf(req, res, req.body, "gender", gender_values)
        if (req.body.birthday) 
            params.birthday= HttpParamValidators.MustBeString(req, res, req.body, "birthday", 2)
        if (req.body.university) 
            params.university= HttpParamValidators.MustBeString(req, res, req.body, "university", 2)
        if (req.body.majors) 
            params.majors= HttpParamValidators.MustBeString(req, res, req.body, "majors", 2)
        if (req.body.CCCD) 
            params.CCCD= HttpParamValidators.MustBeString(req, res, req.body, "CCCD", 2)
        if (req.body.skills) 
            params.skills= req.body.skills
        
        const doc = await userBLL.UpdateUser(code, params);
        return res.json(doc);
    })

    router.post("/user/delete", async(req,res)=>{
        const code = HttpParamValidators.MustBeString(req, res, req.query, "code", 6)
        const user = await userBLL.DeleteUser(code)
        return res.json({user})
    })

    /////////// Contact route ///////////

    router.get("/contact/list", async(req, res)=>{
        const filter = {} as any
        if(req.query.ref_id)
            filter.ref_id = req.query.ref_id
        const docs = await userBLL.ListContact(filter)
        return res.json(docs)
    })

    router.get("/contact/get", async(req, res)=>{
        const code = HttpParamValidators.MustBeString(req, res, req.query, "code", 6);
        const doc = await userBLL.GetContact(code);
        if (!doc) {
            return res.status(HttpStatusCodes.NotFound).json(UserNS.Errors.ErrContactNotFound)
        }
        return res.json(doc);
    })

    router.post("/contact/create", async(req, res)=>{
        const params: UserNS.CreateContactParams = {
            ref_id: HttpParamValidators.MustBeString(req, res, req.body, "code", 2),
            phone: HttpParamValidators.MustBeString(req, res, req.body, "phone", 2),
            address: req.body.address,
            email: HttpParamValidators.MustBeString(req, res, req.body, "email", 2),
            facebook: HttpParamValidators.MustBeString(req, res, req.body, "facebook", 2)
        }

        const doc = await userBLL.CreateContact(params)
        res.json(doc)
    })

    router.post("/contact/update", async(req, res)=>{
        const code = HttpParamValidators.MustBeString(req, res, req.query, "code", 6)
        const params: UserNS.UpdateContactParams = {}

        if (req.body.phone) 
            params.phone = HttpParamValidators.MustBeString(req, res, req.body, "phone", 2)
        if (req.body.address) 
            params.address= req.body.address
        if (req.body.email) 
            params.email= HttpParamValidators.MustBeString(req, res, req.body, "email", 2)
        if (req.body.facebook) 
            params.facebook= HttpParamValidators.MustBeString(req, res, req.body, "facebook", 2)
        
        const doc = await userBLL.UpdateContact(code, params);
        return res.json(doc);
    })

    router.post("/contact/delete", async(req,res)=>{
        const code = HttpParamValidators.MustBeString(req, res, req.query, "code", 6)
        const doc = await userBLL.DeleteContact(code)
        return res.json(doc)
    })

    return router;
}