import nodemailer from "nodemailer";
import { EmailTemplate } from "./email";

export const sendEmail = async (email_data) => {
  const {
    SMTP_SERVICE,
    SMTP_HOST,
    SMTP_SECURE,
    SMTP_PORT,
    SMTP_TLS,
    SMTP_EMAIL,
    SMTP_PASS,
  } = process.env;
  let transport = nodemailer.createTransport({
    name: SMTP_HOST,
    service: SMTP_SERVICE,
    host: SMTP_HOST,
    secure: SMTP_SECURE,
    port: SMTP_PORT,
    tls: {
      serverName: SMTP_HOST,
      rejectUnauthorized: SMTP_TLS,
    },

    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });

  return transport.sendMail(
    {
      from: email_data.from,
      to: email_data.to,
      subject: email_data.subject,
      html: EmailTemplate(email_data.mailheader, email_data.mailbody),
    },
    function (error) {
      if (error) {
        return error;
      }
    }
  );
};
