import type { Metadata } from "next";
import { SignUpForm } from "@/components/product/Forms";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Open a Shipmart account and get your first landed-cost quote.",
  alternates: { canonical: "/signup" },
};

export default function SignUpPage() {
  return (
    <>
      <div className="mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Create your account</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          No card required. You can price a parcel before you commit to anything.
        </p>
      </div>
      <SignUpForm />
    </>
  );
}
