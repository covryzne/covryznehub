import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="site-copyright" aria-label="Portfolio footer">
      <p>&copy; 2026 {siteConfig.creator}</p>
    </footer>
  );
}
