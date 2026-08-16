# STEM Racing Season 9 — The British School New Delhi

Recruitment site for STEM Racing Season 9. Single static page, no build step, no dependencies, no web fonts.

Students land here from the recruitment poster, read what a season actually involves, work through the judging rubric, score their own proposal against it, then apply.

**Live:** https://sudo-reyanshiscool.github.io/STEMracing-signup/

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | The whole site. Styles and script are inline, so it can be dropped on any static host. |
| `STEM_Racing_Season9_Proposal_Rubric.pdf` | Printable rubric, linked from the hero as a download. Also given to the panel as a scoring sheet. |
| `rubric/rubric.html` | Source document for that PDF. |
| `rubric/build.sh` | Renders `rubric/rubric.html` to the PDF via headless Chrome. |
| `Create_Season9_Form.gs` | Google Apps Script that builds the proposal Google Form and its responses sheet. |

## Design

Both documents follow one set of principles, adapted from Apple's interface and
motion design talks.

On the site, that mostly shows up in how things move. Anything a finger can
touch is driven by a **spring** rather than a fixed-duration animation, so it
can be grabbed and reversed mid-flight. The judging sheet is the clearest case:
each criterion is a segmented control you can **drag**, and the thumb tracks
your finger 1:1, resists progressively past either end instead of stopping
dead, and on release is thrown to the band nearest where the gesture was
actually heading — the release velocity is handed to the spring, so there is no
seam between dragging and animating. The score and the meter are springs too,
so they move continuously as you drag rather than jumping when you let go.
Buttons respond on pointer-**down**, never on release.

Everything else follows from restraint: the platform's own system font (already
optically sized and tracked), tracking that tightens as type grows and sits at
zero for body copy, translucent chrome with the page scrolling underneath, and
depth carried by material weight rather than borders.

Three accessibility preferences are honoured independently — `prefers-reduced-motion`
(springs become short cross-fades; dragging still tracks 1:1, since that is
direct manipulation and not vestibular), `prefers-reduced-transparency`
(materials go solid) and `prefers-contrast` (near-solid surfaces, defined
borders). Light and dark both ship; the page follows the system setting.

Print has no motion and no materials, so the PDF inherits only the typography
and the restraint. Its pages are laid out explicitly rather than reflowed, so
every page break is a decision.

## Rebuilding the PDF

The PDF is committed to the repository and linked as a download — it is not
generated in the browser, and there is no print-this-page flow anywhere on the
site. After editing `rubric/rubric.html`:

```bash
./rubric/build.sh
```

It renders A4 via headless Chrome and overwrites
`STEM_Racing_Season9_Proposal_Rubric.pdf` in the repository root. Commit the
regenerated PDF alongside the source. Check all four pages afterwards — the
pages are fixed-height and clip anything that overruns, so content that grows
can be pushed off the bottom.

If you change the criteria in `index.html`, change the PDF to match. They are
the same document to a student.

## Editing the rubric

The criteria live in the `CRITERIA` array in the script block in `index.html`.
Each entry has a title, the form section it is assessed from, and four bands
ordered Limited → Exceptional.

`BAND_VALUE` sets the marks the self-scorer awards per band. It uses the
midpoint of each range, so the self-score is indicative rather than exact. The
panel marks the full 0 to 20 range.

## Before this goes live

1. **The form is wired in.** `https://forms.gle/PWturVPApADCfFQA7` appears in
   three places in `index.html`. To change it:

   ```bash
   sed -i '' 's|https://forms.gle/PWturVPApADCfFQA7|https://forms.gle/NEWCODE|g' index.html
   ```

   (drop the `''` after `-i` on Linux)
2. **Recreating the form.** Open [script.google.com](https://script.google.com),
   new project, paste in `Create_Season9_Form.gs`, set the three variables at
   the top, hit Run. The execution log prints the live form URL.
3. **Check the closing date.** It appears in the `CLOSING` constant in the
   script block, the `#closeDate` element and the footer of `index.html`, and in
   `rubric/rubric.html`. The countdown is computed live from `CLOSING`.
4. **Add the short link to the poster.** Print it as a QR code, not a URL.
   Nobody types a URL off a noticeboard.

## Deploying

GitHub Pages is enabled on `main` / `/ (root)`. Pushing to `main` republishes
within a minute or two. No `.nojekyll` is needed since nothing here starts with
an underscore.

## Known limitation

The judging sheet is built by JavaScript, so with scripting disabled the site
shows everything except the interactive sheet. Anyone in that position still
gets the full rubric from the PDF, which is linked in the hero. Every other
section is plain HTML and renders without script.

## Contacts

- Ms Sonica Puri, Head of STEM Racing — sonica.puri@british-school.org
- Reyansh Gupta, Student Mentor — reyansh.gupta@british-school.org
