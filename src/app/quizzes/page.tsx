import { redirect } from "next/navigation";

/** Legacy URL — canonical test hub lives at `/tests`. */
export default function QuizzesRedirectPage() {
  redirect("/tests");
}
