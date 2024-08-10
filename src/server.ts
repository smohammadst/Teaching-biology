import * as express from 'express';
import mongoose from 'mongoose';
import * as morgan from 'morgan'
import { InternalServerError, NotFound } from 'http-errors'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocJs from 'swagger-jsdoc'
import * as path from 'path';
import router from './router.routes'
import * as cors from "cors"
import uploadFile from "express-fileupload"
export class Server {
    private appServer = express()
    constructor(PORT: number) {
        this.createServer(PORT)
        this.configDB()
        this.configApplications(PORT)
        this.routerHandelling()
        this.errorHandelling()
    }
    uploadFiles() {
        this.appServer.use(uploadFile({ abortOnLimit: true, limits: { fileSize: 150000 } }))
    }
    configApplications(PORT: number): void {
        this.appServer.use(morgan("dev"));
        this.appServer.use(express.urlencoded({ extended: true, limit: '50mb' }));
        this.appServer.use(express.json({ limit: '50mb' }));
        this.appServer.use(express.static(path.join(__dirname, "..", "public")));
        this.appServer.use(
            "/api-doc",
            swaggerUi.serve,
            swaggerUi.setup(
                swaggerDocJs({
                    swaggerDefinition: {
                        openapi: "3.0.0",
                        info: {
                            title: "سایت آموزشی حرفه ایی",
                            version: "1.0.0",
                            description: "سایت آموزشی زیست دانشگاهی",
                        },
                        servers: [
                            {
                                url: `https://teachingbiology.liara.run/`,

                            },
                        ],
                        components: {
                            securitySchemes: {
                                BearerAuth: {
                                    type: "http",
                                    scheme: "bearer",
                                    bearerFormat: "JWT",
                                },
                            },
                        },
                        security: [{ BearerAuth: [] }],
                    },
                    apis: ["./src/**/**/*.ts"],
                }),
                { explorer: true }
            )
        );
    }
    private createServer(PORT: number): void {
        this.appServer.listen(PORT, () => console.log(`server is running on port ${PORT}`))
        const allowedOrigins = ['http://localhost:5173', "https://teachingbiology.liara.run", "https://wincells.com", "https://wincell.liara.run"]
        this.appServer.use(
            cors({
                origin: function (origin, callback) {
                    if (!origin || allowedOrigins.includes(origin)) {
                        callback(null, true);
                    } else {
                        callback(new Error('Not allowed by CORS'));
                    }
                },
                credentials: true,
                methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                allowedHeaders: 'X-Requested-With,content-type,Authorization'
            })
        );

    }
    private async configDB(): Promise<any> {
        mongoose.connect(process.env.DATABASE_URL)
            .then(() => console.log("connected to db"))
            .catch((e) => console.log(e))
        process.on("SIGBREAK", async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }
    private errorHandelling(): void {
        this.appServer.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next(NotFound("صفحه ی مورد نظر پدا نشد"));
        });
        this.appServer.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
            const serverError = InternalServerError();
            const statusCodes = error?.status || error?.code || serverError.status;
            const message = error?.message || serverError.message;
            return res.status(statusCodes).json({
                statusCodes,
                message,
            });
        });
    }
    private routerHandelling() {
        this.appServer.use(router())
    }
}
// ----------------------

// import * as express from 'express';
// import mongoose from 'mongoose';
// import * as morgan from 'morgan'
// import * as createError from 'http-errors'
// import * as swaggerUi from 'swagger-ui-express'
// import * as swaggerDocJs from 'swagger-jsdoc'
// import * as path from 'path';
// import router from './router.routes'

// export class Server {
//     private appServer = express()
//     constructor(PORT: number, BASE_URL: string) {
//         this.createServer(PORT)
//         this.configDB(BASE_URL)
//         this.configApplications(PORT)
//         this.routerHandelling()
//         this.errorHandelling()
//     }
//     configApplications(PORT: number): void {
//         this.appServer.use(morgan("dev"));
//         this.appServer.use(express.urlencoded({ extended: true, limit: '50mb' }));
//         this.appServer.use(express.json({ limit: '50mb' }));
//         this.appServer.use(express.static(path.join(__dirname, "..", "public")));
//         this.appServer.use(
//             "/api-doc",
//             swaggerUi.serve,
//             swaggerUi.setup(
//                 swaggerDocJs({
//                     swaggerDefinition: {
//                         openapi: "3.0.0",
//                         info: {
//                             title: "سایت آموزشی حرفه ایی",
//                             version: "1.0.0",
//                             description: "سایت آموزشی زیست دانشگاهی",
//                         },
//                         servers: [
//                             {
//                                 url: `http://localhost:3000/`,
//                             },
//                         ],
//                         components: {
//                             securitySchemes: {
//                                 BearerAuth: {
//                                     type: "http",
//                                     scheme: "bearer",
//                                     bearerFormat: "JWT",
//                                 },
//                             },
//                         },
//                         security: [{ BearerAuth: [] }],
//                     },
//                     apis: ["./src/**/**/*.ts"],
//                 }),
//                 { explorer: true }
//             )
//         );
//     }
//     private createServer(PORT: number): void {
//         this.appServer.listen(PORT, () => console.log(`server is running on port ${PORT}`))
//     }
//     private async configDB(BASE_URL: string): Promise<any> {
//         mongoose.connect(BASE_URL)
//             .then(() => console.log("connected to db"))
//             .catch((e) => console.log(e))
//         process.on("SIGBREAK", async () => {
//             await mongoose.connection.close();
//             process.exit(0);
//         });
//     }
//     private errorHandelling(): void {
//         this.appServer.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//             next(createError.NotFound("صفحه ی مورد نظر پدا نشد"));
//         });
//         this.appServer.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
//             const serverError = createError.InternalServerError();
//             const statusCode = error?.status || error?.code || serverError.status;
//             const message = error?.message || serverError.message;
//             return res.status(statusCode).json({
//                 data: {
//                     statusCode,
//                     message,
//                 },
//             });
//         });
//     }
//     private routerHandelling() {
//         this.appServer.use(router())
//     }
// }
