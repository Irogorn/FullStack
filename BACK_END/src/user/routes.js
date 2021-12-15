import {
    newUser,
    updateUser,
    userSchema,
    userCollectionSchema,
    Credential,
    tok,
} from "./schema.js";

export default async function userRoutes(app) {
    app.post(
        "/signup",
        {
            schema: {
                tags: ["User"],
                body: newUser,
                response: {
                    201: tok,
                },
            },
        },
        async (request, reply) => {
            const exist = await app.users.getEmail(request.body.email);

            if (exist) {
                reply.code(409);
                return {
                    message: "This Email already exists in the database.",
                };
            }

            const pw = request.body.password;
            request.body.password = await app.bcrypt.hash(pw, 10);

            reply.code(201);

            const user = await app.users.create(request.body);
            const token = app.jwt.sign({ _id: user._id });

            return { user, token };
        }
    );

    app.post(
        "/login",
        {
            schema: {
                tags: ["User"],
                body: Credential,
            },
        },
        async (request, reply) => {
            const exist = await app.users.getEmail(request.body.email);

            if (!exist) {
                reply.code(401);
                return {
                    message: "Wrong Email",
                };
            }

            const granted = await app.bcrypt.compare(
                request.body.password,
                exist.password
            );

            if (!granted) {
                reply.code(401);
                return {
                    message: "Wrong Password",
                };
            }

            const token = app.jwt.sign({ _id: exist._id });

            return { message: "User connected", token };
        }
    );
}
