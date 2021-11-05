import e = require("express");
import { AddressNS } from "./address";

export class AddressBLLBase implements AddressNS.BLL {
    constructor(private dal : AddressNS.DAL) { }

    async init() { }

    async ListAddress(filter: AddressNS.FilterAddress){
        const docs = await this.dal.ListAddress(filter)

        const HN = docs.filter(el => el.name ==="Thành phố Hà Nội")
        const HCM = docs.filter(el => el.name ==="Thành phố Hồ Chí Minh")

        return [...HN, ...HCM, ...docs.filter(el=>{if(el.name !=="Thành phố Hà Nội" && el.name !=="Thành phố Hồ Chí Minh") return el})]
    }

    async GetAddress(name: string){
        const doc = await this.dal.GetAddress(name)
        return doc

    }

}