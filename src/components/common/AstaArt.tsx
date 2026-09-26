/**
 * Anti-magic artwork filling the left margin, faded into the page: Asta's
 * five-leaf clover painted in dripping red over rising black anti-magic.
 * The images are rendered by scripts/sword/side-art.mjs (one per theme);
 * styles live in globals.css.
 */
export default function AstaArt() {
  return (
    <div className="asta-art" aria-hidden="true">
      <div className="asta-art-img" />
      <div className="asta-art-grain" />
    </div>
  );
}
