import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { splineRobotAttribution } from "@/lib/spline";

export default function Footer() {
  return (
    <footer className="text-muted-foreground my-2 flex flex-col items-center gap-1 text-sm">
      <div>
        © {new Date().getFullYear()}{" "}
        <Button variant="link" className="text-muted-foreground p-0 font-medium">
          <a href={siteConfig.links.footer}>{siteConfig.creator}</a>
        </Button>
      </div>
      <p className="text-xs">
        3D robot:{" "}
        <a
          href={splineRobotAttribution.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {splineRobotAttribution.work}
        </a>{" "}
        by {splineRobotAttribution.creator},{" "}
        <a
          href={splineRobotAttribution.licenseUrl}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {splineRobotAttribution.license}
        </a>
      </p>
    </footer>
  );
}
