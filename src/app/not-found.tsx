import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBar } from "@/components/layout/EmergencyBar";
import { buttonClasses } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 bg-mist-50">
        <div className="container-page py-24 md:py-32">
          <p className="eyebrow">404</p>
          <h1 className="display mt-4 max-w-2xl text-[40px] md:text-[56px]">This page couldn&apos;t be found.</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-muted">
            If you need to move a patient, you don&apos;t need to find the right page — just call us or send a request.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/request-transfer" className={buttonClasses("primary", "lg")}>
              Request medical transfer
            </Link>
            <CallButton placement="404" />
            <Link href="/" className={buttonClasses("ghost", "lg")}>
              Go to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <EmergencyBar />
    </>
  );
}
