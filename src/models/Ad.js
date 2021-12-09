import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String,
});

const modelName = 'Ad';

export default mongoose.connection && mongoose.connection.models[modelName] ? mongoose.connection.models[modelName] : mongoose.model(modelName, modelSchema);
