"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulated submit — replace with real API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Get in touch
          </h1>
          <p className="mt-4 text-neutral-500 text-base leading-relaxed">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-[#0a0a0a] tracking-tight mb-2">
              Contact details
            </h2>

            <div className="bg-[#f8f5f0] rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-4 w-4 text-[#c9a96e]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@ipalo.co.za"
                    className="text-sm font-medium text-[#0a0a0a] hover:text-[#c9a96e] transition-colors"
                  >
                    hello@ipalo.co.za
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="h-4 w-4 text-[#c9a96e]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+27674073148"
                    className="text-sm font-medium text-[#0a0a0a] hover:text-[#c9a96e] transition-colors"
                  >
                    +27 67 407 3148
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="h-4 w-4 text-[#c9a96e]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Business hours
                  </p>
                  <p className="text-sm font-medium text-[#0a0a0a]">
                    Mon – Fri, 9am – 5pm SAST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="h-4 w-4 text-[#c9a96e]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Response time
                  </p>
                  <p className="text-sm font-medium text-[#0a0a0a]">
                    Within 24 business hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <h2 className="text-lg font-semibold text-[#0a0a0a] tracking-tight mb-6">
              Send a message
            </h2>

            {status === "success" ? (
              <div className="bg-[#f8f5f0] rounded-2xl p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-5 w-5 text-[#c9a96e]" />
                </div>
                <h3 className="font-semibold text-[#0a0a0a] mb-2">Message sent!</h3>
                <p className="text-sm text-neutral-500">
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-[#c9a96e] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-[#c9a96e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-[#c9a96e] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-sm text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-[#c9a96e] transition-colors appearance-none"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="order-enquiry">Order enquiry</option>
                    <option value="product-question">Product question</option>
                    <option value="returns">Returns</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-[#c9a96e] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-neutral-400">
                    We typically respond within 24 hours on business days.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
