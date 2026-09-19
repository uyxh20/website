import { PortfolioFrame } from "@/components/portfolio-frame";
import { site } from "@/lib/site";

export const metadata = {
  title: "Work",
  description: site.description,
};

export default function HomePage() {
  return <PortfolioFrame />;
}
