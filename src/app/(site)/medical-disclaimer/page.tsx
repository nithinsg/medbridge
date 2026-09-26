import { pageMetadata } from "@/lib/seo";
import { clinicalBoundary } from "@/content/trust";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({ title: "Medical Disclaimer", description: "MedBridge coordinates transfers; clinicians make clinical decisions.", path: "/medical-disclaimer" });

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage title="Medical Disclaimer" path="/medical-disclaimer">
      <p>{clinicalBoundary}</p>
      <h2>No diagnosis or fitness-to-fly decisions</h2>
      <p>
        No part of this website — including the transfer request form, the &ldquo;Which air ambulance do I need?&rdquo;
        guide and the cost estimator — diagnoses a condition, determines fitness to travel, or recommends a treatment or
        transport modality. These tools support a conversation with qualified clinicians; they do not replace it.
      </p>
      <h2>Emergencies</h2>
      <p>
        MedBridge is not a first-response emergency service. In a life-threatening emergency, call 112 or your local
        emergency number, or go to the nearest emergency department.
      </p>
      <h2>Educational content</h2>
      <p>
        Knowledge Hub articles are general information and may not apply to an individual patient. Always follow the
        advice of the treating doctors.
      </p>
    </LegalPage>
  );
}
