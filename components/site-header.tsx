"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Primary">
      {nav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span
            className="size-2.5 shrink-0 rounded-full bg-[#27a56f] shadow-[8px_0_0_#dff2a6]"
            aria-hidden
          />
          <span className="truncate text-sm font-semibold tracking-tight">
            {site.name}
          </span>
          <span className="hidden truncate text-xs text-muted-foreground sm:inline">
            {site.role}
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLinks />
          <Button size="sm" render={<a href={`mailto:${site.email}`} />}>
            Contact
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>{site.shortName}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-4">
              {nav.map((item) => (
                <SheetClose
                  key={item.href}
                  render={<Link href={item.href} className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted" />}
                >
                  {item.label}
                </SheetClose>
              ))}
              <SheetClose
                render={
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-primary"
                  />
                }
              >
                Contact
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
