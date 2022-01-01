import pkg from 'mongoose';

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
        }
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

const User = model('user', userSchema);
export default User;