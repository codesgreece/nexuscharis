import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Regression guards for the production refresh crash:
 * Safari/WebKit kills the tab when SVG feTurbulence is used as a tiled CSS
 * background across many sections, and when endless RAF fights CSS
 * transform transitions.
 */
describe("refresh crash safeguards", () => {
  it("uses static PNG grain instead of live SVG filter backgrounds", () => {
    const stripComments = (css: string) =>
      css.replace(/\/\*[\s\S]*?\*\//g, "");

    const globals = stripComments(readFileSync(resolve("src/app/globals.css"), "utf8"));
    const autumn = stripComments(
      readFileSync(resolve("src/components/effects/AutumnAtmosphere.module.css"), "utf8"),
    );

    expect(globals).not.toMatch(/feTurbulence/);
    expect(autumn).not.toMatch(/feTurbulence/);
    expect(globals).not.toMatch(/data:image\/svg\+xml/);
    expect(autumn).not.toMatch(/data:image\/svg\+xml/);
    expect(globals).toMatch(/noise-grain\.png/);
    expect(autumn).toMatch(/noise-grain\.png/);
  });

  it("does not put CSS transform transitions on RAF-driven stages", () => {
    const greece = readFileSync(
      resolve("src/components/sections/GreeceCoverageMap.module.css"),
      "utf8",
    );
    const faq = readFileSync(
      resolve("src/components/sections/FaqNexusGraphic.module.css"),
      "utf8",
    );

    const stageBlock = (css: string) => {
      const match = css.match(/\.stage\s*\{[^}]+\}/);
      expect(match).toBeTruthy();
      return match![0];
    };

    expect(stageBlock(greece)).not.toMatch(/transition:\s*transform/);
    expect(stageBlock(greece)).not.toMatch(/will-change:\s*transform/);
    expect(stageBlock(faq)).not.toMatch(/transition:\s*transform/);
    expect(stageBlock(faq)).not.toMatch(/will-change:\s*transform/);
  });

  it("keeps idle-gated parallax helper available", () => {
    const hook = readFileSync(resolve("src/hooks/usePointerParallax.ts"), "utf8");
    expect(hook).toMatch(/IDLE_EPSILON/);
    expect(hook).toMatch(/IntersectionObserver/);
    expect(hook).toMatch(/cancelAnimationFrame/);
  });
});
