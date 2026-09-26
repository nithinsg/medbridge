import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({ title: "Privacy Notice", description: "How MedBridge collects, uses and protects personal and health information.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" path="/privacy">
      <p>
        This notice explains how {site.legalName} (&ldquo;MedBridge&rdquo;) handles personal data, including health
        information, in line with India&apos;s Digital Personal Data Protection Act, 2023 and other applicable law.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Contact details you provide: name, phone, WhatsApp number and email.</li>
        <li>Transfer details: patient location, destination, urgency and preferred transport.</li>
        <li>Limited health information you choose to share (for example, whether the patient is in ICU) to plan a transfer.</li>
        <li>Technical data such as pages visited, collected without identifying you (see Analytics).</li>
      </ul>
      <h2>Why we use it</h2>
      <p>
        Only to respond to your request and coordinate the medical transfer: contacting you, sharing necessary clinical
        information with the treating and receiving clinicians, the transport operators and — with your consent — your
        insurer or employer.
      </p>
      <h2>Consent</h2>
      <p>
        We process your data on the basis of the consent you give when submitting a request. You can withdraw consent at
        any time by contacting us at {site.contact.email}; this will not affect processing already carried out.
      </p>
      <h2>Analytics</h2>
      <p>
        We measure how the website is used (for example, which buttons are clicked) using privacy-friendly analytics. We
        never send names, phone numbers, email addresses or health information to analytics tools.
      </p>
      <h2>Retention and security</h2>
      <p>
        Case records are stored securely with access restricted to authorised MedBridge staff, and retained only as long as
        needed for the transfer and our legal obligations. [PLACEHOLDER: retention period]
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or erasure of your personal data, and nominate another person to
        exercise your rights. Grievance Officer: [PLACEHOLDER — name, email].
      </p>
    </LegalPage>
  );
}
