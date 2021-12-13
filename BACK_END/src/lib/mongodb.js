import mongo from "mongodb";

export default async function mongodb(app) {
    const client = await mongo.MongoClient.connect(process.env.MONGO_URL);
    console.log(client);
    const db = client.db(process.env.MONGO_DATABASE);

    app.decorate("db", db);
}
