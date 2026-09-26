import { LogoMark } from "@/components/brand/Logo";
import { adminPassword } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLogin() {
  const enabled = Boolean(adminPassword());
  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-[var(--radius-panel)] bg-white p-8 ring-1 ring-mist-200">
        <LogoMark className="h-10 w-10" />
        <h1 className="mt-6 text-[24px] font-semibold tracking-tight">MedBridge Command Centre</h1>
        <p className="mt-1 text-[14.5px] text-ink-muted">Authorised staff only.</p>
        {enabled ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-xl bg-warning-50 p-4 text-[14px] text-warning-700">
            Admin is disabled. Set <code className="font-mono">ADMIN_PASSWORD</code> in the environment to enable it.
          </p>
        )}
      </div>
    </div>
  );
}
