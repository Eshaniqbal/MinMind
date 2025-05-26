import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { APP_NAME } from '@/lib/constants';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// HTML template for applicant confirmation email
const getApplicantEmailTemplate = (name: string, position: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0055FF 0%, #5500FF 100%);
      color: white;
      text-align: center;
      padding: 40px 20px;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      color: #666;
      font-size: 14px;
    }
    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .subtitle {
      margin-top: 10px;
      opacity: 0.9;
    }
    .highlight {
      color: #0055FF;
      font-weight: 600;
    }
    .next-steps {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .next-steps h3 {
      margin-top: 0;
      color: #0055FF;
    }
    .next-steps ul {
      margin: 0;
      padding-left: 20px;
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      color: #0055FF;
      text-decoration: none;
      margin: 0 10px;
    }
    .social-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Received!</h1>
      <div class="subtitle">Thank you for your interest in joining our team</div>
    </div>
    <div class="content">
      <p>Dear <span class="highlight">${name}</span>,</p>
      
      <p>Thank you for applying for the <span class="highlight">${position}</span> position at ${APP_NAME}. We're excited to review your application!</p>
      
      <div class="next-steps">
        <h3>What's Next?</h3>
        <ul>
          <li>Our hiring team will review your application within 2-3 business days</li>
          <li>If your qualifications match our requirements, we'll contact you to schedule an interview</li>
          <li>You may be asked to complete a technical assessment depending on the role</li>
        </ul>
      </div>
      
      <p>In the meantime, feel free to:</p>
      <ul>
        <li>Learn more about our company and culture on our website</li>
        <li>Follow us on social media for the latest updates</li>
        <li>Prepare for potential technical discussions</li>
      </ul>
      
      <p>If you have any questions, don't hesitate to reach out to our HR team.</p>
      
      <div class="social-links">
      
        Follow us:
        
        <a href="https://linkedin.com/company/minmind" target="_blank">LinkedIn</a> |
        <a href="https://twitter.com/minmind" target="_blank">Twitter</a> |
        <a href="https://github.com/minmind" target="_blank">GitHub</a>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

// HTML template for admin notification email
const getAdminEmailTemplate = (applicant: {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0055FF 0%, #5500FF 100%);
      color: white;
      text-align: center;
      padding: 20px;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .applicant-info {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .info-row {
      display: flex;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .info-label {
      font-weight: 600;
      width: 150px;
      color: #0055FF;
    }
    .info-value {
      flex: 1;
    }
    .message-section {
      margin-top: 20px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Job Application Received</h2>
    </div>
    <div class="content">
      <div class="applicant-info">
        <div class="info-row">
          <div class="info-label">Name:</div>
          <div class="info-value">${applicant.fullName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Position:</div>
          <div class="info-value">${applicant.position}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value">${applicant.email}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Phone:</div>
          <div class="info-value">${applicant.phone || 'Not provided'}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Experience:</div>
          <div class="info-value">${applicant.experience || 'Not specified'}</div>
        </div>
      </div>

      <div class="message-section">
        <h3>Cover Letter / Additional Information:</h3>
        <p>${applicant.message || 'No additional information provided.'}</p>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${APP_NAME}</p>
    </div>
  </div>
</body>
</html>
`;

// Validation helper
const validateFields = (formData: FormData) => {
  const requiredFields = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    position: formData.get('position') as string,
    resume: formData.get('resume') as File,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Validate required fields
    const validation = validateFields(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          message: 'Missing required fields', 
          fields: validation.missingFields,
          details: `Please fill in the following required fields: ${validation.missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string;
    const resume = formData.get('resume') as File;

    // Additional email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          message: 'Invalid email format',
          details: 'Please enter a valid email address'
        },
        { status: 400 }
      );
    }

    // Validate resume file type
    const allowedFileTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = resume.name.toLowerCase().substring(resume.name.lastIndexOf('.'));
    if (!allowedFileTypes.includes(fileExtension)) {
      return NextResponse.json(
        {
          message: 'Invalid file type',
          details: 'Please upload a PDF or Word document (.pdf, .doc, .docx)'
        },
        { status: 400 }
      );
    }

    // Convert resume to buffer for email attachment
    const resumeArrayBuffer = await resume.arrayBuffer();
    const resumeBuffer = Buffer.from(resumeArrayBuffer);

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Job Application: ${position} - ${fullName}`,
      html: getAdminEmailTemplate({
        fullName,
        email,
        phone,
        position,
        experience,
        message
      }),
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    };

    // Send confirmation email to applicant
    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received - ${APP_NAME}`,
      html: getApplicantEmailTemplate(fullName, position),
    };

    try {
      // Send both emails
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(applicantMailOptions),
      ]);
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      return NextResponse.json(
        { 
          message: 'Failed to send confirmation emails',
          details: 'Your application was received but there was an error sending confirmation emails. Please contact support if you do not receive a confirmation email.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { 
        message: 'Failed to submit application',
        details: 'There was an error processing your application. Please try again later.'
      },
      { status: 500 }
    );
  }
} 