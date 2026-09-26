"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { buttonClasses } from "@/components/ui/Button";
import { inputClass } from "@/components/forms/StepUI";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-[14.5px] font-medium">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      {state?.error ? <p className="text-[14px] text-coral-600">{state.error}</p> : null}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full")}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
