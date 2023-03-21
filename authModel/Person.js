import {model, Schema} from "mongoose"

const Person = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    savedNews: [{type: Schema.Types.ObjectId, ref: 'News', unique: false}]
})

export default model('Person', Person)