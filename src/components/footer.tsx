import { siteConfig } from "@/lib/site-config";
export default function Footer() {
  return (
    <footer className="lab-footer">
      <div>
        <p className="eyebrow mb-3">SYS.06 // END</p>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-foreground">{siteConfig.creator}</span>
        </p>
      </div>
      <a href="#home" className="footer-wordmark" aria-label="Back to Home">
        shendi<span>.</span>
      </a>
    </footer>
  );
}
