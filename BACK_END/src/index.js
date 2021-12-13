import Fastify from "fastify";
import mongodb from "./lib/mongodb.js";
import { config } from "dotenv";
import fp from "fastify-plugin";
import product from "./product/index.js";
import cors from "./lib/cors.js";
import swagger from "./lib/swagger.js";

async function main() {
    config();

    const app = Fastify({
        /*Permet le debugage*/
        logger: process.env.NODE_ENV !== "production",
    });

    app.register(fp(mongodb));
    app.register(fp(swagger));
    app.register(fp(cors));

    app.register(fp(product));

    app.listen(process.env.PORT, process.env.HOST, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(
            ` The server is available at address: ${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}`
        );
    });
}

main();
