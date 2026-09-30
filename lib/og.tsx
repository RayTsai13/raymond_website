import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Fetch a Google font as TTF for Satori; falls back to the default font if offline. */
async function loadFont(family: string, weight: number, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return undefined;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return undefined;
  }
}

/** Day-theme share card: ivory, gold double frame, inscription title. */
export async function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const font = await loadFont("Cinzel", 600, `${eyebrow}${title}${subtitle}RT·`);
  const gold = "#c9a45c";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 20%, #fffdf8, #f4eee2 75%)",
          fontFamily: font ? "Cinzel" : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: `2px solid ${gold}`,
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", inset: 38, border: `1px solid ${gold}88`, display: "flex" }} />
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: 9999,
            border: `1.5px solid ${gold}55`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: 9999,
            border: `1px dashed ${gold}55`,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 120px" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 9999,
              border: `3px solid ${gold}`,
              background: "#fffdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              color: "#7a5c24",
            }}
          >
            RT
          </div>
          <div style={{ marginTop: 28, fontSize: 22, letterSpacing: 6, color: "#7a5c24" }}>{eyebrow.toUpperCase()}</div>
          <div style={{ marginTop: 12, fontSize: 76, letterSpacing: 4, color: "#1f1a14", lineHeight: 1.05 }}>
            {title.toUpperCase()}
          </div>
          <div style={{ marginTop: 20, fontSize: 26, letterSpacing: 2, color: "#4a4238" }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: font ? [{ name: "Cinzel", data: font, weight: 600, style: "normal" }] : undefined,
    },
  );
}
