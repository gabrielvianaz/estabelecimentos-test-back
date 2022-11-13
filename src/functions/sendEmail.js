import nodemailer from 'nodemailer';
import generateToken from './generateToken.js';
import * as dotenv from 'dotenv';

dotenv.config();

export default async function sendEmail({ id, nome, email }) {
  const token = generateToken(id);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: 'Ativação de Conta - Sistema Estabelecimentos',
    text: `Olá, ${nome}! Para ativar sua conta, acesse o link: http://localhost:3000/ativar/${token}`,
    html: `<b>Olá, ${nome}! Para ativar sua conta, <a href="http://localhost:3000/ativar/${token}">clique aqui</a></b>`,
  });
}
