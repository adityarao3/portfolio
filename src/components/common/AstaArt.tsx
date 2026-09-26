/**
 * Asta artwork filling the left margin, faded into the page.
 *
 * Cropped from the banner (day art in light mode, night art in dark mode)
 * and scaled to full height, then toned: an ink-wash grey in light mode,
 * a red-and-black silhouette in dark mode. Styles live in globals.css.
 */
export default function AstaArt() {
  return (
    <div className="asta-art" aria-hidden="true">
      <div className="asta-art-img" />
      <div className="asta-art-tint" />
      <div className="asta-art-grain" />
    </div>
  );
}
