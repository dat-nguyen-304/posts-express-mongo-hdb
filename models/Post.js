import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('post', postSchema);