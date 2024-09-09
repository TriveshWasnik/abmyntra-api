import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "triveshwasnik88@gmail.com",
    pass: "tri123@KM",
  },
});

export async function sendMail(to, subject, text, html) {
  try {
    const mailOptions = {
      from: "triveshwasnik88@gmail.com",
      to: to,
      subject: subject,
      text: text,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error: error.message };
  }
}
