import BaseModel from "../lib/base-model.js";

export default class UserModel extends BaseModel {
    async getEmail(email) {
        return await this.db.collection(this.collection).findOne({
            email: email,
        });
    }
}
