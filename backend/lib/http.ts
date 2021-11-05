export const enum HttpStatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    MethodNotAllowed = 405,
}

export const HttpParamValidators = {
    MustBeString(req, res, obj: any, key: string, min = 1, max = 512) {
        const v = obj[key];
        if (typeof v !== "string") {
            res.status(HttpStatusCodes.BadRequest).json(`${key} must be string`);
            res.end();
        }
        if (v.length < min) {
            res.status(HttpStatusCodes.BadRequest).json(`${key} must be at least ${min} characters`);
            res.end();
        }
        if (v.length > max) {
            res.status(HttpStatusCodes.BadRequest).json(`${key} must be shorter than ${max} characters`);
            res.end();
        } 
        return v;
    },
    MustBeOneOf<T>(req, res, obj: any, key: string, values: T[] = []): T {
        const value = obj[key];
        for (const v of values) {
            if (v === value) {
                return v;
            }
        }
        res.status(HttpStatusCodes.BadRequest).json(`${key} must be one of ${values.join(',')}`);
        res.end();
    },
}

