/**
 * Spline 3D scene configuration for the hero robot background.
 *
 * The robot in `src/app/_sections/hero/hero-robot-background.tsx` is rendered
 * from a *published* Spline scene URL (a `*.splinecode` runtime file).
 * A Spline Community file by itself has no runtime URL — it must first
 * be remixed into your own Spline account and published from there.
 *
 * The URL below can be overridden with the environment variable
 * `NEXT_PUBLIC_SPLINE_ROBOT_SCENE_URL`.
 *
 * Full walkthrough: `docs/robot-section-setup.md`.
 *
 * Origin note: the scene is a remix of "NEXBOT — robot character
 * concept" by @aximoris (Maksim Borisov), Spline Community file
 * 615b9422-9985-43f6-8593-d7d7bc3b0be1, licensed CC BY 4.0. Per the
 * site owner's decision (Nov 2026), no attribution line is displayed.
 */

const SCENE_URL_FROM_CODE =
  "https://prod.spline.design/rWVleq0k2IugueUD/scene.splinecode";

export const splineRobotSceneUrl =
  process.env.NEXT_PUBLIC_SPLINE_ROBOT_SCENE_URL || SCENE_URL_FROM_CODE;
