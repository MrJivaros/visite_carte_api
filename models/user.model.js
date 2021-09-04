const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true,
            trim: true,
            max: 1024,
            minlength: 6
        },
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            validate: [isEmail],
            required: true,
            unique: true,
            trim: true
        },
        telephone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        cart: {
            type: [String]
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};
const userModel = mongoose.model('users', userSchema)

module.exports = userModel