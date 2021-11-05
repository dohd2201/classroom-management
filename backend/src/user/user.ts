import rand from "../../lib/rand";
import {createUserCode} from '../../lib/createUserCode'

export namespace UserNS {
    export interface User {
        id : string;
        code: string;
        fullName: string;
        gender: Gender;
        birthday: string;
        university: string;
        majors: string;
        CCCD: string;
        skills: string[];
        ctime : number;
        mtime : number; 
    }

    export interface Contact {
        id: string;
        ref: string,
        ref_id: string,
        phone: string;
        address: userAddress;
        email: string;
        facebook: string;
        ctime : number;
        mtime : number; 
    }

    export interface userAddress {
        province: string,
        district: string,
        ward: string,
        detail: string
    }

    export enum Gender {
        male = "male",
        female = "female"
    }

    export interface CreateUserParams {
        fullName: string;
        gender: Gender;
        birthday: string;
        university: string;
        majors: string;
        CCCD: string;
        skills: string[];
    }

    export interface UpdateUserParams {
        fullName? : string;
        gender? : Gender;
        birthday? : string;
        university? : string;
        majors? : string;
        CCCD? : string;
        skills? : string[];
    }

    export interface CreateContactParams {
        ref_id: string,
        phone: string;
        address: userAddress;
        email: string;
        facebook: string
    }

    export interface UpdateContactParams {
        phone? : string;
        address? : userAddress;
        email? : string;
        facebook? : string;
    }

    export interface ViewUser extends User{
        contacts: Contact[]
    } 

    export interface BLL {
        //user bll
        ListUser() : Promise<ViewUser[]>;
        GetUser(code : string) : Promise<ViewUser>;
        CreateUser(params : CreateUserParams) : Promise<User>;
        UpdateUser(code : string, params : UpdateUserParams) : Promise<User>;
        DeleteUser(code : string) : Promise<User>;
        //contact bll
        ListContact(filter: any) : Promise<Contact[]>;
        GetContact(code: string): Promise<Contact>
        CreateContact(params: CreateContactParams): Promise<Contact>
        UpdateContact(code: string, params: UpdateContactParams): Promise<Contact>
        DeleteContact(code: string): Promise<Contact>
    }

    export interface DAL {
        //user dal
        ListUser(): Promise<User[]>;
        GetUser(code: string): Promise<User>;
        CreateUser(user: User): Promise<void>;
        UpdateUser(user: User): Promise<void>;
        DeleteUser(code: string): Promise<void>;
        //contact dal
        ListContact(filter: any): Promise<Contact[]>;
        GetContact(code: string): Promise<Contact>
        CreateContact(contact: Contact): Promise<void>
        UpdateContact(contact: Contact): Promise<void>
        DeleteContact(code: string): Promise<void>;
    }

    export const Generator = {
        NewUserId : () => rand.uppercase(12),
        NewUserCode : () => createUserCode(),
        NewContactId : () => rand.uppercase(10),
    }

    export const Errors = {
        ErrUserNotFound : "User not found",
        ErrContactNotFound : "Contact not found"
    }
}




