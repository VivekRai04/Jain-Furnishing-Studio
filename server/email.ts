interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private apiKey: string;
  private apiUrl = 'https://api.brevo.com/v3/smtp/email';

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('BREVO_API_KEY is required');
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const payload = {
        sender: {
          name: 'Jain Foam & Furnishing',
          email: 'jainfoamf@gmail.com' // Must be verified in Brevo
        },
        to: [{
          email: options.to,
          name: 'Recipient'
        }],
        subject: options.subject,
        htmlContent: options.html,
        textContent: options.text
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Brevo API error: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Error sending email via Brevo:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendContactInquiryEmail(inquiry: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }): Promise<void> {
    const subject = `New Contact Inquiry - ${inquiry.service}`;
    const html = `

<div style="background:#f2f4f7;padding:50px 0;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"
  style="max-width:640px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 10px 25px rgba(0,0,0,0.05);">

<!-- Header -->
<tr>
  <td style="padding:28px;text-align:center;background:#ffffff;border-bottom:1px solid #f0f0f0;">
    <img src="https://res.cloudinary.com/dw3rgs0ku/image/upload/logo_ws4lml.jpg"
    alt="Jain Foam & Furnishing"
    style="max-height:65px;">
  </td>
</tr>

<!-- Title Banner -->
<tr>
  <td style="background:linear-gradient(135deg,#0f4c81,#007bff);color:#ffffff;padding:28px 35px;">
    <h2 style="margin:0;font-size:24px;font-weight:600;">
      New Website Inquiry
    </h2>
    <p style="margin:6px 0 0 0;font-size:13px;opacity:0.85;">
      Submitted on ${new Date().toLocaleString()}
    </p>
  </td>
</tr>

<!-- Customer Info Card -->
<tr>
  <td style="padding:35px 35px 10px 35px;">
    <h3 style="margin:0 0 15px 0;color:#222;font-size:18px;">
      Customer Details
    </h3>

    <table width="100%" cellpadding="10" cellspacing="0"
    style="font-size:14px;color:#444;border-collapse:collapse;background:#fafafa;border:1px solid #eee;border-radius:6px;">
      
      <tr>
        <td style="font-weight:600;width:130px;color:#555;">Name</td>
        <td>${inquiry.name}</td>
      </tr>

      <tr>
        <td style="font-weight:600;color:#555;">Email</td>
        <td>
          <a href="mailto:${inquiry.email}" style="color:#0f4c81;text-decoration:none;font-weight:500;">
            ${inquiry.email}
          </a>
        </td>
      </tr>

      <tr>
        <td style="font-weight:600;color:#555;">Phone</td>
        <td>
          <a href="tel:${inquiry.phone}" style="color:#0f4c81;text-decoration:none;font-weight:500;">
            ${inquiry.phone}
          </a>
        </td>
      </tr>

      <tr>
        <td style="font-weight:600;color:#555;">Service</td>
        <td>${inquiry.service}</td>
      </tr>

    </table>
  </td>
</tr>

<!-- Message Card -->
<tr>
  <td style="padding:25px 35px 10px 35px;">
    <div style="background:#fbfbfc;border:1px solid #e6e8eb;border-radius:8px;padding:22px;">
      <h3 style="margin-top:0;color:#222;font-size:18px;">
        Customer Message
      </h3>
      <p style="margin:0;line-height:1.7;color:#555;font-size:14px;white-space:pre-wrap;">
        ${inquiry.message}
      </p>
    </div>
  </td>
</tr>

<!-- Action Buttons -->
<tr>
  <td style="padding:30px;text-align:center;">
    
    <a href="mailto:${inquiry.email}"
    style="display:inline-block;background:#0f4c81;color:#ffffff;
    padding:13px 26px;border-radius:6px;text-decoration:none;
    font-size:14px;font-weight:600;margin-right:10px;
    box-shadow:0 4px 10px rgba(0,0,0,0.08);">
      Reply via Email
    </a>

    <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g,'')}"
    style="display:inline-block;background:#25D366;color:#ffffff;
    padding:13px 26px;border-radius:6px;text-decoration:none;
    font-size:14px;font-weight:600;
    box-shadow:0 4px 10px rgba(0,0,0,0.08);">
      WhatsApp Customer
    </a>

  </td>
</tr>

<!-- Footer -->
<tr>
  <td style="background:#f5f7fa;padding:22px;text-align:center;font-size:12px;color:#6b7280;">
    This inquiry was submitted from the 
    <strong>Jain Foam & Furnishing</strong> website contact form.
  </td>
</tr>

  </table>
</div>
`;

    const text = `
New Contact Inquiry Received

Submitted At: ${new Date().toLocaleString()}

Customer Details:
Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Service: ${inquiry.service}

Message:
${inquiry.message}

Please respond to this inquiry as soon as possible.
    `;

    const toEmail = process.env.CONTACT_EMAIL || 'jainfoamf@gmail.com';
    if (!toEmail) {
      throw new Error('CONTACT_EMAIL is not configured');
    }

    await this.sendEmail({
      to: toEmail,
      subject,
      html,
      text,
    });
  }
}

export const emailService = new EmailService();
