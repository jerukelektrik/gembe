# Ruangguru Organic Leads Slide Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved Ruangguru organic leads and conversion initiative design into a clear Google Slides deck section that WEB & SEO can present to stakeholders.

**Architecture:** The implementation is a presentation content workflow, not a software build. Use the approved design spec as the source of truth, add a concise 8-slide initiative section to the Google Slides deck, and verify that the final deck communicates the baseline, strategy, roadmap, experiments, and quality guardrail without visual overflow.

**Tech Stack:** Google Slides, Codex in-app Browser, approved local Markdown spec, LookerStudio/CSV-derived baseline metrics.

---

## File Structure And Artifacts

**Read:**

- `/Users/armadanurliansyah/Documents/New project/docs/superpowers/specs/2026-06-03-ruangguru-organic-leads-conversion-design.md`

**Modify:**

- Google Slides deck: `https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p`

**Do not modify:**

- Existing local app files in `/Users/armadanurliansyah/Documents/New project`
- Existing Google Slides content outside the new Ruangguru organic initiative section, unless it is an empty placeholder slide intended for this work

**Content source of truth:**

- Use the approved design spec for all metrics, assumptions, initiative pillars, roadmap, and decision rules.

---

### Task 1: Prepare The Final Slide Content Map

**Files:**

- Read: `/Users/armadanurliansyah/Documents/New project/docs/superpowers/specs/2026-06-03-ruangguru-organic-leads-conversion-design.md`
- Modify: none

- [ ] **Step 1: Read the approved design spec**

Run:

```bash
sed -n '1,380p' "/Users/armadanurliansyah/Documents/New project/docs/superpowers/specs/2026-06-03-ruangguru-organic-leads-conversion-design.md"
```

Expected:

- The spec contains the approved January-May 2026 organic baseline.
- The spec states the 3-month roadmap.
- The spec uses Inbound leads-to-paid CR as the lead quality guardrail.

- [ ] **Step 2: Use this exact 8-slide structure**

Create or append the following section in the deck:

```text
Slide 1: Organic Search Needs To Shift From Traffic-Led To Quality-Led Demand Capture
Slide 2: Baseline: Mainsite Converts Better, Blog Owns The Traffic Scale
Slide 3: Success Metrics & Quality Guardrail
Slide 4: Strategy: Prioritize Quality Paths Before Scaling More Demand
Slide 5: Initiative Pillars
Slide 6: 3-Month Roadmap
Slide 7: Candidate Experiments
Slide 8: Weekly Operating Model & Risk Controls
```

Expected:

- The deck section can stand alone as a stakeholder-ready initiative proposal.
- The section does not depend on unexplained operational details.
- The section avoids promising exact uplift targets that were not provided by the user.

- [ ] **Step 3: Keep these content constraints**

Use these constraints when writing the deck:

```text
Audience: Ruangguru internal stakeholders, including Inbound, WEB, and SEO.
Scope: Organic Search only.
Timeframe baseline: January-May 2026.
Assets: Ruangguru mainsite and Blog RG.
Primary goal: Increase organic leads, paid conversion, and organic revenue.
Quality guardrail: Inbound leads-to-paid CR must increase versus baseline.
Tone: Strategic, concise, data-backed, action-oriented.
Language: English for slide titles and core business framing; Indonesian can be used in speaker notes only if needed.
```

Expected:

- Slides are concise enough for presentation use.
- No slide implies that low-quality lead volume is acceptable.

---

### Task 2: Open The Google Slides Deck And Decide Placement

**Files:**

- Modify: Google Slides deck `https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p`

- [ ] **Step 1: Open the deck in the in-app browser**

Open:

```text
https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p
```

Expected:

- Google Slides loads with edit access.
- The active Google account has permission to edit.

- [ ] **Step 2: Inspect the current deck structure**

Check:

```text
1. Count existing slides.
2. Identify whether the current first slide is blank, a title slide, or an existing content slide.
3. Identify whether there is already a Ruangguru WEB & SEO initiative section.
```

Expected:

- If the deck is blank or has a blank first slide, use that slide as Slide 1 and add Slides 2-8 after it.
- If the deck already has content, append the 8-slide section after the currently selected slide.
- Do not delete existing slides.

- [ ] **Step 3: Choose a clean presentation layout**

Use:

```text
Layout: Title + short body, or blank slide with title and grouped content blocks.
Visual style: Clean internal strategy deck, not a marketing landing page.
Data display: Small comparison table or two-column contrast for baseline slide.
Roadmap display: Three columns for Month 1, Month 2, Month 3.
```

