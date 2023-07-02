const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Pseudo nécessaire"]
        },
        password: {
            type: String,
            required: [true, "Mot de passe nécessaire"]
        },
        admin: {
            type: Boolean,
            default: false
        },
        imgUploaded: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref:'UserSchema'}]
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;