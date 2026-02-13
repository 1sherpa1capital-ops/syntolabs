"use client";

import { useState } from "react";
import { sendEmail, type AgentMailPayload } from "@/lib/agentmail";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<AgentMailPayload>({
    to: "",
    subject: "",
    body: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      setFormData({ to: "", subject: "", body: "" });
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to send email");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 text-center",
          className
        )}
      >
        <p className="text-emerald-400 font-medium">Message sent successfully!</p>
        <p className="text-zinc-400 text-sm mt-2">We'll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
    >
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-zinc-300 mb-1.5">
          Your Email
        </label>
        <input
          type="email"
          id="to"
          name="to"
          value={formData.to}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          placeholder="you@company.com"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-1.5">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          placeholder="How can we help?"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-zinc-300 mb-1.5">
          Message
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
          placeholder="Tell us about your project..."
          disabled={status === "loading"}
        />
      </div>

      {status === "error" && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 disabled:cursor-not-allowed text-black font-medium rounded-lg transition-colors cursor-pointer"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
