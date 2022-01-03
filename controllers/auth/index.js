import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth';


const authService = new AuthService();

const registration = async (req, res, next) => {

    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);

    if (isUserExist) {
        return res
            .status(HttpCode.CONFLICT)
            .json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' });
    };

    const data = await authService.create(req.body)
    res
        .status(HttpCode.CREATED)
        .json({ status: 'success', code: HttpCode.CREATED, data });
};


const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password);

    if (!user) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid login or password' });
    };

    const token = await authService.getToken(user);
    res
        .status(HttpCode.OK)
        .json({ token });
};

const logout = async (req, res, next) => {

    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: contacts });
};
export { registration, login, logout }
