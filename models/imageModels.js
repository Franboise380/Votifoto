const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Nom d'image nécessaire"]
        },
        votes: {
            type: Number,
            require: true,
            default: 0
        },
        valeur: {
            type: Number,
            require: true,
            default: 0
        },
        path: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: false
        },
        keywords : {
            type: [String]
        },
    },
    {
        timestamps: true
    }
)

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;