Expected:

- Text is readable without overcrowding.
- Each slide has one clear message.

---

### Task 3: Add Slides 1-3 For Problem, Baseline, And Metrics

**Files:**

- Modify: Google Slides deck `https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p`

- [ ] **Step 1: Create Slide 1**

Title:

```text
Organic Search Needs To Shift From Traffic-Led To Quality-Led Demand Capture
```

Body:

```text
Context
Inbound is seeing pressure on lead volume and conversion quality.

What the data suggests
Organic search already brings meaningful demand, especially from Blog RG, but the conversion path is under-optimized.

Strategic shift
Move organic acquisition from traffic-led growth into quality-led demand capture across mainsite and Blog RG.
```

Expected:

- Slide 1 frames the initiative without overloading it with metrics.
- The phrase "quality-led demand capture" is prominent.

- [ ] **Step 2: Create Slide 2**

Title:

```text
Baseline: Mainsite Converts Better, Blog Owns The Traffic Scale
```

Table content:

```text
Metric | Mainsite Organic | Blog RG Organic
Sessions | 674,122 | 10,330,182
Leads | 26,030 | 18,730
Paid conversions | 1,762 | 513
Revenue | Rp1,924,046,425 | Rp496,272,138
Visit-to-lead CR | ~3.86% | ~0.18%
Leads-to-paid CR | ~6.77% | ~2.74%
```

Insight callout:

```text
Blog RG drives massive organic reach, but mainsite currently captures higher-quality demand more efficiently.
```

Expected:

- The table is readable.
- The slide makes the mainsite vs blog contrast clear.
- The baseline timeframe is visible: January-May 2026.

- [ ] **Step 3: Create Slide 3**

Title:

```text
Success Metrics & Quality Guardrail
```

Body:

```text
Primary KPIs
- Organic leads increase
- Organic paid conversion increase
- Organic revenue increase

Quality guardrail
- Inbound leads-to-paid CR must increase vs January-May 2026 baseline

Supporting metrics
- Visit-to-lead CR by landing page
- Leads-to-paid CR by landing page
- Revenue per lead
- Lead split: inbound, outbound, self purchase
- CTA, form, banner, and WhatsApp contribution by page group
```

Expected:

- Stakeholders can immediately see that lead quality is protected.
- The guardrail is not buried under supporting metrics.

---

### Task 4: Add Slides 4-6 For Strategy, Pillars, And Roadmap

**Files:**

- Modify: Google Slides deck `https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p`

- [ ] **Step 1: Create Slide 4**

Title:

```text
Strategy: Prioritize Quality Paths Before Scaling More Demand
```

Body:

```text
Recommended approach
1. Optimize conversion paths on pages that already show healthy paid conversion signals.
2. Segment Blog RG by user intent so CTA, offer, and routing match readiness to buy.
3. Expand product-led SEO pages after validated quick wins.

Why this works
The initiative improves the path from organic intent to the right action: self purchase, inbound consultation, or softer nurture.
```

Expected:

- The strategy explains why WEB & SEO should not simply add more CTA volume everywhere.

- [ ] **Step 2: Create Slide 5**

Title:

```text
Initiative Pillars
```

Body:

```text
1. Organic Lead Quality Scorecard
Rank pages by sessions, leads, paid conversion, leads-to-paid CR, revenue per lead, and inbound contribution.

2. High-Intent Conversion Path Optimization
Refresh CTA, banner, form, WhatsApp routing, copy, and product recommendation on high-signal pages.

3. Blog Intent Segmentation
Group content into informational, exam/tryout, product-adjacent, and high-intent pages.

4. Product-Led SEO Expansion
Build or optimize pages closer to purchase intent across all products.

5. Inbound Feedback Loop Lite
Collect simple reasons why leads are poor fit and feed that back into page scoring and routing.
```

Expected:

- The slide gives a complete initiative menu without turning into a dense operations manual.

- [ ] **Step 3: Create Slide 6**

Title:

```text
3-Month Roadmap
```

Three-column roadmap:

```text
Month 1: Fix & Focus
- Build organic funnel baseline by asset, page, lead channel, and conversion type
- Create landing page scorecard
- Optimize CTA, banner, form, and WhatsApp routing on priority pages
- Clean up tracking taxonomy

Month 2: Segment & Experiment
- Classify pages by intent
- Run CTA and offer experiments by segment
- Reduce aggressive inbound capture on low-intent pages
- Strengthen self-purchase path for high-intent pages

Month 3: Scale & Product-Led Growth
- Scale winning CTA, routing, and self-purchase patterns
- Create or optimize product-led SEO pages
- Improve internal linking from high-traffic blog pages
- Build organic lead quality playbook
```

