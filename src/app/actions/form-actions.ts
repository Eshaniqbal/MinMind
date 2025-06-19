"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import nodemailer from "nodemailer";
import type { FormState } from "@/lib/types";
import { contactFormSchema, quoteFormSchema } from "@/lib/types";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "info@minmind.in",
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export type FormState = {
  message: string | null;
  errors: Record<string, string[]> | null;
  success: boolean;
};

const initialState: FormState = {
  message: null,
  errors: null,
  success: false,
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    console.log("Form data received:", rawData); // Debug log

    const validatedData = contactFormSchema.parse(rawData);
    console.log("Data validated successfully:", validatedData); // Debug log

    const timestamp = new Date().toLocaleString();

    try {
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "info@minmind.in",
        to: process.env.EMAIL_USER || "info@minmind.in",
        subject: `[Contact Form] New message from ${validatedData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Submitted:</strong> ${timestamp}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-left: 3px solid #007bff; margin-top: 10px;">
                ${validatedData.message}
              </div>
            </div>
            <p style="color: #666; font-size: 12px;">This email was sent from your website's contact form.</p>
          </div>
        `,
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "info@minmind.in",
        to: validatedData.email,
        subject: "Thank you for contacting MinMind",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <div style="background: #fff; padding: 32px 24px 16px 24px; text-align: center;">
              <a href="https://minmind.in" target="_blank" rel="noopener">
                <img src="https://minmind.in/logo.png" alt="MinMind Logo" style="height: 60px; margin-bottom: 16px;" />
              </a>
              <h2 style="color: #222; font-size: 24px; margin: 0 0 8px 0;">Thank you for contacting MinMind</h2>
              <p style="color: #666; font-size: 16px; margin: 0 0 16px 0;">We have received your message and will get back to you shortly.</p>
            </div>
            <div style="background: #f5f5f5; padding: 24px;">
              <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
              <div style="background: #fff; padding: 15px; border-left: 3px solid #007bff; border-radius: 6px; margin-bottom: 12px; color: #222;">${validatedData.message}</div>
              <p style="color: #888; font-size: 13px; margin: 0 0 8px 0;">Submitted on: ${timestamp}</p>
            </div>
            <div style="background: #fff; padding: 16px 24px 24px 24px; text-align: center;">
              <p style="color: #666; font-size: 15px; margin: 0 0 8px 0;">If you have any additional questions, please don't hesitate to contact us.</p>
              <p style="color: #888; font-size: 13px; margin: 0;">Best regards,<br><strong>The MinMind Team</strong></p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return {
        message: "Your message was received, but we couldn't send the confirmation email. Please try again later.",
        errors: null,
        success: false,
      };
    }

    revalidatePath("/");
    return {
      message: "Thank you for your message. We'll get back to you soon!",
      errors: null,
      success: true,
    };
  } catch (error) {
    console.error("Form submission error:", error); // Debug log
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
        success: false,
      };
    }
    return {
      message: "Something went wrong. Please try again later.",
      errors: null,
      success: false,
    };
  }
}

export async function submitQuoteForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    console.log("Quote form data received:", rawData); // Debug log

    const validatedData = quoteFormSchema.parse(rawData);
    console.log("Quote data validated successfully:", validatedData); // Debug log

    const timestamp = new Date().toLocaleString();

    try {
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "info@minmind.in",
        to: process.env.EMAIL_USER || "info@minmind.in",
        subject: `[Quote Request] New request from ${validatedData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Quote Request</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ""}
              <p><strong>Project Type:</strong> ${validatedData.projectType}</p>
              ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ""}
              <p><strong>Submitted:</strong> ${timestamp}</p>
              <p><strong>Project Details:</strong></p>
              <div style="background: white; padding: 15px; border-left: 3px solid #007bff; margin-top: 10px;">
                ${validatedData.details}
              </div>
            </div>
            <p style="color: #666; font-size: 12px;">This quote request was sent from your website's quote form.</p>
          </div>
        `,
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "info@minmind.in",
        to: validatedData.email,
        subject: "Thank you for your quote request - MinMind",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <div style="background: #fff; padding: 32px 24px 16px 24px; text-align: center;">
              <a href="https://minmind.in" target="_blank" rel="noopener">
                <img src="https://minmind.in/logo.png" alt="MinMind Logo" style="height: 60px; margin-bottom: 16px;" />
              </a>
              <h2 style="color: #222; font-size: 24px; margin: 0 0 8px 0;">Thank you for your interest in MinMind</h2>
              <p style="color: #666; font-size: 16px; margin: 0 0 16px 0;">We have received your quote request and will get back to you shortly.</p>
            </div>
            <div style="background: #f5f5f5; padding: 24px;">
              <h3 style="color: #333; margin-top: 0;">Your Quote Request Summary:</h3>
              <ul style="list-style: none; padding: 0; color: #222;">
                <li style="margin-bottom: 10px;"><strong>Project Type:</strong> ${validatedData.projectType}</li>
                ${validatedData.budget ? `<li style=\"margin-bottom: 10px;\"><strong>Budget:</strong> ${validatedData.budget}</li>` : ""}
                ${validatedData.company ? `<li style=\"margin-bottom: 10px;\"><strong>Company:</strong> ${validatedData.company}</li>` : ""}
              </ul>
              <div style="background: #fff; padding: 15px; border-left: 3px solid #007bff; border-radius: 6px; margin-bottom: 12px; color: #222;">${validatedData.details}</div>
              <p style="color: #888; font-size: 13px; margin: 0 0 8px 0;">Submitted on: ${timestamp}</p>
            </div>
            <div style="background: #fff; padding: 16px 24px 24px 24px; text-align: center;">
              <p style="color: #666; font-size: 15px; margin: 0 0 8px 0;">Our team will review your request and get back to you with a detailed quote within 24-48 hours.</p>
              <p style="color: #888; font-size: 13px; margin: 0;">Best regards,<br><strong>The MinMind Team</strong></p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send quote emails:", emailError);
      return {
        message: "Your quote request was received, but we couldn't send the confirmation email. Please try again later.",
        errors: null,
        success: false,
      };
    }

    revalidatePath("/");
    return {
      message: "Thank you for your quote request. We'll get back to you soon!",
      errors: null,
      success: true,
    };
  } catch (error) {
    console.error("Quote form submission error:", error); // Debug log
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
        success: false,
      };
    }
    return {
      message: "Something went wrong. Please try again later.",
      errors: null,
      success: false,
    };
  }
}
