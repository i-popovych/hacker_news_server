import {model, Schema} from "mongoose"

const Person = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    savedNewsIds: [{type: String}]
})

export default model('Person', Person)