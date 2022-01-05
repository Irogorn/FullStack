import S from "fluent-json-schema";

export const updateProduct = S.object()
    .additionalProperties(false)
    .description("Correspond with an updated product fron this API")
    .title("UpdatedProduct")
    .prop("nom", S.string())
    .prop("prix", S.number())
    .prop("description", S.string())
    .prop("photo", S.string())
    .prop("categorie", S.string())
    .prop("quantity", S.string().default("1"));

export const newProduct = S.object()
    .additionalProperties(false)
    .description("Correspond with a new product fron this API")
    .title("NewProduct")
    .prop("nom", S.string().required())
    .prop("prix", S.number().required())
    .prop("description", S.string().required())
    .prop("photo", S.string().required())
    .prop("categorie", S.string().required())
    .prop("quantity", S.number().default(1).required());

export const productSchema = newProduct
    .title("Product")
    .description("a product from API")
    .prop("_id", S.string().required());

export const productCollectionSchema = S.array()
    .title("CollectionProducts")
    .items(productSchema);

export const searchProduitCriteriaSchema = S.object()
    .additionalProperties(false)
    .title("search criteria")
    .prop("orderBy", S.enum(["prix"]))
    .prop("direction", S.enum(["ASC", "DESC"]))
    .prop("nom", S.string())
    .prop("minPrice", S.number())
    .prop("maxPrice", S.number())
    .prop("categorie", S.string());
