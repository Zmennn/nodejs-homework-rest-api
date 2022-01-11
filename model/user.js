import pkg from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = pkg;

const userSchema = new Schema(
    {
        name: {
            type: String,
            default: 'John Doe',
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Such user already exists']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        token: {
            type: String,
            default: null,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },

    },
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            },
        },
    },
);


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(8)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema);
export default User;