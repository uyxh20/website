import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight">
          This page is not here
        </h1>
        <p className="mt-3 text-muted-foreground">
          Try the interactive work, the research archive, or writings.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button render={<Link href="/" />}>Work</Button>
          <Button variant="outline" render={<Link href="/background" />}>
            Background
          </Button>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
