import nodemailer from 'nodemailer';

/**
 * Sends formatted email alert to the site administrator when a new lead is captured.
 */
export async function sendLeadNotificationEmail(lead) {
  try {
    const smtpHost = process.env.EMAIL_HOST;
    const smtpPort = process.env.EMAIL_PORT || 587;
    const smtpUser = process.env.EMAIL_USER;
    const smtpPass = process.env.EMAIL_PASS;
    const toEmail = process.env.NOTIFICATION_EMAIL_TO || smtpUser;

    // If SMTP credentials aren't set up yet, log gracefully
    if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
      console.log('ℹ️ SMTP is not fully configured in .env.local. Skipping email dispatch for lead:', lead.name);
      return { success: false, reason: 'SMTP not configured' };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const cleanPhone = (lead.customerPhone || '').replace(/\D/g, '');
    const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for contacting SolarCleaner.in. We received your booking request.`)}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fffdf7; border: 1px solid #e8e2d0; border-radius: 12px; overflow: hidden; color: #1d2433;">
        <div style="background-color: #f59e0b; padding: 24px; text-align: center; color: #1d2433;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800;">⚡ New Solar Cleaning Booking</h1>
          <p style="margin: 6px 0 0; font-size: 14px; font-weight: 600;">SolarCleaner.in Notification Alert</p>
        </div>

        <div style="padding: 24px;">
          <p style="font-size: 16px; margin-top: 0;">A new customer has requested a solar panel cleaning visit:</p>

          <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; border: 1px solid #e8e2d0;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold; width: 35%;">Customer Name:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">Phone Number:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1;">
                <a href="tel:${lead.customerPhone}" style="color: #b45309; font-weight: bold; text-decoration: none;">${lead.customerPhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">Customer Category:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1;">${lead.type || 'Home owner'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">Plant Capacity:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1;">${lead.size ? `${lead.size} kW` : 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">Address / Colony:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1;">${lead.address || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">Preferred Date:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; color: #b45309; font-weight: bold;">${lead.preferredDate || 'Earliest available'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">Preferred Time Slot:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">${lead.preferredTime || '-'}</td>
            </tr>
            ${lead.locationCoords ? `
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1; font-weight: bold;">GPS Location Pin:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1ece1;">
                <a href="${lead.locationCoords}" target="_blank" style="background: #eef2ff; color: #4338ca; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: bold;">📍 Open in Google Maps</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 16px; font-weight: bold;">City / Area:</td>
              <td style="padding: 12px 16px;">${lead.city || 'Lucknow'}</td>
            </tr>
          </table>

          <div style="margin: 24px 0; text-align: center;">
            <a href="${waLink}" style="display: inline-block; background-color: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; margin-right: 10px;">
              💬 Reply to Customer on WhatsApp
            </a>
            <a href="tel:${lead.customerPhone}" style="display: inline-block; background-color: #1d2433; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none;">
              📞 Call Now
            </a>
          </div>
        </div>

        <div style="background-color: #f6f3eb; padding: 14px; text-align: center; font-size: 12px; color: #5b6475; border-top: 1px solid #e8e2d0;">
          This is an automated notification from your SolarCleaner.in leads system.
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"SolarCleaner Leads" <${smtpUser}>`,
      to: toEmail,
      subject: `⚡ New Lead: ${lead.name} (${lead.size ? `${lead.size} kW` : lead.type}) - ${lead.city || 'Lucknow'}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Lead email notification delivered successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending notification email:', error.message);
    return { success: false, error: error.message };
  }
}