Expected:

- The roadmap fits on one slide.
- Each month has a distinct strategic job.

---

### Task 5: Add Slides 7-8 For Experiments And Operating Model

**Files:**

- Modify: Google Slides deck `https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p`

- [ ] **Step 1: Create Slide 7**

Title:

```text
Candidate Experiments
```

Body:

```text
1. Organic Landing Page Scorecard
Classify pages into optimize, scale, nurture, or deprioritize.

2. High-Intent CTA & WhatsApp Routing Refresh
Replace generic CTAs with page-specific conversion paths.

3. Blog Intent-Based Banner System
Match banners and offers to exam/tryout, product-related, promo, and informational content.

4. Organic Product Recommendation Entry Point
Pre-qualify users before sending them to inbound consultation.

5. High-Intent SEO Landing Pages
Create or optimize pages for grade, exam prep, trial, promo, comparison, and learning needs.

6. Inbound Feedback Loop Lite
Collect lightweight feedback on why leads are poor fit.
```

Expected:

- The slide lists concrete work the WEB & SEO team can start.
- The experiments are not framed as guaranteed uplifts.

- [ ] **Step 2: Create Slide 8**

Title:

```text
Weekly Operating Model & Risk Controls
```

Body:

```text
Weekly rhythm
- Review top organic pages by traffic, leads, paid conversion, leads-to-paid CR, revenue per lead, and inbound contribution
- Select pages to optimize, scale, nurture, or deprioritize
- Review experiment performance by intent segment
- Capture simple Inbound feedback on lead quality
- Decide whether to scale, revise, or stop each experiment

Risk controls
- Do not scale tactics that increase leads while lowering Inbound leads-to-paid CR
- Avoid aggressive direct inbound CTA on broad informational pages
- Keep high-intent pages open to both consultation and self purchase
```

Expected:

- Slide 8 makes the operating cadence and quality control explicit.
- The last slide gives stakeholders confidence that the team can manage lead quality.

---

### Task 6: Verify The Deck Section

**Files:**

- Read and verify: Google Slides deck `https://docs.google.com/presentation/d/1_deqye5HgixNFfQ-fQ8PYm2rbc_-ptmblOCy7SveSt8/edit?slide=id.p#slide=id.p`
- Read: `/Users/armadanurliansyah/Documents/New project/docs/superpowers/specs/2026-06-03-ruangguru-organic-leads-conversion-design.md`

- [ ] **Step 1: Verify baseline numbers**

Check that Slide 2 uses exactly:

```text
Mainsite Organic:
Sessions 674,122
Leads 26,030
Paid conversions 1,762
Revenue Rp1,924,046,425
Visit-to-lead CR ~3.86%
Leads-to-paid CR ~6.77%

Blog RG Organic:
Sessions 10,330,182
Leads 18,730
Paid conversions 513
Revenue Rp496,272,138
Visit-to-lead CR ~0.18%
Leads-to-paid CR ~2.74%
```

Expected:

- No metric differs from the approved spec.
- The baseline timeframe appears as January-May 2026.

- [ ] **Step 2: Verify quality guardrail**

Check:

```text
Slide 3 includes: Inbound leads-to-paid CR must increase vs January-May 2026 baseline.
Slide 8 includes: Do not scale tactics that increase leads while lowering Inbound leads-to-paid CR.
```

Expected:

- The quality guardrail appears in both measurement and operating model contexts.

- [ ] **Step 3: Verify slide readability**

Review every slide at normal presentation zoom:

```text
1. No text overlaps.
2. No body copy is cut off.
3. Titles are readable.
4. Tables and roadmap columns fit inside slide boundaries.
5. Each slide has one main message.
```

Expected:

- The deck can be presented without needing speaker explanation for every bullet.

- [ ] **Step 4: Final user-facing summary**

Prepare this summary for the user:

```text
Saya sudah menambahkan section initiative ke Google Slides: 8 slides covering diagnosis, baseline, success metrics, strategy, initiative pillars, 3-month roadmap, experiments, and operating model. Saya juga cek ulang angka baseline dan guardrail kualitas Inbound leads-to-paid CR.
```

Expected:

- The user knows what changed and what was verified.

