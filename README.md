# STEM Racing Season 9 — The British School New Delhi

Recruitment site for STEM Racing Season 9. Single static page, no build step, no dependencies.

Students land here from the recruitment poster, read what a season actually involves, work through the judging rubric, self-score their proposal, then apply.

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | The whole site. Styles and script are inline, so it can be dropped on any static host. |
| `STEM_Racing_Season9_Proposal_Rubric.pdf` | Printable rubric, linked from the hero. Also given to the panel as a scoring sheet. |
| `Create_Season9_Form.gs` | Google Apps Script that builds the proposal Google Form and its responses sheet. |

## Before this goes live

1. **Create the form.** Open [script.google.com](https://script.google.com), new project, paste in `Create_Season9_Form.gs`, set the three variables at the top, hit Run. The execution log prints the live form URL.
2. **Wire the form URL in.** There are four occurrences of the `PROPOSAL_FORM_URL` placeholder in `index.html`:

   ```bash
   sed -i '' 's|PROPOSAL_FORM_URL|https://forms.gle/YOURCODE|g' index.html
   ```

   (drop the `''` after `-i` on Linux)
3. **Check the closing date.** It appears in three places: the `CLOSING` constant in the script block, the `#closeDate` element, and the footer. The countdown is computed live from `CLOSING`.
4. **Add the short link to the poster.** Print it as a QR code, not a URL. Nobody types a URL off a noticeboard.

## Deploying on GitHub Pages

Push to `main`, then in the repository go to **Settings → Pages** and set the source to `main` / `/ (root)`. The site appears at `https://<user>.github.io/<repo>/` within a minute or two.

No `.nojekyll` is needed since nothing here starts with an underscore.

## Editing the rubric

The criteria live in the `CRITERIA` array near the top of the script block in `index.html`. Each entry has a title, the form section it is assessed from, and four bands ordered Limited → Exceptional.

`BAND_VALUE` sets the marks the self-scorer awards per band. It uses the midpoint of each range, so the total is indicative rather than exact. The panel marks the full 0 to 20 range.

If you change the criteria here, change the PDF to match. They are the same document to a student.

## Contacts

- Ms Sonica Puri, Head of STEM Racing — sonica.puri@british-school.org
- Reyansh Gupta, Student Mentor — reyansh.gupta@british-school.org
