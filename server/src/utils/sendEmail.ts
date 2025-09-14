import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Options {
  receiver_mail: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({ receiver_mail, subject, body }: Options) => {
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true,
  } as SMTPTransport.Options);

  const mail = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: receiver_mail,
    subject,
    html: body,
  };

  await transporter.sendMail(mail);
};
