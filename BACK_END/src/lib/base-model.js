import mongo from "mongodb";

export default class BaseModel {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    async create(document) {
        const result = await this.db
            .collection(this.collection)
            .insertOne(document);

        return this.db
            .collection(this.collection)
            .findOne({ _id: result.insertedId });
    }

    async getAll() {
        return await this.db.collection(this.collection).find().toArray();
    }

    async get(id) {
        return await this.db.collection(this.collection).findOne({
            _id: mongo.ObjectId(id),
        });
    }

    async delete(id) {
        const objectId = mongo.ObjectId(id);

        const document = await this.db.collection(this.collection).findOne({
            _id: objectId,
        });

        if (!document) {
            throw new Error(
                `Unable to find the document in the collection ${this.collection} with id ${id}`
            );
        }

        await this.db.collection(this.collection).deleteOne({
            _id: objectId,
        });

        return document;
    }

    async update(id, updateDocument) {
        const objectId = mongo.ObjectId(id);

        const document = await this.db.collection(this.collection).findOne({
            _id: objectId,
        });

        if (!document) {
            throw new Error(
                `Unable to find the document in the collection ${this.collection} with id ${id}`
            );
        }

        await this.db
            .collection(this.collection)
            .updateOne(
                { _id: objectId },
                { $set: { ...document, ...updateDocument } }
            );

        return this.db.collection(this.collection).findOne({
            _id: objectId,
        });
    }
}
