"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-brand-ink">
      {label}
      <input className="min-h-12 rounded-md border border-brand-line bg-brand-linen px-3 text-base font-normal text-brand-ink shadow-inner shadow-brand-line/20 placeholder:text-brand-muted focus:border-brand-forest" name={name} type={type} required={required} />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-brand-ink">
      {label}
      <select className="min-h-12 rounded-md border border-brand-line bg-brand-linen px-3 text-base font-normal text-brand-ink shadow-inner shadow-brand-line/20 focus:border-brand-forest" name={name}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function LeadForm({ kind }: { kind: "rental-estimate" | "contact" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isRental = kind === "rental-estimate";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || status === "success") return;
    setStatus("submitting");
    setErrorMessage("");
    if (isRental) trackEvent("rental_estimate_started");
    const form = event.currentTarget;
    const response = await fetch(`/api/${kind}`, { method: "POST", body: new FormData(form) });
    if (response.ok) {
      setStatus("success");
      trackEvent(isRental ? "rental_estimate_submitted" : "contact_form_submitted");
      if (isRental) window.location.href = "/thank-you/rental-estimate";
      else form.reset();
      return;
    }
    const payload = await response.json().catch(() => null);
    setErrorMessage(payload?.error || "Something went wrong. Please try again or call 206.771.9992.");
    setStatus("error");
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-md border border-brand-line bg-white p-5 shadow-card md:p-6" noValidate={false}>
      <label className="sr-only">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="border-b border-brand-line pb-5">
        <h2 className="text-2xl font-semibold text-brand-ink">{isRental ? "Request Your Rental Estimate" : "Send EEE a Message"}</h2>
        <p className="mt-2 text-sm leading-6 text-brand-muted">{isRental ? "Share the basics. EEE will use this information to start a practical property conversation." : "Tell EEE what you need help with and the team will respond to your inquiry."}</p>
      </div>
      {isRental ? (
        <Field label="Owner Name" name="ownerName" required />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First Name" name="firstName" required />
          <Field label="Last Name" name="lastName" required />
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <Field label="Property Address" name="propertyAddress" required={isRental} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="City" name="city" />
        {isRental ? (
          <SelectField label="Property Type" name="propertyType" options={["Single-family home", "Luxury single-family home", "Small multifamily", "Other"]} />
        ) : (
          <SelectField label="Reason for Contact" name="reason" options={["Property management inquiry", "Rental estimate", "Switching managers", "Available rental", "Other"]} />
        )}
      </div>
      {isRental && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Number of Bedrooms" name="bedrooms" />
            <Field label="Number of Bathrooms" name="bathrooms" />
            <SelectField label="Current Property Status" name="currentPropertyStatus" options={["Preparing to rent", "Vacant", "Occupied by owner", "Tenant occupied", "Not sure yet"]} />
            <SelectField label="Currently Rented?" name="currentlyRented" options={["No", "Yes"]} />
            <Field label="Current Monthly Rent (Optional)" name="currentMonthlyRent" />
            <SelectField label="Desired Management Start Timeframe" name="managementStartTimeframe" options={["As soon as practical", "Within 30 days", "1-3 months", "3+ months", "Just researching"]} />
          </div>
        </>
      )}
      <label className="grid gap-2 text-sm font-semibold text-brand-ink">
        {isRental ? "Additional Comments or Questions" : "Message"}
        <textarea className="min-h-32 rounded-md border border-brand-line bg-brand-linen p-3 text-base font-normal text-brand-ink shadow-inner shadow-brand-line/20 focus:border-brand-forest" name="message" required={!isRental} />
      </label>
      <label className="flex gap-3 text-sm leading-6 text-brand-muted">
        <input className="mt-1 h-4 w-4" type="checkbox" name="consent" required />
        <span>I agree that EEE Property Management may contact me about this inquiry, subject to the Privacy Policy.</span>
      </label>
      <button className="min-h-12 rounded-md bg-brand-forest px-5 font-semibold text-white shadow-card hover:bg-brand-ink disabled:opacity-70" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : isRental ? "Get My Free Rental Estimate" : "Contact EEE Property Management"}
      </button>
      <p className="text-sm leading-6 text-brand-muted">
        {isRental
          ? "No spam. No pressure. No information sharing. Your information stays private and will only be used to contact you about your rental estimate or property management questions."
          : "No spam. No pressure. Your information will only be used to respond to your property-management inquiry."}
      </p>
      {status === "success" && !isRental && <p role="status" className="rounded-md bg-brand-mist p-3 text-sm font-semibold text-brand-success">Thanks. Your message has been received.</p>}
      {status === "error" && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm font-semibold text-brand-error">{errorMessage}</p>}
    </form>
  );
}
