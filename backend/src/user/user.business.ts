import { UserNS } from "./user";

export class UserBLLBase implements UserNS.BLL {
    constructor(private dal : UserNS.DAL) { }

    async init() { }

    ////////// User BLL ////////////
    async ListUser() {
        const users = await this.dal.ListUser();

        // const viewUsers : UserNS.View_user[] = []3
        
        // for(let i = users.length-1; i>=0; i--){
        //     const viewUser = await this.GetUser(users[i].code)
        //     viewUsers.push(viewUser)
        // }
        // return viewUsers;
        const viewUsers = Promise.all( users.map( async user => {
            const contacts = await this.ListContact({ref_id: user.code})
            return {...user, contacts}
        }))
        return (await viewUsers).reverse()
    }

    async GetUser(code: string){
        const user = await this.dal.GetUser(code)
        const contact = await this.ListContact({ref_id: code})

        const viewUser: UserNS.ViewUser ={
            ...user,
            contacts: [...contact]
        }
        return viewUser
    }

    async CreateUser(params: UserNS.CreateUserParams){
        const user: UserNS.User = {
            id: UserNS.Generator.NewUserId(),
            code: UserNS.Generator.NewUserCode() as string,
            fullName: params.fullName,
            gender: params.gender,
            birthday: params.birthday,
            university: params.university,
            majors: params.majors,
            CCCD: params.CCCD,
            skills: params.skills,
            ctime : Date.now(),
            mtime : Date.now()
        }
        await this.dal.CreateUser(user)
        return user;
    }

    async UpdateUser(code: string, params: UserNS.UpdateUserParams){
        const user = await this.GetUser(code)

        for(let key in params){
            user[key] = params[key]
        }

        user.mtime = Date.now()
        await this.dal.UpdateUser(user)
        return user
    }

    async DeleteUser(code: string){
        const user = await this.GetUser(code)
        await this.dal.DeleteUser(code)
        await this.dal.DeleteContact(code)
        return user
    }

    ////////// Contact BLL ////////////
    async ListContact(filter: any){
        const docs = this.dal.ListContact(filter)
        return docs
    }

    async GetContact(code: string){
        const user = this.dal.GetContact(code)
        return user
    }

    async CreateContact(params: UserNS.CreateContactParams){
        const contact: UserNS.Contact = {
            id: UserNS.Generator.NewContactId(),
            ref: "user",
            ref_id: params.ref_id,
            phone: params.phone,
            address: params.address,
            email: params.email,
            facebook: params.facebook,
            ctime: Date.now(),
            mtime: Date.now()
        }
        await this.dal.CreateContact(contact)
        return contact
    }

    async UpdateContact(code: string, params: UserNS.UpdateContactParams){
        const contact = await this.GetContact(code)

        for(let key in params){
            contact[key] = params[key]
        }
        contact.mtime = Date.now()

        await this.dal.UpdateContact(contact)
        return contact
    }

    async DeleteContact(code: string){
        const contact = this.GetContact(code)
        await this.dal.DeleteContact(code)
        return contact
    }
}