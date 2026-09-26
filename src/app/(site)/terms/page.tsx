import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Terms governing use of the MedBridge website and services.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms">
      <p>These terms govern your use of this website operated by {site.legalName}.</p>
      <h2>Nature of the service</h2>
      <p>
        MedBridge is a medical transfer coordination service. Transport is performed by independent, appropriately
        licensed operators and medical teams selected for each case. Clinical decisions are made by qualified medical
        professionals.
      </p>
      <h2>Information on this website</h2>
      <p>
        Content is general information and is not medical advice. Estimates produced by website tools are indicative only
        and are not quotations. Final pricing requires a case assessment and operator confirmation.
      </p>
      <h2>Submitting a request</h2>
      <p>
        Submitting a request does not create a contract for transport. A transfer is confirmed only once a written quote
        has been accepted and the operator has confirmed availability.
      </p>
      <h2>Liability</h2>
      <p>[PLACEHOLDER — liability, governing law and jurisdiction to be drafted by counsel.]</p>
    </LegalPage>
  );
}
