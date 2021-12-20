import panierRoutes from "./routes.js";
import PanierModel from "./model.js";

export default async function panier(app) {
    app.decorate("panier", new PanierModel(app.db, "users"));
    app.register(panierRoutes);
}
