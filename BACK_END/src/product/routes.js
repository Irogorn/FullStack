import {
    newProduct,
    updateProduct,
    productSchema,
    productCollectionSchema,
} from "./schema.js";

export default async function productRoutes(app) {
    app.post(
        "/annonce",
        {
            schema: {
                tags: ["Product"],
                body: newProduct,
                response: {
                    2001: newProduct,
                },
            },
        },
        async (request, reply) => {
            const userInfo = await request.jwtVerify();

            const user = await app.users.get(userInfo._id);

            const product = await app.products.create(request.body);

            if (user) {
                user.annonces.push(product._id);
                await app.users.update(user._id, user);
            }

            reply.code(201);
            return product;
        }
    );

    app.get(
        "/annonce",
        {
            schema: {
                tags: ["Product"],
                response: { 200: productCollectionSchema },
            },
        },
        async () => {
            return app.products.getAll();
        }
    );

    app.get(
        "/annonce/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "the product identifier, as id",
                        },
                    },
                    required: ["id"],
                },
                response: {
                    200: productSchema,
                },
            },
        },
        async (request, reply) => {
            const product = await app.products.get(request.params.id);

            if (!product) {
                reply.code(404);
                return { message: "Product not found" };
            }

            return product;
        }
    );

    app.get(
        "/user/annonces",
        {
            schema: {
                tags: ["Product"],
            },
        },
        async (request, reply) => {
            const userInfo = await request.jwtVerify();

            const user = await app.users.get(userInfo._id);

            /*return await Promise.all(
                user.annonces.map(async (id) => {
                    return await app.products.get(id);
                })
            );*/

            return user.annonces;
        }
    );

    app.delete(
        "/annonce/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "the product identifier, as id",
                        },
                    },
                    required: ["id"],
                },
                response: {
                    200: productSchema,
                },
            },
        },
        async (request, reply) => {
            const userInfo = await request.jwtVerify();

            const user = await app.users.get(userInfo._id);

            const product = await app.products.delete(request.params.id);

            if (user) {
                user.annonces = user.annonces.filter((id) => {
                    return id != request.params.id;
                });

                await app.users.update(user._id, user);
            }

            return product;
        }
    );

    app.put(
        "/annonce/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "the product identifier, as id",
                        },
                    },
                    required: ["id"],
                },
                body: newProduct,
            },
        },
        async (request) => {
            await request.jwtVerify();
            return app.products.update(request.params.id, request.body);
        }
    );

    app.patch(
        "/annonce/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "the product identifier, as id",
                        },
                    },
                    required: ["id"],
                },
                body: updateProduct,
            },
        },
        async (request) => {
            await request.jwtVerify();
            return app.products.update(request.params.id, request.body);
        }
    );
}
