import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    slug: String,
});

const modelName = 'Category';

export default mongoose.connection && mongoose.connection.models[modelName] ? mongoose.connection.models[modelName] : mongoose.model(modelName, modelSchema);
