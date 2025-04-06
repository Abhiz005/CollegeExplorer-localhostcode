export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0052D4, #4364F7, #6FB1FC); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0052D4, #4364F7, #6FB1FC); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0052D4, #4364F7, #6FB1FC); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to College Explorer</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <div style="background: background: linear-gradient(to right, #0052D4, #4364F7, #6FB1FC); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Welcome to College Explorer</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{userName}</strong>,</p>
    <p>We're excited to have you join the College Explorer community! Here, you’ll find the tools and resources you need to explore colleges, make informed decisions, and achieve your academic goals.</p>
    <div style="text-align: center; margin: 30px 0;">
      <img src="https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg" alt="Welcome Image" style="border-radius: 10px; max-width: 100%; height: auto;">
    </div>
    <p>Here are a few things you can do next:</p>
    <ul style="margin: 15px 0; padding-left: 20px;">
      <li>Complete your profile to get personalized recommendations.</li>
      <li>Start exploring colleges based on your preferences.</li>
      <li>Join our community forums to connect with like-minded students.</li>
    </ul>
    <p>To get started, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="http://localhost:5173/dashboardPage" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
    </div>
    <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
    <p>Best regards,<br>The College Explorer Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; 2024 College Explorer. All rights reserved.</p>
  </div>
</body>
</html>
`;

export const FEEDBACK_EMAIL_TEMPLATE = ({ name, collegeName, note, email }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Feedback Received</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto;">
    <tr>
      <td style="padding: 30px 0; background: linear-gradient(to right, #0052D4, #4364F7, #6FB1FC); text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; font-size: 26px; margin: 0;">📩 New Feedback Received</h1>
      </td>
    </tr>
    <tr>
      <td style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <p style="font-size: 16px; margin-bottom: 20px;">You have received a new feedback. Details are as follows:</p>

        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0;"><strong>Name:</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>College:</strong></td>
            <td>${collegeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Email:</strong></td>
            <td>${email}</td>
          </tr>
        </table>

        <p style="margin: 0 0 10px;"><strong>Message:</strong></p>
        <div style="padding: 15px; background-color: #f1f1f1; border-left: 4px solid #0052D4; border-radius: 4px; font-style: italic; color: #333;">
          ${note}
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #888;">This feedback was submitted via the College Explorer feedback form.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 20px; font-size: 12px; color: #aaa;">
        &copy; ${new Date().getFullYear()} College Explorer. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;
