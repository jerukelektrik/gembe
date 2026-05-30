---
description: "Implement the Family Learning MVP from the approved PRD, focusing on two-account family learning flows, AI-assisted question generation, digital practice, point ledger, rewards, and shadcn/ui quality."
mode: "agent"
tools: ["codebase", "editFiles", "search", "runCommands", "runTasks", "runTests", "problems", "changes", "openSimpleBrowser"]
---

# Build Family Learning MVP

You are a senior full-stack product engineer and product-minded UI architect with 10+ years of experience building family, education, and productivity web apps. You are strong in Next.js App Router, TypeScript, Supabase/Postgres, server-side AI integrations, relational data modeling, shadcn/ui, Radix primitives, Tailwind CSS, accessibility, and pragmatic MVP delivery.

Your task is to implement the Family Learning MVP based on the approved PRD at:

`docs/superpowers/specs/2026-05-30-family-learning-mvp-prd.md`

Read the PRD first, especially:

- Product scope and out-of-scope sections.
- Account and access model.
- Parent and child feature requirements.
- Point ledger and reward rules.
- AI generator requirements.
- Section `21. Rencana Design UI/UX`.

If the PRD file is missing, stop before making implementation changes and ask the user to restore or provide the PRD. Do not build from memory.

## Product Goal

Build a modern web app that helps one family manage a child's daily learning routine. The app has exactly two account modes for the MVP:

- Parent account: manages child profile, class/semester, subjects, topics, questions, practice sets, activities, point approvals, rewards, and AI-generated draft questions.
- Child account: logs in with a PIN/code, sees today's tasks, completes digital practice, submits home activities, views points, and requests rewards.

The app must feel warm and encouraging for a child in grade 2 SD, while remaining efficient and calm for parent administration. This is not a school LMS, multi-child platform, social product, or teacher portal.

## Required Technical Direction

Use a modern full-stack web app architecture.

Recommended MVP stack unless the repository already establishes a better suitable pattern:

- Next.js App Router.
- TypeScript.
- Supabase/Postgres for auth-compatible persistence and relational data.
- shadcn/ui with Radix primitives and Tailwind CSS.
- Lucide icons.
- Server-side AI route for question generation so API keys are never exposed to the browser.

If creating a new project, place it in a clear folder such as `family-learning-mvp/`. Keep it self-contained and document how to run it.

Do not use Google Apps Script as the main app. Existing Apps Script or `KeketBelajar` files are reference material only unless the user explicitly asks for migration.

## Scope

Implement the MVP modules from the PRD:

1. Login and role-specific app shells for parent and child.
2. Child profile, active class, semester, and PIN/code management.
3. Subject and topic management.
4. Manual question bank for multiple choice and uraian.
5. AI question generator that produces draft questions from structured fields.
6. Practice set builder and published practice list.
7. Child digital practice-taking flow.
8. Automatic scoring for multiple choice.
9. Manual parent review for uraian.
10. Editable activity templates and child activity submission.
11. Parent approval queue for activities, uraian, and reward claims.
12. Point ledger as the source of truth for balance.
13. Parent-managed reward catalog.
14. Child reward store and reward claim flow.
15. Parent and child dashboards with basic progress summaries.

## Out Of Scope

Do not implement these unless explicitly requested later:

- Multi-child support.
- Teacher, school, class, or institution admin accounts.
- Ranking, leaderboard, chat, community, or social features.
- Marketplace soal.
- Payment or monetization features.
- Native mobile app.
- Import automation from PDF, DOCX, or XLSX.
- WhatsApp/email automation.
- AI final scoring for uraian.
- Complex gamification such as avatars, levels, streak economy, or collectible badges.

## Authentication and Roles

Implement two account experiences:

- Parent logs in with password.
- Child logs in with PIN/code.

Requirements:

- Child must not access admin features.
- Parent can set or reset the child PIN/code.
- Keep the MVP focused on one child.
- Protect admin routes and server actions from child access.
- Store PIN/password securely. Never store plain text credentials.

If using Supabase Auth for parent auth, keep child PIN login as an app-level child session pattern unless a clean Supabase-native approach already exists.

## Data Model Requirements

Model the MVP with relational tables or a clear persistence layer that can map cleanly to Postgres.

Required entities:

