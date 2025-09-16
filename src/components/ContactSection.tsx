/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "@/lib/client";

type ContactInfo = {
  email?: string;
  phoneNumber?: string | number | any; // allow different shapes since Sanity can return various types
  location?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
};

export const ContactSection = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data: ContactInfo = await client.fetch(`
          *[_type == 'contact'][0]{
            email,
            phoneNumber,
            location,
            linkedinUrl,
            instagramUrl
          }
        `);

        if (!data) {
          console.warn("No contact info found in Sanity");
          return;
        }

        setContact(data);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    };
    fetchContact();
  }, []);

  // Normalize different possible phone input shapes to a string
  const normalizePhoneInput = (num?: any): string => {
    if (num === null || num === undefined) return "";
    if (typeof num === "string" || typeof num === "number") return String(num);

    // If it's an array (e.g. ["0332", "7394491"]) join it
    if (Array.isArray(num)) return num.join("");

    // If it's an object, try common fields
    if (typeof num === "object") {
      if (typeof num.number === "string" || typeof num.number === "number")
        return String(num.number);
      if (typeof num.value === "string" || typeof num.value === "number")
        return String(num.value);
      if (typeof num.phone === "string" || typeof num.phone === "number")
        return String(num.phone);
      // If Sanity returned a portable text block or other shape, try JSON stringify fallback
      try {
        const maybe = JSON.stringify(num);
        return maybe;
      } catch {
        return "";
      }
    }

    return "";
  };

  // Format for display: +92 332 7394491
  const formatPhoneNumber = (num?: any) => {
    const raw = normalizePhoneInput(num);
    if (!raw) return "";

    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";

    const formatted = digits.startsWith("92")
      ? digits
      : digits.startsWith("0")
        ? "92" + digits.slice(1)
        : digits;

    // Guard against short numbers
    if (formatted.length <= 2) return `+${formatted}`;

    return `+${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(
      5
    )}`;
  };

  // Get tel: link in E.164 format: tel:+923327394491
  const getTelLink = (num?: any) => {
    const raw = normalizePhoneInput(num);
    if (!raw) return "#";

    const digits = raw.replace(/\D/g, "");
    if (!digits) return "#";

    const formatted = digits.startsWith("92")
      ? digits
      : digits.startsWith("0")
        ? "92" + digits.slice(1)
        : digits;

    return `tel:+${formatted}`;
  };

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setResult("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("botcheck")) return;

    formData.append("access_key", "402cbe14-50a8-4a43-9f5e-a743f7d545cd");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "✅ Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setSuccess(true);
        setResult("Form Submitted Successfully ✅");
        form.reset();
      } else {
        toast({
          title: "❌ Error",
          description:
            data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        setResult(data.message || "Error submitting form ❌");
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast({
        title: "⚠️ Network Error",
        description: "Unable to send message. Please check your connection.",
        variant: "destructive",
      });
      setResult("Network Error ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In <span className="text-primary">Touch</span>
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Have a project idea or want to collaborate? Don&apos;t hesitate to
          reach out — I&apos;m always open to discussing new opportunities.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href={`mailto:${contact?.email || "abdud099@gmail.com"}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact?.email || "abdud099@gmail.com"}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a
                    href={getTelLink(contact?.phoneNumber)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact?.phoneNumber
                      ? formatPhoneNumber(contact.phoneNumber)
                      : "+92 332 7394491"}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <span className="text-muted-foreground">
                    {contact?.location || "Karachi, Pakistan"}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a
                  href={
                    contact?.linkedinUrl ||
                    "https://linkedin.com/in/abdul-basit-248146286"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="hover:text-blue-500 transition-colors" />
                </a>
                <a
                  href={
                    contact?.instagramUrl || "https://instagram.com/abdud099"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="hover:text-orange-400 transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-card p-8 rounded-xl shadow-sm border border-border"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" />

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary"
                  placeholder="Your Name..."
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary"
                  placeholder="Your Email..."
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                aria-live="polite"
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> Sent!
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </motion.button>

              {/* Status */}
              {result && (
                <p className="text-sm text-center mt-2 text-muted-foreground">
                  {result}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
