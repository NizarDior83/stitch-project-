import { Shell } from "@/components/layout/Shell";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Shell>
      <Container className="py-stack-xl">
        <div className="max-w-2xl">
          <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-primary mb-stack-sm">404</p>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-md">
            That page is not here.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
            The link may be old, or it may have a typo. If you were looking for a parcel, tracking is the
            fastest way in.
          </p>
          <div className="flex flex-wrap gap-stack-md">
            <ButtonLink href="/track">Track a parcel</ButtonLink>
            <ButtonLink href="/" tone="secondary">Go to the homepage</ButtonLink>
          </div>
        </div>
      </Container>
    </Shell>
  );
}
