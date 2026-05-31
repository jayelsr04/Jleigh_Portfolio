"use client";

import { useState } from "react";
import useScrollReveal from "@/lib/useScrollReveal";
import WaveDivider from "@/components/ui/WaveDivider";

export default function ContactSection() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{ background: "var(--section-bg)" }}
    >
      <WaveDivider flip={true} color="var(--section-bg)" topColor="var(--section-alt-bg)" />

      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <p
            className="font-mono text-sm mb-3"
            style={{ color: "var(--ocean-seafoam)", letterSpacing: "0.12em" }}
          >
            03 / CONTACT
          </p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--text-main)",
              lineHeight: "1.2",
            }}
          >
            Let&apos;s{" "}
            <span className="gradient-text font-display italic">connect</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Have a project in mind or just want to chat? Drop me a message
            and I&apos;ll get back to you as soon as I can.
          </p>
        </div>

        {/* Success State */}
        {submitted ? (
          <div
            className="glass-card rounded-2xl p-10 text-center"
            style={{ border: "1px solid var(--surface-border)" }}
          >
            <div className="text-5xl mb-4">🌊</div>
            <h3
              className="font-display font-bold text-2xl mb-2"
              style={{ color: "var(--ocean-seafoam)" }}
            >
              Message sent!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
            <button
              className="btn-outline mt-6"
              onClick={() => setSubmitted(false)}
              style={{ fontSize: "0.85rem", padding: "8px 20px" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          /* Contact Form */
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {/* Name */}
              <div>
                <label
                  className="block text-sm mb-1.5 font-mono"
                  style={{ color: "var(--text-soft)", fontSize: "0.78rem", letterSpacing: "0.08em" }}
                >
                  YOUR NAME
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-200"
                  style={{
                    background: "var(--input-bg)",
                    border: errors.name
                      ? "1px solid var(--coral)"
                      : "1px solid var(--surface-border)",
                    color: "var(--text-main)",
                    fontSize: "0.92rem",
                  }}
                  onFocus={(e) => {
                    if (!errors.name)
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--ocean-foam)";
                  }}
                  onBlur={(e) => {
                    if (!errors.name)
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--surface-border)";
                  }}
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "var(--coral)" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm mb-1.5 font-mono"
                  style={{ color: "var(--text-soft)", fontSize: "0.78rem", letterSpacing: "0.08em" }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-200"
                  style={{
                    background: "var(--input-bg)",
                    border: errors.email
                      ? "1px solid var(--coral)"
                      : "1px solid var(--surface-border)",
                    color: "var(--text-main)",
                    fontSize: "0.92rem",
                  }}
                  onFocus={(e) => {
                    if (!errors.email)
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--ocean-foam)";
                  }}
                  onBlur={(e) => {
                    if (!errors.email)
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--surface-border)";
                  }}
                />
                {errors.email && (
                  <p className="text-xs mt-1" style={{ color: "var(--coral)" }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="mb-7">
              <label
                className="block text-sm mb-1.5 font-mono"
                style={{ color: "var(--text-soft)", fontSize: "0.78rem", letterSpacing: "0.08em" }}
              >
                MESSAGE
              </label>
              <textarea
                rows={5}
                placeholder="Say Hello..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-200 resize-none"
                style={{
                  background: "var(--input-bg)",
                  border: errors.message
                    ? "1px solid var(--coral)"
                    : "1px solid var(--surface-border)",
                  color: "var(--text-main)",
                  fontSize: "0.92rem",
                  lineHeight: "1.7",
                }}
                onFocus={(e) => {
                  if (!errors.message)
                    (e.target as HTMLTextAreaElement).style.borderColor =
                      "var(--ocean-foam)";
                }}
                onBlur={(e) => {
                  if (!errors.message)
                    (e.target as HTMLTextAreaElement).style.borderColor =
                      "var(--surface-border)";
                }}
              />
              {errors.message && (
                <p className="text-xs mt-1" style={{ color: "var(--coral)" }}>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              className="btn-primary w-full flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={loading}
              style={{ opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
