import mongoose from "mongoose";
const Schema = mongoose.Schema;

const News = new Schema({
    title: {type: String, required: true},
    countLike: {type: Number},
    authorName: {type: String},
    countComment: {type: Number},
    linkTitle: {type: String}
})

export default mongoose.model('News', News)