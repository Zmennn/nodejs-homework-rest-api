import { HttpCode } from '../../lib/constants.js';
import { AuthService } from '../../service/auth';
import { SenderNodemailer, EmailService } from '../../service/email';


import {
    UploadFileService,
    LocalFileStorage
} from '../../service/files-load'

const authService = new AuthService();





const registration = async (req, res, next) => {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email in use',
        });
    }

    const data = await authService.create(req.body);
    const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderNodemailer(),
    );

    const isSend = await emailService.sendVerifyEmail(

        email,
        data.verificationToken,
    );
    delete data.verificationToken;
    res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        user: { ...data, isVerifyEmailSended: isSend },
    });
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
    const uploadService = new UploadFileService(
        LocalFileStorage,
        req.file,
        req.user
    );

    const avatarUrl = await uploadService.updateAvatar();

    res
        .status(HttpCode.OK)
        .json(avatarUrl)
};

const verification = async (req, res, next) => {
    const { verificationToken } = req.params;

    const user = await authService.isUserWithToken(verificationToken);

    if (user) {
        await authService.verify(user.id);
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            message: 'Verification successful',
        });
    }

    res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'User not found',
    });
};

const repeatVerificationEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await authService.findByEmail(email);
    if (user) {
        if (user.verify) {
            return res.status(HttpCode.BAD_REQUEST).json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                message: 'Verification has already been passed',
            });
        }

        const { email, verificationToken } = user;
        const emailService = new EmailService(
            process.env.NODE_ENV,
            new SenderNodemailer(),
        );

        const isSend = await emailService.sendVerifyEmail(
            email,
            email,
            verificationToken,
        );

        if (isSend) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                message: 'Success',
                isVerifyEmailSended: isSend,
            });
        }

        return res.status(HttpCode.UE).json({
            status: 'error',
            code: HttpCode.UE,
            message: 'Unprocessable Entity',
        });
    }

    return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'User with email not found',
    });
};

export {
    registration,
    login,
    logout,
    current,
    uploadAvatar,
    verification,
    repeatVerificationEmail
}
