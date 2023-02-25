import express, { Express } from "express";
import { load } from "./loader";

/** start the port connection - entry point for express */
async function startServer(params?: any): Promise<any> {
    const app: Express = express();
    const port: string = process.env.PORT || "3000";
    await load({ expressApp: app });
    return app.listen(port, (): void => {
        console.log("port listening ::", port);
    });
}

startServer().then((): void => {
    console.log("port successfully connected!!!");
}).catch((err): void => {
    console.log("port connection error ", err);
})