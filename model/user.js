import pkg from 'mongoose';
import bcrypt from 'bcryptjs/dist/bcrypt';

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
        const salt = bcrypt.genSalt(11);
        this.password = bcrypt.hash(this.password, salt);
    }
    next()
})

const User = model('user', userSchema);
export default User;