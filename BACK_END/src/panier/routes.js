export default async function panierRoutes(app) {
    app.post(
        "/panier",
        {
            schema: {
                tags: ["Panier"],
            },
        },
        async (request, reply) => {
            const userInfo = await request.jwtVerify();

            const user = await app.users.get(userInfo._id);

            const { id } = request.body;

            user.panier.push(id);

            await app.users.update(user._id, user);

            reply.code(201);
            return { message: "ajout panier" };
        }
    );

    app.get("/panier", async (request, reply) => {
        const userInfo = await request.jwtVerify();

        const user = await app.users.get(userInfo._id);

        return user.panier;
    });

    app.delete("/panier/:id", async (request, reply) => {
        const userInfo = await request.jwtVerify();
        const annonceId = request.params.id;

        console.log("jwt: " + userInfo._id);

        console.log("request: " + annonceId);

        const user = await app.users.get(userInfo._id);

        console.log("User: " + user._id);

        user.panier = user.panier.filter((id) => id != request.params.id);

        console.log("au :" + user._id);
        app.users.update(user._id, user);

        return { message: "supp" };
    });
}
