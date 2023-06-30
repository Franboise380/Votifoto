const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Nom d'image nécessaire"]
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;