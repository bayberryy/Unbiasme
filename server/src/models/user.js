const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (! validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        validate(password) {
            if (! /[A-Z]/.test(password)) {
                throw new Error('Password need at least one uppercase letter')
            } else if (! /[a-z]/.test(password)) {
                throw new Error('Password need at least one lowercase letter')
            } else if (! /\d/.test(password)) {
                throw new Error('Password need at least one digit')
            } else if (! /[!@#$%^&*]/.test(password)) {
                throw new Error('Password need at least one special character: [!@#$%^&*]')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// generate authentication tokens 
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_ENV)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token 
}

// Remove sensitive data and avatar
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject() 
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Login
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    
    if ( ! user ) {
        throw new Error('Invalid username')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if ( ! isMatch ) {
        throw new Error('Wrong Password')
    }

    return user
}

// MIDDLEWARE
// Hash plain text password before saving
userSchema.pre('save', async function (next) {  // use standard function, not arrow function as it doesn't have binding(this)
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() 
} ) 

const User = mongoose.model('User', userSchema)
module.exports = User