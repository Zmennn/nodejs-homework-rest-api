import nodemailer from 'nodemailer';

class SenderNodemailer {
    async send(msg) {
        const config = {
            host: 'smtp.meta.ua',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_NODEMAILER,
                pass: process.env.PASS_NODEMAILER,
            },
        }
        const transporter = nodemailer.createTransport(config)
        return await transporter.sendMail({
            ...msg,
            from: process.env.EMAIL_NODEMAILER,
        })
    }
}


export default SenderNodemailer;