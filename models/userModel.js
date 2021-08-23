const { Schema, model } = require("mongoose")
const PLM = require(`passport-local-mongoose`)

const UserModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: false,
        default: 18,
        enum: [18, 19, 20, 21, 22, 23]
    }
})

UserModel.plugin(PLM, { usernameField: `email` })

module.exports = model(`User`, UserModel)