import { readFileSync } from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Every page in the sitemap, as a path: "/", "/projects", "/projects/gridlock", ...
const sitemap = readFileSync(path.join(__dirname, "../out/sitemap.xml"), "utf8");
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const WIDTHS = [375, 1440];

/** Scrolls to the bottom in viewport steps so scroll-triggered content gets a chance to run. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
}

/** Rendered text elements a reader can't see because they or an ancestor are transparent. */
function invisibleText(page: Page) {
  return page.evaluate(async () => {
    // Entrance animations (hero fade-up etc.) run without JS too; judge their end state.
    const finite = document
      .getAnimations()
      .filter((a) => a.timeline instanceof DocumentTimeline && a.effect?.getComputedTiming().endTime !== Infinity);
    await Promise.all(finite.map((a) => a.finished.catch(() => {})));
    const hidden: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("main :is(h1, h2, h3, p, li)")) {
      if (!el.textContent?.trim() || el.closest("[aria-hidden=true]")) continue;
      // display:none and visibility:hidden are deliberate (responsive variants, closed tooltips);
      // a stuck fade leaves text rendered but transparent.
      if (el.getClientRects().length === 0 || getComputedStyle(el).visibility === "hidden") continue;
      let opacity = 1;
      for (let n: HTMLElement | null = el; n; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
      if (opacity < 0.05) {
        hidden.push(`<${el.tagName.toLowerCase()}> ${el.textContent.trim().slice(0, 60)}`);
      }
    }
    return hidden;
  });
}

for (const url of pages) {
  test.describe(`page ${url}`, () => {
    test.describe("without JavaScript", () => {
      test.use({ javaScriptEnabled: false });

      test("all text is visible", async ({ page }) => {
        await page.goto(url);
        await expect(page.locator("h1")).toBeVisible();
        expect(await invisibleText(page)).toEqual([]);
      });
    });

    test("reveal never leaves content hidden after scrolling", async ({ page }) => {
      await page.goto(url);
      await scrollThrough(page);
      await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0, { timeout: 2000 });
    });

    test.describe("with reduced motion", () => {
      test.use({ reducedMotion: "reduce" });

      test("nothing is hidden or animating", async ({ page }) => {
        await page.goto(url);
        await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0);
        await scrollThrough(page);
        const animating = await page.evaluate(() =>
          document
            .getAnimations()
            .filter((a) => {
              const t = a.effect?.getComputedTiming();
              return a.playState === "running" && (t?.iterations === Infinity || Number(t?.duration) > 1);
            })
            .map((a) => (a as CSSAnimation).animationName ?? a.constructor.name),
        );
        expect(animating).toEqual([]);
      });

      test("passes axe WCAG 2.1 AA checks", async ({ page }) => {
        await page.goto(url);
        await scrollThrough(page);
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
        expect(summary).toEqual([]);
      });
    });

    for (const width of WIDTHS) {
      test(`no horizontal scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(url);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the archive lists every project", async ({ page }) => {
    // <Codex> reads the URL, which a static export can't know; the unfiltered list must be the fallback.
    await page.goto("/projects");
    for (const url of pages.filter((p) => p.startsWith("/projects/"))) {
      await expect(page.locator(`main a[href="${url}"]`).first()).toBeVisible();
    }
  });
});

test("unknown pages get the 404 page", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
});
