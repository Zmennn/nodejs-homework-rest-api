import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth';


const authService = new AuthService();

const registration = async (req, res, next) => {

    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);

    if (isUserExist) {
        return res
            .status(HttpCode.CONFLICT)
            .json({ message: 'Email in use' });
    };

    const data = await authService.create(req.body)
    res
        .status(HttpCode.CREATED)
        .json({ data });
};


const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password);

    if (!user) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ message: 'Email or password is wrong' });
    };


    const token = await authService.getToken(user);
    await authService.setToken(user.id, token);

    const response = {
        "token": token,
        "user": {
            "email": user.email,
            "subscription": user.subscription
        }
    }
    res
        .status(HttpCode.OK)
        .json(response);
};


const logout = async (req, res, next) => {
    await authService.setToken(req.user.id, null);
    res
        .status(HttpCode.NO_CONTENT)
        .json();
};

const current = async (req, res, next) => {
    const response = await {

        "email": req.user.email,
        "subscription": req.user.subscription
    }
    res
        .status(HttpCode.OK)
        .json(response)
};

const uploadAvatar = async (req, res, next) => {
    const response = await


        { "avatarURL": req.user.subscription }

    res
        .status(HttpCode.OK)
        .json(response)
};

export { registration, login, logout, current, uploadAvatar }
