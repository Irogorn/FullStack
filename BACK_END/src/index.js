import Fastify from "fastify";
import mongodb from "./lib/mongodb.js";
import { config } from "dotenv";
import fp from "fastify-plugin";
import product from "./product/index.js";
import user from "./user/index.js";
import panier from "./panier/index.js";
import cors from "./lib/cors.js";
import swagger from "./lib/swagger.js";
import bcrypt from "./lib/bcrypt.js";
import jwt from "./lib/jwt.js";

async function main() {
    config();

    const app = Fastify({
        /*Permet le debugage*/
        logger: process.env.NODE_ENV !== "production",
    });

    app.register(fp(mongodb));
    app.register(fp(swagger));
    app.register(fp(cors));
    app.register(fp(bcrypt));
    app.register(fp(jwt));

    app.register(fp(product));
    app.register(fp(user));
    app.register(fp(panier));

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
