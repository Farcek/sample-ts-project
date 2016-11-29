/// <reference path="./api.d.ts" />

import * as express from "express";
import * as home from "./home";
import * as add from "./add";



export function factory(): express.Router {
    let root = express.Router();
    root.get(home.PATH, new home.Route().handler())
    root.post(add.PATH, new add.Route().handler())


    return root;
}