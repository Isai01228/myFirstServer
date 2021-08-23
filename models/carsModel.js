const { Schema, model, SchemaType } = require(`mongoose`)

const carsModel = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        trim: true,
        default: `BLUE`
    },
    year: {
        type: Number,
        default: 2003,
        require: false
    },
    active: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = model(`Car`, carsModel)