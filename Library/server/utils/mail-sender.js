import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import config from '../config/config.js';


const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false,
    auth: {
        user: config.emailUser,
        pass: config.emailPassword,
    },
});


export const sendMail = async (to, subject, template, data) => {
    try {
        const templatePath = path.join(
            process.cwd(),
            'views',
            `${template}.ejs`
        );

        const html = await ejs.renderFile(templatePath, data);

        await transporter.sendMail({
            from: config.emailUser,
            to,
            subject,
            html,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email error:', error.message);
    }
};