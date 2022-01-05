import BaseModel from "../lib/base-model.js";

export default class ProductModel extends BaseModel {
    async search(criteria) {
        let filters = {};
        const orderBy = criteria.orderBy || "prix";
        const direction = criteria.direction || "DESC";

        if (criteria.nom) {
            filters = { ...filters, nom: { $regex: criteria.nom } };
        }

        if (criteria.minPrice) {
            filters = { ...filters, prix: { $gte: criteria.minPrice } };
        }

        if (criteria.maxPrice) {
            if (criteria.minPrice) {
                filters = {
                    ...filters,
                    prix: {
                        $gte: criteria.minPrice,
                        $lte: criteria.maxPrice,
                    },
                };
            } else {
                filters = {
                    ...filters,
                    prix: { $lte: criteria.maxPrice },
                };
            }
        }

        if (criteria.categorie) {
            filters = {
                ...filters,
                categorie: { $regex: criteria.categorie },
            };
        }

        return this.db
            .collection(this.collection)
            .find(filters)
            .sort({ [orderBy]: "ASC" === direction ? 1 : -1 })
            .toArray();
    }
}
