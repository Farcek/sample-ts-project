import * as  tsrouter from "tsrouter";
import * as express from "express";



import API = myproject.api.home;

export interface IRequest {
    params: API.IReqestPathParams
}

export const PATH = ["/","/:user"];

export class Route extends tsrouter.ExpressRouter<express.Request, API.IResult> {
    async process(req: IRequest): Promise<API.IResult> {
        return {
            message: req.params.user ? `hi ${req.params.user}` : `hi :)`
        }
    }
}
