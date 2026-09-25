"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";
import { loginAction, type EditorState } from "./actions";

const initialState: EditorState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return <form action={action} className="mt-8 space-y-4">
    <label className="block text-[11px] font-semibold tracking-wide" htmlFor="password">EDITOR PASSWORD</label>
    <input autoFocus required type="password" name="password" id="password" autoComplete="current-password" className="focus-ring w-full rounded-none border border-[#c8c9bf] bg-white/70 px-4 py-3.5 text-[13px] outline-none" placeholder="Your private password" />
    {state.error && <p role="alert" className="text-[12px] text-[#a94e36]">{state.error}</p>}
    <button disabled={pending} className="focus-ring flex w-full items-center justify-center gap-2 bg-[#1f403c] px-5 py-4 text-[10px] font-semibold tracking-[.16em] text-white transition hover:bg-[#c86b4a] disabled:opacity-60"><KeyRound size={14} />{pending ? "CHECKING…" : "UNLOCK THE JOURNAL"}</button>
  </form>;
}
