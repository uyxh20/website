import { ArchiveView } from "@/components/archive-view";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Background",
  description:
    "User research, program management, communication, and ops work by Ulysse Ha — owned from the previous Webflow site.",
};

export default function BackgroundPage() {
  return (
    <>
      <ArchiveView />
      <SiteFooter />
    </>
  );
}
