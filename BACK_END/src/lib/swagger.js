import swagg from "fastify-swagger";

export default async function swagger(app) {
    app.register(swagg, {
        routePrefix: process.env.API_DOC_URL,
        exposeRoute: process.env.API_DOC === "true",
        swagger: {
            info: {
                title: "eCommerce",
                description: "Api pour l'application",
                version: "0",
            },
            tags: [
                {
                    name: "Product",
                    description:
                        "Section that relates to all actions on the product.",
                },
            ],
            host: `${process.env.HOST}:${process.env.PORT}`,
            schemes: ["http"],
            produces: ["application/json"],
            consumes: ["application/json"],
        },
    });
}