- User or parent profile.
- ChildProfile.
- GradePeriod or class/semester history.
- Subject.
- Topic.
- Question.
- QuestionOption.
- PracticeSet.
- PracticeSetQuestion.
- PracticeAttempt.
- PracticeAnswer.
- ActivityTemplate.
- ActivityLog.
- PointLedger.
- Reward.
- RewardClaim.

Important data rules:

- A child has one active class/semester, but historical records must remain queryable.
- Questions belong to class, semester, subject, and topic.
- AI-generated questions are saved as `draft` until reviewed by the parent.
- Practice sets can be `draft` or `published`.
- Multiple choice attempts can be scored automatically.
- Uraian answers require parent review in the MVP.
- Points are derived from PointLedger, not stored only as a mutable balance.
- Activity points enter the ledger only after parent approval.
- Reward points are deducted only when a parent approves a reward claim.
- Revalidate point balance at reward approval time.
- A daily activity can be submitted at most once per activity per date.
- Repeating a practice set is allowed, but points are only awarded for the first completed attempt for that practice set.

## Parent Experience

Implement parent screens with a calm, efficient admin UI.

Required screens:

- Parent dashboard.
- Child and class settings.
- Subject and topic management.
- Question bank.
- AI generator.
- Practice set builder.
- Activity management.
- Review queue.
- Reward catalog.

Parent dashboard must prioritize pending action:

- Activities awaiting approval.
- Uraian answers awaiting review.
- Reward claims awaiting approval.
- Recent practice attempts.
- Child point balance.
- Weekly progress summary.

## Child Experience

Implement child screens with simple Indonesian copy, generous tap targets, and low visual clutter.

Required screens:

- Today/home.
- Practice list.
- Practice-taking flow.
- Activity submission.
- Points overview.
- Reward store.

Child UX rules:

- Use one-column mobile-first layouts.
- Use large answer option buttons.
- Show one question per screen on mobile.
- Show progress like `3 dari 10`.
- Avoid tables in child mode.
- Keep copy short and encouraging.
- Show status text, not only color.
- Do not make points or rewards overpower the learning activity.

## AI Question Generator

Build the AI generator as a parent-only server-side feature.

Required input fields:

- Kelas.
- Semester.
- Mapel.
- Materi.
- Tipe soal.
- Jumlah soal.

Optional fields:

- Tingkat kesulitan.
- Tujuan pembelajaran.
- Format opsi.
- Sertakan kunci jawaban.
- Sertakan pembahasan.
- Contoh gaya soal.
- Catatan konteks sekolah.

Output requirements:

- Generate structured draft questions.
- Include options and correct answer for multiple choice.
- Include example answer or review guidance for uraian.
- Preserve class, semester, subject, topic, type, and difficulty metadata.
- Mark generated questions as draft.
- Let the parent edit/review before saving.

Implementation requirements:

- Put AI calls behind a server route or server action.
- Keep provider configuration in environment variables.
- If no AI key is configured, show a clear disabled/error state and keep the rest of the app usable.
- Do not expose API keys to client components.
- Validate AI output before saving.

## shadcn/ui Design Requirements

Use shadcn/ui deliberately, not as loose styled `div`s.

Initialize or use shadcn with:

- `new-york` style if available.
- Radix primitives.
- Lucide icons.
- CSS variable-based theming.
- Base palette: `slate` or `neutral`.
- Light mode default.
- Consistent radius close to shadcn default, around `0.625rem`.

Use these component patterns:

- Auth/login: `Card`, `Label`, `Input`, `Button`, `Alert`.
- Parent dashboard: `Card`, `Badge`, `Table` or list, `Tabs` where useful.
- Review queue: `Tabs`, `Card`, `Badge`, `AlertDialog`.
- CRUD tables: `Table`, `DropdownMenu`, `Sheet`, `AlertDialog`.
- Mobile filters/edit drawers: `Sheet`.
- Non-destructive edit modal: `Dialog`.
- Destructive or point-changing confirmation: `AlertDialog`.
- AI generator: `Form`, `Select`, `Textarea`, `Accordion`, `Card`, `Alert`, `Skeleton`.
- Searchable subject/topic/question picker: `Popover` + `Command`.
- Tooltips for icon-only buttons: `Tooltip`.
- Loading states: `Skeleton`.
- Empty/error states: `Card` + `Alert` + a clear recovery action.

