import * as  tsrouter from "tsrouter";
import * as express from "express";



import API = myproject.api.add;

export interface IRequest {
    params: API.IReqestPathParams
}

export const PATH = "/:a/:b";

export class Route extends tsrouter.ExpressRouter<express.Request, API.IResult> {
    async process(req: IRequest): Promise<API.IResult> {
        let a = parseInt(req.params.a);
        let b = parseInt(req.params.b);
        return {
            result: a + b
        }
    }
}
