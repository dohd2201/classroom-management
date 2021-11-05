import { MongoClient } from "mongodb";

export async function Connect(url : string) : Promise<MongoClient> {
    const client = await MongoClient.connect(url);
    return client;
}

export type MongoModel<T> = Pick<T, Exclude<keyof T, 'id'>> & { _id: string };

export function FromMongoOne<T>(obj : MongoModel<T>) : T {
    if (!obj) {
        return null; 
    }
    const doc = {} as T;
    for (const [k, v] of Object.entries(obj)) {
        if (k === "_id") {
            doc["id"] = v;
        } else {
            doc[k] = v;
        }
    }
    return doc;
}

export function FromMongoMany<T>(arr : Array<MongoModel<T>>) : T[] {
    if(!arr) {
        return [];
    }
    const newArr = arr.map(el => FromMongoOne(el));
    return newArr;
}

export function ToMongoData(obj : object) {
    if(!obj) {
        return null;
    }
    let doc = {} as any;
    for (const [k, v] of Object.entries(obj)) {
        if (k === "id") {
            doc["_id"] = v;
        } else {
            doc[k] = v;
        }
    }
    return doc;
}
