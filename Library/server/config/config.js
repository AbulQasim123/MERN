import dotenv from 'dotenv';
dotenv.config();
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);

export default {
    emailUser,
    emailPassword,
    smtpHost,
    smtpPort
};