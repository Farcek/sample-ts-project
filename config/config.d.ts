declare namespace myproject.config {
    interface IDB {
        database: string;
        username: string;
        password: string;

        host: string;
        port: number;

        dialect: string;
        pool: any;
        logging: boolean
    }
    interface IRedis {
        prefix : string
    }
    interface IService {
        port: number;
        accessLog: boolean
    }

    interface IConfig {
        db: IDB
        redis: IRedis
        service: IService
    }

}