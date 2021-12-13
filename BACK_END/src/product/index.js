import productRoutes from "./routes.js";
import ProductModel from "./model.js";

export default async function product(app) {
    app.decorate("products", new ProductModel(app.db, "products"));
    app.register(productRoutes);
}
