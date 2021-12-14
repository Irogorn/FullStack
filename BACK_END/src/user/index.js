import userRoutes from "./routes.js";
import UserModel from "./model.js";

export default async function user(app) {
    app.decorate("users", new UserModel(app.db, "users"));
    app.register(userRoutes);
}
