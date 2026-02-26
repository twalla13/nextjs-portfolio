'use client';

import { useState, FormEvent } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface FormData {
  name: string;
  email: string;
  message: string;
  /** Honeypot — real users never see or fill this */
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

interface Props {
  /** Called after a successful submission (e.g. to close a modal) */
  onSuccess?: () => void;
}

function validate(data: FormData): FormErrors {
  const errs: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errs.name = 'Please enter your name (at least 2 characters).';
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errs.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errs.message = 'Message must be at least 10 characters.';
  }
  return errs;
}

export default function ContactForm({ onSuccess }: Props) {
  const [data, setData] = useState<FormData>({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (siteKey && !turnstileToken) {
      setErrors({ general: 'Please complete the security check.' });
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
      if (!apiUrl) throw new Error('Contact API URL is not configured.');

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
          honeypot: data.website,
          turnstileToken,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
        setErrors({ general: result.error ?? 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus('error');
      setErrors({ general: 'Network error — please check your connection and try again.' });
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <div className="text-5xl mb-4" aria-hidden="true">🎉</div>
        <h3 className="font-display text-2xl text-notebook-ink mb-2">Message sent!</h3>
        <p className="font-body text-slate-600">
          Thanks for reaching out, I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, filled by bots */}
      <div aria-hidden="true" className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none" tabIndex={-1}>
        <label htmlFor="hp-website">Website</label>
        <input
          id="hp-website"
          type="text"
          name="website"
          value={data.website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="block font-body text-sm font-medium text-slate-700 mb-1">
          Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Your full name"
          required
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
          className={`w-full px-3.5 py-2.5 border-2 rounded-lg font-body text-sm focus:outline-none focus:border-notebook-blue-dark bg-white transition-colors ${
            errors.name ? 'border-red-400' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {errors.name && (
          <p id="cf-name-err" className="text-red-500 text-xs mt-1.5 font-body" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="block font-body text-sm font-medium text-slate-700 mb-1">
          Email <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="you@example.com"
          required
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
          className={`w-full px-3.5 py-2.5 border-2 rounded-lg font-body text-sm focus:outline-none focus:border-notebook-blue-dark bg-white transition-colors ${
            errors.email ? 'border-red-400' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {errors.email && (
          <p id="cf-email-err" className="text-red-500 text-xs mt-1.5 font-body" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block font-body text-sm font-medium text-slate-700 mb-1">
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          placeholder="Tell me about your project or opportunity..."
          required
          rows={5}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={`w-full px-3.5 py-2.5 border-2 rounded-lg font-body text-sm focus:outline-none focus:border-notebook-blue-dark bg-white transition-colors resize-none ${
            errors.message ? 'border-red-400' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {errors.message && (
          <p id="cf-message-err" className="text-red-500 text-xs mt-1.5 font-body" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Turnstile CAPTCHA — only renders when site key is set */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken('')}
            options={{ theme: 'light', size: 'normal' }}
          />
        </div>
      )}

      {/* General error */}
      {errors.general && (
        <p className="text-red-500 text-sm font-body bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
          {errors.general}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full btn-primary justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === 'submitting' ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-notebook-ink/40 border-t-notebook-ink rounded-full animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
