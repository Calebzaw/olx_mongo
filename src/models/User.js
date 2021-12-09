import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String,
});

const modelName = 'User';

export default mongoose.connection && mongoose.connection.models[modelName] ? mongoose.connection.models[modelName] : mongoose.model(modelName, modelSchema);
