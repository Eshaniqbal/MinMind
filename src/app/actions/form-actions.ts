"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Resend } from "resend";
import type { FormState } from "@/lib/types";
import { contactFormSchema, quoteFormSchema } from "@/lib/types";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Debug log to check if Resend is configured
console.log("Resend configured:", !!resend);
console.log("Admin email:", process.env.ADMIN_EMAIL);

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

    // Only send emails if Resend is configured
    if (resend) {
      try {
        console.log("Attempting to send admin notification..."); // Debug log
        
        // Send email to admin
        const adminEmailResponse = await resend.emails.send({
          from: "MinMind Contact Form <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL || "your-email@example.com",
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
          tags: [
            { name: "category", value: "contact_form" },
            { name: "source", value: "website" }
          ],
        });

        console.log("Admin email sent:", adminEmailResponse); // Debug log

        console.log("Attempting to send user confirmation..."); // Debug log
        
        // Send confirmation email to user
        const userEmailResponse = await resend.emails.send({
          from: "MinMind <onboarding@resend.dev>",
          to: validatedData.email,
          subject: "Thank you for contacting MinMind",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for contacting MinMind</h2>
              <p>We have received your message and will get back to you shortly.</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
                <div style="background: white; padding: 15px; border-left: 3px solid #007bff;">
                  ${validatedData.message}
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 10px;">Submitted on: ${timestamp}</p>
              </div>

              <p>If you have any additional questions, please don't hesitate to contact us.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666;">Best regards,<br>The MinMind Team</p>
              </div>
            </div>
          `,
          tags: [
            { name: "category", value: "contact_form" },
            { name: "type", value: "confirmation" }
          ],
        });

        console.log("User confirmation email sent:", userEmailResponse); // Debug log

      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Return a more specific error message
        return {
          message: "Your message was received, but we couldn't send the confirmation email. Please try again later.",
          errors: null,
          success: false,
        };
      }
    } else {
      console.log("Email sending is not configured. Form submission data:", validatedData);
      return {
        message: "Your message was received, but email notifications are not configured. Please contact the administrator.",
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

    // Only send emails if Resend is configured
    if (resend) {
      try {
        console.log("Attempting to send quote admin notification..."); // Debug log
        
        // Send email to admin
        const adminEmailResponse = await resend.emails.send({
          from: "MinMind Quote Form <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL || "your-email@example.com",
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
          tags: [
            { name: "category", value: "quote_request" },
            { name: "source", value: "website" }
          ],
        });

        console.log("Quote admin email sent:", adminEmailResponse); // Debug log

        console.log("Attempting to send quote confirmation..."); // Debug log
        
        // Send confirmation email to user
        const userEmailResponse = await resend.emails.send({
          from: "MinMind <onboarding@resend.dev>",
          to: validatedData.email,
          subject: "Thank you for your quote request - MinMind",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for your interest in MinMind</h2>
              <p>We have received your quote request and will get back to you shortly.</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Your Quote Request Summary:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 10px;"><strong>Project Type:</strong> ${validatedData.projectType}</li>
                  ${validatedData.budget ? `<li style="margin-bottom: 10px;"><strong>Budget:</strong> ${validatedData.budget}</li>` : ""}
                  ${validatedData.company ? `<li style="margin-bottom: 10px;"><strong>Company:</strong> ${validatedData.company}</li>` : ""}
                </ul>
                <p style="color: #666; font-size: 12px;">Submitted on: ${timestamp}</p>
              </div>

              <p>Our team will review your request and get back to you with a detailed quote within 24-48 hours.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666;">Best regards,<br>The MinMind Team</p>
              </div>
            </div>
          `,
          tags: [
            { name: "category", value: "quote_request" },
            { name: "type", value: "confirmation" }
          ],
        });

        console.log("Quote confirmation email sent:", userEmailResponse); // Debug log

      } catch (emailError) {
        console.error("Failed to send quote emails:", emailError);
        return {
          message: "Your quote request was received, but we couldn't send the confirmation email. Please try again later.",
          errors: null,
          success: false,
        };
      }
    } else {
      console.log("Email sending is not configured. Quote form submission data:", validatedData);
      return {
        message: "Your quote request was received, but email notifications are not configured. Please contact the administrator.",
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
