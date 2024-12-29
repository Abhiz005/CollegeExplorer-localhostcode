import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "neon37012@gmail.com",
    pass: "nrzr iviy hjzt jnpl",
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: `"College Explorer" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: "Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `"College Explorer" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: "Welcome to College Explorer",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name)
      .replace("{dashboardURL}", "https://yourwebsite.com/dashboard"),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Could not send welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: `"College Explorer" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Could not send password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: `"College Explorer" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent:", info.response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Could not send password reset success email");
  }
};
