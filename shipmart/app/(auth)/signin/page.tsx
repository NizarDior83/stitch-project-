import type { Metadata } from "next";
import { SignInForm } from "@/components/product/Forms";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage shipments, quotes and tracking.",
  alternates: { canonical: "/signin" },
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <>
      <div className="mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Welcome back</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Sign in to manage your shipments and track progress.
        </p>
      </div>
      <SignInForm />
    </>
  );
}
