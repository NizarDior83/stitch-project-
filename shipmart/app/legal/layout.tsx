import type { ReactNode } from "react";
import { Shell } from "@/components/layout/Shell";

export default function LegalLayout({ children }: { readonly children: ReactNode }) {
  return <Shell>{children}</Shell>;
}
