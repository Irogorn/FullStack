import S from "fluent-json-schema";

export const updateUser = S.object()
    .additionalProperties(false)
    .description("Correspond with an updated user fron this API")
    .title("UpdatedUser")
    .prop("nom", S.string())
    .prop("prenom", S.string())
    .prop("age", S.number())
    .prop("email", S.string())
    .prop("password", S.string())
    .prop("photoProfile", S.string())
    .prop("annonces", S.array().default([]))
    .prop("panier", S.array().default([]));

export const newUser = S.object()
    .additionalProperties(false)
    .description("Correspond with a new user fron this API")
    .title("NewUser")
    .prop("nom", S.string().required())
    .prop("prenom", S.string().required())
    .prop("age", S.number().required())
    .prop("email", S.string().required())
    .prop("password", S.string().required())
    .prop("photoProfile", S.string().required())
    .prop("annonces", S.array().default([]).required())
    .prop("panier", S.array().default([]).required());

export const userSchema = newUser
    .title("User")
    .description("a user from API")
    .prop("_id", S.string().required());

export const userCollectionSchema = S.array()
    .title("CollectionUsers")
    .items(userSchema);

export const Credential = S.object()
    .title("Credential")
    .description("Contient les informations nescessaire pour se connecter")
    .prop("email", S.string().required())
    .prop("password", S.string().required());

export const tok = S.object().prop("user", newUser).prop("token", S.string());
