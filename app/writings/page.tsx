import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata = {
  title: "Writings",
  description:
    "Essays on human–technology interaction: dynamics, culture, emotional experience, and perception.",
};

export default function WritingsPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Writings
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
          Human–technology interaction
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Dynamics, culture, emotional experience, perception, and beyond.
        </p>

        <Card className="mt-10">
          <CardHeader>
            <Badge variant="secondary">Medium</Badge>
            <CardTitle className="text-xl">Essays live on Medium</CardTitle>
            <CardDescription>
              The Webflow Writings link pointed at a broken URL. This page owns
              the section and sends readers to the public Medium profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button render={<a href={site.medium} target="_blank" rel="noopener noreferrer" />}>
              Read on Medium
            </Button>
          </CardContent>
        </Card>
      </div>
      <SiteFooter />
    </>
  );
}
