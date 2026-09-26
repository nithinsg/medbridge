import Link from "next/link";
import { site } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/links";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/air-ambulance", label: "Air ambulance" },
      { href: "/medical-transfer", label: "Medical transfer" },
      { href: "/international-repatriation", label: "International repatriation" },
      { href: "/transplant-transfers", label: "Transplant transfers" },
      { href: "/specialty-transfers", label: "Specialty transfers" },
      { href: "/air-ambulance-cost", label: "Cost & estimate" },
    ],
  },
  {
    title: "Clinicians & partners",
    links: [
      { href: "/for-doctors", label: "For referring doctors" },
      { href: "/for-hospitals", label: "For hospitals" },
      { href: "/network", label: "The MedBridge Network" },
      { href: "/which-air-ambulance", label: "Which transfer do I need?" },
      { href: "/contact#partners", label: "Insurers & assistance" },
    ],
  },
  {
    title: "Air ambulance in",
    links: [
      { href: "/air-ambulance-india", label: "India" },
      { href: "/air-ambulance-delhi", label: "Delhi NCR" },
      { href: "/air-ambulance-mumbai", label: "Mumbai" },
      { href: "/air-ambulance-bangalore", label: "Bengaluru" },
      { href: "/air-ambulance-hyderabad", label: "Hyderabad" },
      { href: "/air-ambulance-chennai", label: "Chennai" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About MedBridge" },
      { href: "/knowledge", label: "Knowledge Hub" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/medical-disclaimer", label: "Medical disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300">
      <div className="container-page pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="inverse" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              {site.tagline} {site.proofLine}
            </p>
            <div className="mt-8 space-y-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">24/7 Transfer Desk</p>
                <a
                  href={telHref()}
                  data-placement="footer"
                  className="text-xl font-semibold tabular-nums text-white hover:text-aqua-300"
                >
                  {site.contact.deskPhoneDisplay}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                <a href={whatsappHref("family")} target="_blank" rel="noopener noreferrer" data-placement="footer" className="hover:text-white">
                  WhatsApp a coordinator
                </a>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </div>
              <address className="not-italic text-[14px] leading-relaxed text-navy-400">
                {site.address.line1}
                <br />
                {site.address.line2}
              </address>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-navy-400">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[14.5px]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-[13px] leading-relaxed text-navy-400">
          <p className="max-w-4xl">
            MedBridge is a medical transfer coordination service. Transport modality and fitness for transfer are
            determined by qualified medical professionals — the treating clinician, the receiving clinician and the
            aeromedical team. Information on this website is general and is not medical advice. In a life-threatening
            emergency, call <a className="underline" href="tel:112">112</a> or your local emergency number.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
