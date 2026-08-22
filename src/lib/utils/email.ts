/**
 * Email Utility — Mock Implementation
 *
 * This module provides a stable email interface for all server actions.
 * The mock logs emails to the console and always returns success.
 *
 * --- EJECTED PROJECT: Replace the provider ---
 * When delivering to a client, replace `sendEmailViaProvider` below with a
 * real email provider. The interface stays the same — no other files need changing.
 *
 * Option A — Resend (recommended for Next.js):
 *   pnpm add resend
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ from: 'noreply@domain.com', ...payload });
 *
 * Option B — Nodemailer (self-hosted SMTP):
 *   pnpm add nodemailer
 *   const transporter = nodemailer.createTransporter({
 *     host: process.env.SMTP_HOST,
 *     port: Number(process.env.SMTP_PORT),
 *     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
 *   });
 *   await transporter.sendMail({ from: process.env.SMTP_FROM, ...payload });
 *
 * Option C — SendGrid, Postmark, AWS SES — all follow the same pattern.
 *
 * See SECURITY.md for more detail.
 */

export interface EmailPayload {
  to: string;
  replyTo?: string;
  subject: string;
  /** Plain-text body (always required as fallback) */
  text: string;
  /** Optional HTML body */
  html?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Core email send function — swap this implementation for your chosen provider.
 * @internal
 */
const sendEmailViaProvider = async (payload: EmailPayload): Promise<EmailResult> => {
  // ── MOCK IMPLEMENTATION ───────────────────────────────────────────────────
  // Logs to console in development. Replace with real provider in ejected projects.
  console.log('[EMAIL MOCK] Sending email:', {
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    textPreview: `${payload.text.slice(0, 120)}${payload.text.length > 120 ? '…' : ''}`,
  });
  return { success: true, messageId: `mock-${Date.now()}` };
  // ── END MOCK ──────────────────────────────────────────────────────────────
};

/**
 * Generic send entry point for admin demo messages and future CRM hooks.
 * Always uses the mock provider in this showcase project.
 */
export const sendEmail = async (payload: EmailPayload): Promise<EmailResult> => {
  return sendEmailViaProvider(payload);
};

// ─────────────────────────────────────────────────────────────────────────────
// Public email helpers — used across all server actions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Notify the site owner of a new contact form submission.
 */
export const sendContactNotification = async (params: {
  adminEmail: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}): Promise<EmailResult> => {
  return sendEmailViaProvider({
    to: params.adminEmail,
    replyTo: params.senderEmail,
    subject: `[New Message] ${params.subject}`,
    text: [
      `New contact message from ${params.senderName} <${params.senderEmail}>`,
      '',
      `Subject: ${params.subject}`,
      '',
      params.message,
    ].join('\n'),
  });
};

/**
 * Send a confirmation email to the contact form submitter.
 */
export const sendContactConfirmation = async (params: {
  to: string;
  name: string;
  subject: string;
}): Promise<EmailResult> => {
  return sendEmailViaProvider({
    to: params.to,
    subject: `We received your message: "${params.subject}"`,
    text: [
      `Hi ${params.name},`,
      '',
      `Thank you for reaching out! We have received your message about "${params.subject}" and will get back to you as soon as possible.`,
      '',
      'Best regards,',
      'The Team',
    ].join('\n'),
  });
};

/**
 * Send an order confirmation to a customer.
 */
export const sendOrderConfirmation = async (params: {
  to: string;
  customerName: string;
  orderId: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}): Promise<EmailResult> => {
  const itemLines = params.items
    .map(
      (item) =>
        `  • ${item.name} × ${item.quantity}  —  $${(item.price * item.quantity).toFixed(2)}`
    )
    .join('\n');

  return sendEmailViaProvider({
    to: params.to,
    subject: `Order Confirmed — ${params.orderId}`,
    text: [
      `Hi ${params.customerName},`,
      '',
      'Thank you for your order! Here is a summary:',
      '',
      `Order ID: ${params.orderId}`,
      '',
      'Items:',
      itemLines,
      '',
      `Total: $${params.total.toFixed(2)}`,
      '',
      'We will process your order shortly.',
      '',
      'Best regards,',
      'The Team',
    ].join('\n'),
  });
};
