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
            reply.code(201);
            return app.products.create(request.body);
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
            return app.products.delete(request.params.id);
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
            return app.products.update(request.params.id, request.body);
        }
    );
}
