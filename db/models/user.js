
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if (value.length < 8 || value.length > 16)
            throw new Error('Login should have 8 to 16 character lenght.')
        }
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User