"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const template_1 = require("./template");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const sendMail = async (payload) => {
    const { subject, to: { email }, message: text, } = payload;
    await transporter.sendMail({
        from: `Do Not Reply 👻 <${process.env.EMAIL_USER}>`,
        to: Array.isArray(email) ? email.map(x => x).join(', ') : email,
        subject,
        text,
        html: template_1.emailTemplate(payload)
    }).catch(error => { throw error; });
};
exports.sendMail = sendMail;
//# sourceMappingURL=index.js.map