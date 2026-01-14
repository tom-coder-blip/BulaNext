import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true = use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to, name) => {
  try {
    const mailOptions = {
      from: `"BulaNext" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 Welcome to BulaNext!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Welcome to <strong>BulaNext</strong>! We're excited to have you on board 🚀</p>
        <p>Start exploring today!</p>
        <p>- The BulaNext Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};