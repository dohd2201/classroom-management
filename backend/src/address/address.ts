import rand from "../../lib/rand";
export namespace AddressNS {
    export interface Address {
        id : string
        name : string
        type : Type
        parent_id : string
        ctime: number
        mtime: number
    }

    export enum Type {
        Province= "province",
        District= "district",
        Ward= "ward",
    }

    export interface CreateAddressParams {
        name : string
        type : Type
        parent_id : string
    }

    export interface FilterAddress {
        type: string,
        parent_id ?:string
    }

    export interface BLL {
        ListAddress(filter: FilterAddress): Promise<Address[]>
        GetAddress(name: string): Promise<Address>
    }

    export interface DAL {
        ListAddress(filter: any): Promise<Address[]>
        GetAddress(name: string): Promise<Address>
    }

    export const Generator = {
        NewAddressId : () => rand.alphabet(12)
    }
    export const Errors = {
        ErrNotFound : "Not found"
    }
}

