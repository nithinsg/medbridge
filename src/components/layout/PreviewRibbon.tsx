import { site } from "@/config/site";

/** Shown until NEXT_PUBLIC_LAUNCH_READY=true — protects real users from placeholder numbers. */
export function PreviewRibbon() {
  if (site.launchReady) return null;
  return (
    <div className="bg-warning-50 text-warning-700 border-b border-warning-500/30 text-center text-[13px] leading-snug px-4 py-2">
      <strong className="font-semibold">Preview site.</strong> Contact numbers are placeholders and requests are not yet
      monitored. In a medical emergency, call <a className="underline font-semibold" href="tel:112">112</a> or{" "}
      <a className="underline font-semibold" href="tel:108">108</a>.
    </div>
  );
}
