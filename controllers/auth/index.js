import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth';


const authService = new AuthService();

const registration = async (req, res, next) => {

    const { email } = req.body;
    const isUserExist = AuthService.isUserExist(email);

    if (isUserExist) {
        return res
            .status(HttpCode.OK)
            .json({ status: 'error', code: HttpCode.CONFLICT, message: 'Such user already exists' });
    };

    const data = await AuthService.create(req.body)
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data });
};

const login = async (req, res, next) => {
    const contacts = await repositoryContacts.listContacts();
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: contacts });
};

const logout = async (req, res, next) => {
    const contacts = await repositoryContacts.listContacts();
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: contacts });
};
export { registration, login, logout }
