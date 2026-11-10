/**
 * Spline 3D scene configuration for the portfolio robot section.
 *
 * The robot in `src/components/robot-section.tsx` is rendered from a
 * *published* Spline scene URL (a `*.splinecode` runtime file). A Spline
 * Community file by itself has no runtime URL — it must first be remixed
 * into your own Spline account and published from there.
 *
 * How to get the URL (about 5–10 minutes, one time only):
 *   1. Create a free account at https://spline.design
 *   2. Open the community file below and choose "Remix" to copy it into
 *      your own workspace.
 *   3. In your copy: File → Export → Public URL (Viewer) and publish.
 *   4. Paste the resulting `https://prod.spline.design/<id>/scene.splinecode`
 *      URL either in `SCENE_URL_FROM_CODE` below, or in the environment
 *      variable `NEXT_PUBLIC_SPLINE_ROBOT_SCENE_URL`.
 *
 * Full walkthrough: `docs/robot-section-setup.md`.
 *
 * License note: the scene is CC BY 4.0 — attribution is required. The
 * credit line is rendered under the canvas in the robot section; keep it.
 */

const SCENE_URL_FROM_CODE =
  "https://prod.spline.design/rWVleq0k2IugueUD/scene.splinecode";

export const splineRobotSceneUrl =
  process.env.NEXT_PUBLIC_SPLINE_ROBOT_SCENE_URL || SCENE_URL_FROM_CODE;

export const splineRobotAttribution = {
  work: "NEXBOT — robot character concept",
  creator: "@aximoris (Maksim Borisov)",
  sourceUrl:
    "https://community.spline.design/file/615b9422-9985-43f6-8593-d7d7bc3b0be1",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
};
