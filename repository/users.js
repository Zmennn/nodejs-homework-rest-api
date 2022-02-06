import User from '../model/user';


const findById = async (id) => {
    return await User.findById(id)
};

const findByEmail = async (email) => {
    return await User.findOne({ email })
};

const create = async (body) => {
    const user = new User(body);
    return await user.save()
};

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token })
};

const updateAvatar = async (id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar })
};

const verify = async userId => {
    return await User.updateOne(
        { _id: userId },
        { verificationToken: null, verify: true },
    );
};

const findByToken = async verificationToken => {
    return await User.findOne({ verificationToken });
};

export default { findById, findByEmail, create, updateToken, updateAvatar, verify, findByToken }