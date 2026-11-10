/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require(process.env.DUSK_PLAYWRIGHT_MODULE || "playwright");
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict");
const base = process.env.DUSK_BASE_URL || "http://localhost:3000",
  dir = __dirname;
(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--enable-unsafe-swiftshader"],
  });
  const result = { matrix: [], reading: [], axe: [], errors: [], checks: [] };
  try {
    const p = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
    });
    p.on("pageerror", (e) => result.errors.push(e.message));
    await p.goto(base, { waitUntil: "domcontentloaded" });
    await p.evaluate(() => document.fonts.ready);
    const theme = async (mode) => {
      if (!(await p.locator("html").getAttribute("class")).includes(mode))
        await p.getByRole("button", { name: "Toggle day / night theme" }).click();
      await p.waitForTimeout(400);
    };
    for (const mode of ["dark", "light"]) {
      await theme(mode);
      for (const width of [320, 375, 390, 768, 1024, 1440]) {
        await p.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        await p.waitForTimeout(150);
        const values = await p.evaluate(() => {
          const s = document.querySelector(".content-sheet"),
            cs = getComputedStyle(s),
            band = document.querySelector(".skills-band"),
            last = band.querySelector(".marquee-list").getBoundingClientRect();
          return {
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            sheetRadius: cs.borderTopLeftRadius,
            sheetMargin: cs.marginTop,
            paper: cs.backgroundColor,
            marqueeClear: last.bottom <= s.getBoundingClientRect().top,
            footerOutside: !document.querySelector("footer").closest(".content-sheet"),
            containerWidth: document
              .querySelector(".content-sheet>.site-container")
              .getBoundingClientRect().width,
          };
        });
        assert.equal(values.width, values.scrollWidth);
        assert.equal(values.sheetRadius, "40px");
        assert.equal(values.sheetMargin, "-16px");
        assert(values.marqueeClear);
        assert(values.footerOutside);
        const expected = Math.min(
          1200,
          width - (width >= 1024 ? 96 : width >= 768 ? 64 : width >= 640 ? 48 : 40),
        );
        assert(Math.abs(values.containerWidth - expected) < 1);
        result.matrix.push({ mode, ...values });
      }
    }
    result.checks.push(
      "R1: paper, radius, overlap, marquee clearance and unchanged inner widths in 12 theme/width cases",
    );
    await p.emulateMedia({ reducedMotion: "no-preference" });
    for (const width of [1440, 390]) {
      await p.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await p.waitForTimeout(200);
      for (const index of [0, 2, 5]) {
        await p
          .locator(".experience-row")
          .nth(index)
          .evaluate((el) => {
            const r = el.getBoundingClientRect();
            scrollTo({
              top: scrollY + r.top + r.height / 2 - innerHeight / 2,
              behavior: "instant",
            });
          });
        await p.waitForFunction(
          (i) => document.querySelectorAll(".experience-row")[i].dataset.readingActive === "true",
          index,
        );
        await p.waitForTimeout(500);
        const rowState = await p
          .locator(".experience-list")
          .evaluate((el) => ({
            active: Array.from(el.querySelectorAll(".experience-row")).findIndex(
              (row) => row.dataset.readingActive === "true",
            ),
            count: el.querySelectorAll('[data-reading-active="true"]').length,
            opacity: Array.from(el.querySelectorAll(".experience-row")).map(
              (row) => getComputedStyle(row).opacity,
            ),
          }));
        assert.equal(rowState.active, index);
        assert.equal(rowState.count, 1);
        assert.equal(rowState.opacity[index], "1");
        assert(rowState.opacity.some((x) => Number(x) < 1));
        result.reading.push({ width, index, ...rowState });
      }
      await p
        .locator(".experience-row")
        .nth(1)
        .evaluate((el) =>
          scrollTo({ top: el.getBoundingClientRect().top + scrollY - 250, behavior: "instant" }),
        );
      await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(dir, `r5-reading-${width}.png`) });
    }
    result.checks.push(
      "R5: reading highlight follows rows 1, 3 and 6 at desktop/phone; one active row at a time",
    );
    await p.setViewportSize({ width: 1440, height: 1000 });
    await p.addScriptTag({
      path: require.resolve("axe-core/axe.min.js", { paths: [process.cwd()] }),
    });
    for (const mode of ["dark", "light"]) {
      await theme(mode);
      await p
        .locator(".experience-row")
        .nth(1)
        .evaluate((el) => {
          const r = el.getBoundingClientRect();
          scrollTo({ top: r.top + scrollY + r.height / 2 - innerHeight / 2, behavior: "instant" });
        });
      await p.waitForTimeout(500);
      const audit = await p.evaluate(
        async () =>
          await axe.run(document.querySelector("#experience"), {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          }),
      );
      result.axe.push({
        mode,
        scope: "experience",
        violations: audit.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      });
    }
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForTimeout(150);
    assert(
      await p
        .locator(".experience-row")
        .evaluateAll((rows) =>
          rows.every(
            (row) =>
              getComputedStyle(row).opacity === "1" && !row.hasAttribute("data-reading-active"),
          ),
        ),
    );
    result.checks.push("R5 reduced motion: observer highlight removed and all rows fully bright");
    await p.locator("footer").scrollIntoViewIfNeeded();
    await p.waitForTimeout(150);
    assert.equal(
      await p.locator(".footer-beam").evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    assert(
      await p
        .locator(".footer-display-wordmark")
        .evaluate(
          (el) =>
            el.getAttribute("aria-hidden") === "true" &&
            getComputedStyle(el).pointerEvents === "none",
        ),
    );
    await p.emulateMedia({ reducedMotion: "no-preference" });
    await p.waitForTimeout(200);
    assert.equal(
      await p.locator(".footer-beam").evaluate((el) => getComputedStyle(el).animationName),
      "footer-beam-sweep",
    );
    await p.locator("#about").scrollIntoViewIfNeeded();
    await p.waitForTimeout(150);
    assert.equal(
      await p.locator(".footer-beam").evaluate((el) => getComputedStyle(el).animationPlayState),
      "paused",
    );
    result.checks.push("R3: decorative semantics, reduced-motion static beam and off-screen pause");
    await p.locator("footer").scrollIntoViewIfNeeded();
    await p.getByRole("link", { name: "Back to Home", exact: true }).click();
    await p.waitForFunction(() => scrollY < 10);
    result.checks.push("Footer Back to Home link preserved");
    await p.getByRole("button", { name: "Open Assistant" }).click();
    assert(
      await p
        .locator(".chat-panel")
        .evaluate(
          (el) => el.parentElement === document.body && getComputedStyle(el).zIndex === "10000",
        ),
    );
    await p.getByRole("button", { name: "Close", exact: true }).click();
    result.checks.push("Chat body portal remains above sheet and footer");
    console.log(JSON.stringify(result, null, 2));
    assert(
      result.axe.every((x) => x.violations.length === 0),
      "Experience contrast/accessibility issues",
    );
    assert.equal(result.errors.length, 0);
  } finally {
    fs.writeFileSync(path.join(dir, "results.json"), JSON.stringify(result, null, 2));
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
