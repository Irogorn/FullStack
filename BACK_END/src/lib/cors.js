import cor from "fastify-cors";
export default async function cors(app) {
    app.register(cor, { origin: "http://localhost:3000" });
}