Avoid:

- Raw `button`, `input`, `select`, or repeated custom card markup when shadcn primitives exist.
- Nested cards inside cards.
- Multiple competing accent colors on primary actions.
- Emoji as structural icons.
- Glassmorphism or large decorative gradients.
- Using `Dialog` for destructive confirmations.
- Shipping screens without empty, loading, error, and success states.

## Theme and UI Rules

Implement semantic theme tokens, not ad-hoc hex values in components.

Core tokens should cover:

- background.
- foreground.
- card.
- card foreground.
- muted.
- muted foreground.
- border.
- input.
- ring.
- primary.
- primary foreground.
- destructive.
- destructive foreground.

Add app-specific tokens only where needed:

- learning.
- activity.
- reward.
- ai.

Use the app-specific colors mostly for badges, subtle status accents, and small context markers. Use the primary token for primary actions.

Typography:

- Prefer one UI font, such as Inter or Geist Sans.
- Do not use a separate child-mode font unless it is already configured cleanly.
- Body text must be at least 16px on mobile.
- Use tabular numbers for points and metrics.
- Letter spacing should remain default.

Layout:

- Mobile-first.
- Parent desktop uses sidebar navigation.
- Parent mobile uses top app bar plus `Sheet` menu, not a crowded bottom nav.
- Child mobile uses bottom navigation with five items max and icon + label.
- Reserve bottom padding when bottom navigation is fixed.
- Tables must become card lists on mobile.
- No horizontal scroll at 375px.

## Content and Language

Use Indonesian UI copy.

Tone:

- Parent: clear, direct, calm.
- Child: short, encouraging, and not too childish.

Examples:

- Child login error: `Kode belum cocok. Coba lagi ya.`
- AI helper: `Isi konteks soal agar hasilnya lebih sesuai dengan pelajaran anak.`
- AI draft disclaimer: `Periksa dulu sebelum soal diberikan ke anak.`
- Activity pending: `Menunggu konfirmasi orangtua.`
- Reward disabled: `Kurang 12 poin lagi.`
- Approval success: `Aktivitas disetujui. Poin sudah masuk.`

Avoid UI terms such as:

- prompt.
- schema.
- ledger.
- entity.
- database.

Use parent-friendly terms instead, such as:

- konteks soal.
- catatan poin.
- data.
- draft soal.

## Implementation Process

Follow this sequence:

1. Read the PRD and inspect the repository.
2. Identify whether an existing Next.js app can be extended safely. If not, create a new self-contained app folder.
3. Set up project structure, tooling, shadcn/ui, theme tokens, and app shell.
4. Define database schema, migrations, seed data, and typed data access.
5. Implement auth/session and role-based routing.
6. Implement parent admin foundations: dashboard, child settings, subjects/topics, activities, rewards.
7. Implement question bank, AI generator, and practice set builder.
8. Implement child home, practice-taking, activity submission, points, and reward store.
9. Implement review queues and point ledger updates.
10. Add empty/loading/error/success states.
11. Add focused tests for scoring, point ledger, reward approval, activity approval, and role protection.
12. Run lint, typecheck, tests, and a browser smoke test.

## Validation Requirements

At minimum, validate:

- Parent can log in and access admin screens.
- Child can log in with PIN/code and cannot access admin screens.
- Parent can create subjects, topics, manual questions, rewards, and activity templates.
- AI generator is server-side and degrades safely when no API key is configured.
- AI-generated questions are draft until reviewed.
- Parent can publish a practice set.
- Child can complete multiple choice practice.
- Multiple choice scoring is correct.
- Points enter ledger for first completed practice attempt only.
- Child can submit daily activity once per activity/date.
- Activity points enter only after parent approval.
- Child can request a reward only if enough points are available.
- Reward approval revalidates balance and deducts points through ledger.
- Uraian answers wait for manual parent review.
- 375px mobile viewport has no horizontal scroll.
- Icon-only buttons have accessible labels and tooltips.
- Destructive or point-changing actions use confirmation.

## Output Requirements

When done:

- Summarize what was implemented.
- List important files created or changed.
- Explain how to run the app locally.
- List environment variables required.
- Report validation commands run and their results.
- Call out any deferred items or blocked integrations.

Do not claim a feature is complete unless it is implemented and verified.
