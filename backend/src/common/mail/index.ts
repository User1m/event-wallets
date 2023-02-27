import { emailTemplate, TemplateEmail } from './template';
import * as nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendMail = async (payload: TemplateEmail) => {
  const {
    subject,
    to: { email },
    message: text,
  } = payload;
  // https://nodemailer.com/about/
  await transporter.sendMail({
    from: `Do Not Reply 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: Array.isArray(email) ? email.map(x => x).join(', ') : email ,
    subject,
    text,
    html: emailTemplate(payload)
  }).catch(error => { throw error; });
}
