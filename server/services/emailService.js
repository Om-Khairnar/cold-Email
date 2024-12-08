import nodemailer from 'nodemailer';
import { agenda } from '../index.js';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Define email sending job
agenda.define('send email', async (job) => {
  const { to, subject, body } = job.attrs.data;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: body,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
});

export const scheduleEmail = async (to, subject, body, delay) => {
  try {
    await agenda.schedule(delay, 'send email', { to, subject, body });
    console.log(`Email scheduled for ${to} with delay ${delay}`);
  } catch (error) {
    console.error('Error scheduling email:', error);
    throw error;
  }
};