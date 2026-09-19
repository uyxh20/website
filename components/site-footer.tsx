import { Separator } from "@/components/ui/separator";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {site.name}. {site.tagline}.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a className="hover:text-foreground" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <a
            className="hover:text-foreground"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
