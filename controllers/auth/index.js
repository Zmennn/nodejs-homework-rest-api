import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth';


const authService = new AuthService();

const registration = async (req, res, next) => {
    const contacts = await repositoryContacts.listContacts();
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: contacts });
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
