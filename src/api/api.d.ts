declare namespace myproject.api {
    namespace home {
        interface IReqestPathParams {
            user: string
        }
        interface IResult {
            message:string
        }
    }
    namespace add {
        interface IReqestPathParams {
            a: string
            b: string
        }
        interface IResult {
            result:number
        }
    }

    
}