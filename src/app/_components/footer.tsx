import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="site-copyright" aria-label="Portfolio footer">
      <p>&copy; {new Date().getFullYear()} {siteConfig.creator}</p>
    </footer>
  );
}
