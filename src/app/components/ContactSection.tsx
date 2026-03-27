"use client";

import React, { useState } from "react";

const ACCENT = "#00BFFF";

type Status = { type: "idle" | "sending" | "ok" | "error"; message?: string };

export default function ContactSection() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    const honeypot = (data.get("company") as string) || ""; // honeypot

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    if (honeypot) return; // spam bot trap

    setStatus({ type: "sending" });

    try {
      // 🟢 Send directly to Formspree
      const res = await fetch("https://formspree.io/f/xgvnzbwl", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus({ type: "ok", message: "Thanks! Your message has been sent." });
        form.reset();
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to send");
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <div
  className="
    w-full 
    max-w-3xl 
    mx-auto 
    px-4 sm:px-6 
    flex flex-col gap-6
  "
>
  <div
    className="
      relative 
      rounded-3xl 
      border border-white/10 
      bg-black/30 
      p-4 sm:p-6 md:p-8 
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      w-full
      max-w-full
    "
  >
    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent" />
    <form onSubmit={onSubmit} className="relative grid gap-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

      {/* Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" placeholder="Your name" required />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" placeholder="you@email.com" required />
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" htmlFor="message">
        <Textarea id="message" name="message" placeholder="Tell me a bit about your project…" required />
      </Field>

      {/* Submit + Links */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status.type === "sending"}
          className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white transition border border-white/10 self-start sm:self-auto"
          style={{
            background: "rgba(0,191,255,0.15)",
            borderColor: `${ACCENT}33`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,191,255,0.22)";
            e.currentTarget.style.borderColor = `${ACCENT}66`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,191,255,0.15)";
            e.currentTarget.style.borderColor = `${ACCENT}33`;
          }}
        >
          {status.type === "sending" ? "Sending..." : "Send message"}
        </button>

        {/* Status messages */}
        {status.type === "ok" && (
          <p className="text-sm text-emerald-400">{status.message}</p>
        )}
        {status.type === "error" && (
          <p className="text-sm text-red-400">{status.message}</p>
        )}

        {/* Contact links */}
        <div className="flex flex-col sm:items-end gap-2 text-sm text-white/80 w-full text-center sm:text-right">
          {/* Email (always on its own line) */}
          <span className="break-all block">
            abdelrahmanhany536@gmail.com
          </span>

          {/* Social links group */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
            <a
              href="https://github.com/abdelra7man-hany"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdelrahman-hany-cloud-data-engineer/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/abdelrahman15102/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>
    </form>
  </div>
</div>

  );
}

/* ---------- UI bits ---------- */

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2 text-left">
      <span className="text-sm text-white/80">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-2.5 text-white/90 placeholder-white/40
                  outline-none transition focus:border-[#00BFFF]/60 focus:ring-2 focus:ring-[#00BFFF]/30`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={6}
      className={`w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white/90 placeholder-white/40
                  outline-none transition focus:border-[#00BFFF]/60 focus:ring-2 focus:ring-[#00BFFF]/30 resize-y`}
    />
  );
}
