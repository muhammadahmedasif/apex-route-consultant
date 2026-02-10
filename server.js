import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SMTP Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'muhammadahmedasif13@gmail.com',
    pass: 'blaw hayk cnkw eyie' // App Password
  }
});

// HTML Template Generators
const createOwnerTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #112240; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    .header { background-color: #0a192f; color: #ffffff; padding: 20px; text-align: center; }
    .content { padding: 30px; background-color: #ffffff; }
    .field { margin-bottom: 15px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px; }
    .label { font-weight: bold; color: #c5a059; text-transform: uppercase; font-size: 12px; }
    .value { font-size: 16px; margin-top: 5px; }
    .footer { background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Consultation Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Visa Category</div>
        <div class="value">${data.visaCategory}</div>
      </div>
      <div class="field">
        <div class="label">Country of Interest</div>
        <div class="value">${data.country}</div>
      </div>
      <div class="field">
        <div class="label">Case Details</div>
        <div class="value">${data.details || 'No additional details provided.'}</div>
      </div>
    </div>
    <div class="footer">
      Sent from Apex Route Consultants Website
    </div>
  </div>
</body>
</html>
`;

const createClientTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Georgia', serif; color: #333333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; }
    .header { background-color: #0a192f; padding: 40px 20px; text-align: center; }
    .logo-text { color: #ffffff; font-size: 24px; letter-spacing: 2px; }
    .sub-text { color: #c5a059; font-size: 10px; text-transform: uppercase; letter-spacing: 4px; margin-top: 5px; }
    .content { padding: 40px 30px; background-color: #ffffff; }
    .greeting { font-size: 20px; color: #0a192f; margin-bottom: 20px; }
    .message { margin-bottom: 25px; color: #555555; }
    .details-box { background-color: #f8f9fa; border-left: 4px solid #c5a059; padding: 15px; margin: 20px 0; }
    .cta-button { display: inline-block; background-color: #c5a059; color: #0a192f; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 20px; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #888888; font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">APEX ROUTE</div>
      <div class="sub-text">Consultants</div>
    </div>
    <div class="content">
      <div class="greeting">Dear ${data.firstName},</div>
      <p class="message">
        Thank you for choosing Apex Route Consultants. We have successfully received your consultation request regarding <strong>${data.visaCategory}</strong> for <strong>${data.country}</strong>.
      </p>
      <div class="details-box">
        <p style="margin:0"><strong>Reference ID:</strong> #${Math.floor(Math.random() * 100000)}</p>
        <p style="margin:5px 0 0 0"><strong>Status:</strong> Under Review</p>
      </div>
      <p class="message">
        Our senior immigration experts are currently reviewing your profile. You can expect a response from us within the next 24 business hours to schedule your detailed assessment.
      </p>
      <p class="message">
        If you have urgent queries, please feel free to reply to this email.
      </p>
      <center>
        <a href="https://apexrouteconsultants.com" class="cta-button">Visit Our Website</a>
      </center>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Apex Route Consultants.<br/>
      LG12A, Big City Plaza, Liberty Roundabout, Lahore.
    </div>
  </div>
</body>
</html>
`;

// API Endpoint
app.post('/api/send-email', async (req, res) => {
  const { firstName, lastName, email, visaCategory, country, details } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // 1. Send Email to Owner
    await transporter.sendMail({
      from: `"Apex Route Web System" <muhammadahmedasif13@gmail.com>`,
      to: 'muhammadahmedasif13@gmail.com',
      subject: `📢 New Lead: ${firstName} ${lastName} (${country})`,
      html: createOwnerTemplate(req.body)
    });

    // 2. Send Confirmation to Client
    await transporter.sendMail({
      from: `"Apex Route Consultants" <muhammadahmedasif13@gmail.com>`,
      to: email,
      subject: 'Consultation Request Received - Apex Route Consultants',
      html: createClientTemplate(req.body)
    });

    console.log(`Emails sent successfully for client: ${email}`);
    res.status(200).json({ success: true, message: 'Emails sent successfully' });

  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails', error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});