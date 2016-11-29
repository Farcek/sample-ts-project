import * as IApiServe from 'express-serve';


import { config } from './config';
import { factory as ApiRouterFacotry } from './api/index';

const pkg:{name:string} = require('../package.json');

new IApiServe.ApiServe(pkg.name)
    .accessLog(IApiServe.AccessLogType.dev, 0)
    .router('/api', ApiRouterFacotry())
    .errorHandle(null, true)
    .onPreStart(async () => {
        // server initlazer
    })
    .start(config.service.port);