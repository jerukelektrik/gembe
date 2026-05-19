# Child Learning Activity Dashboard Design

Date: 2026-05-19

## Summary

Build a Google Apps Script web app for parents to track one child's daily learning and habit activities. Parents open the app from a link, check off the child's scheduled activities, and see progress analytics for weekly, monthly, and semester periods. Data is stored in Google Sheets.

The product should feel cheerful and family-friendly, while still being simple enough for daily parent use. Google Sheets acts as the database, not as the main user interface.

## Product Scope

### In Scope

- One child only.
- Parent-controlled daily checklist.
- Google Sheets as the database.
- Google Apps Script `HTMLService` frontend.
- Dashboard for today, weekly progress, monthly progress, and semester progress.
- Reward tiers based on period completion percentage.
- Child chooses desired rewards at the start of each period.
- Parent approves or edits the proposed rewards.
- Cheerful, shadcn-inspired interface built with lightweight HTML, CSS, and JavaScript.

### Out of Scope for MVP

- Multi-child support.
- Login, PIN, or Google account authentication.
- PDF export.
- Email or WhatsApp summary.
- Full React or shadcn/ui build pipeline.
- Teacher, school, class, or TPA admin roles.
- Complex gamification such as avatars, coins, badges, and levels.

## Users

### Parent

The parent is the primary operator. They check tasks daily, review dashboard progress, and approve rewards.

### Child

The child is the motivational audience. They can help choose rewards and view progress, but they do not directly control the checklist in the MVP.

## Activities

The app tracks these activities:

- Kumon
- Sholat 5 Waktu
- Menata Buku
- Membaca Buku
- TPA
- Makan Malam
- Gosok Gigi

## Activity Schedule

The app must calculate progress only from tasks scheduled for each date.

### Every Day

- Kumon
- Sholat 5 Waktu
- Membaca Buku
- Makan Malam
- Gosok Gigi

### Monday to Friday

- Menata Buku

### Sunday to Thursday

- TPA

Tasks that are not scheduled for the selected date should appear as "Libur" or "Tidak dijadwalkan", and they must not reduce the child's progress percentage.

## Input Model

### Binary Tasks

These tasks use a completed/not completed checklist:

- Kumon
- Menata Buku
- Membaca Buku
- TPA
- Makan Malam

### Multi-Part Tasks

These tasks have multiple checkable parts:

- Sholat 5 Waktu: Subuh, Dzuhur, Ashar, Maghrib, Isya
- Gosok Gigi: Pagi, Malam

Each completed part contributes its own points.

## Point Model

The MVP uses weighted points. Point values are stored in the `Settings` sheet so they can be adjusted without changing code.

Recommended starting weights:

| Activity | Max Points |
| --- | ---: |
| Kumon | 20 |
| Sholat 5 Waktu | 25 |
| Menata Buku | 10 |
| Membaca Buku | 15 |
| TPA | 20 |
| Makan Malam | 10 |
| Gosok Gigi | 10 |

Sub-point breakdown:

- Sholat: 5 points per prayer.
- Gosok Gigi: 5 points for morning, 5 points for night.

The app does not force a 100-point daily score, because the available tasks differ by day. The main metric is percentage completion for the active period.

## Reward System

Rewards exist for three period types:

- Weekly
- Monthly
- Semester

Default period definitions:

- Weekly: Monday to Sunday.
- Monthly: calendar month.
- Semester: January to June and July to December.
- Dates and day names use the Asia/Jakarta timezone.

At the beginning of each period, the child proposes rewards. The parent approves or edits them.

Each period has two approved rewards:

- Hadiah Utama
- Hadiah Kedua

Reward tiers are calculated from total period percentage:

| Completion | Reward Status |
| --- | --- |
| 90% or above | Hadiah Utama |
| 70% to below 90% | Hadiah Kedua |
| Below 70% | Belum mendapat hadiah |

The percentage is:

```text
earned scheduled points / maximum scheduled points for the period
```

Only scheduled activities count toward the maximum possible points.

## Dashboard Structure

### Hari Ini

The primary daily screen shows:

- Today's scheduled activities.
- Checklist controls for each task.
- Current points earned today.
- Count of completed activities.
- "Libur" badge for activities that are not scheduled today.
- Save status and error messages.

### Mingguan

Shows:

- Current weekly percentage.
- Earned points vs maximum scheduled points.
- Reward tier status.
- Hadiah Utama and Hadiah Kedua for the week.
- Progress toward the next reward tier.
- Daily trend for the current week.

### Bulanan

Shows:

- Current monthly percentage.
- Earned points vs maximum scheduled points.
- Reward tier status.
- Approved monthly rewards.
- Activity completion rate by task.

### Semester

Shows:

- Semester percentage.
- Earned points vs maximum scheduled points.
- Reward tier status.
- Approved semester rewards.
- Longer-term consistency trend.

### Analytics

The dashboard should include:

- Trend of earned points by day.
- Completion rate per activity.
- Simple calendar or heatmap-style consistency view.
- Highlight for strongest activity.
- Highlight for activity needing attention.

## Visual Direction

The UI should be cheerful, clean, and encouraging.

Design principles:

- Light mode by default.
- shadcn-inspired component language, without requiring React for MVP.
- Friendly cards, tabs, badges, progress bars, dialogs, and tables.
- Clear hierarchy for parent scanning.
- Colorful accents that help the child recognize activities.
- No heavy gamification or clutter.

Suggested palette:

- Sky blue for primary progress.
- Mint green for completed state.
- Warm yellow for reward state.
- Coral for attention or missed items.
- White and soft neutral backgrounds for readability.

Component patterns:

- Tabs for Hari Ini, Mingguan, Bulanan, Semester.
- Cards for summary metrics and reward panels.
- Badges for reward tier, completed state, and "Libur".
- Progress bars for period completion.
- Checkbox groups for daily task input.
- Dialog for proposing, editing, and approving rewards.
- Table for activity history.
- Alert for save errors or missing sheet setup.
- Skeleton or loading state while reading from Sheets.

## Architecture

### Google Apps Script Backend

Responsibilities:

- Serve the web app through `doGet()`.
- Read Settings, DailyLogs, and Rewards from Google Sheets.
- Save daily checklist changes.
- Save and update reward proposals and approvals.
- Calculate scheduled tasks for a date.
- Return dashboard data for today and active periods.

### Frontend

Responsibilities:

- Render the dashboard and input forms.
- Call Apps Script backend functions with `google.script.run`.
- Show loading, success, and error states.
- Recalculate visible UI after saving.
- Keep the app mobile-friendly for daily use.

### Google Sheets

Recommended sheets:

#### Settings

Stores activity definitions.

Columns:

- `task_id`
- `task_name`
- `input_type`
- `schedule_days`
- `max_points`
- `subtasks`
- `active`

#### DailyLogs

Stores daily task results.

Columns:

- `date`
- `task_id`
- `subtask_id`
- `completed`
- `points_earned`
- `points_possible`
- `updated_at`

#### Rewards

Stores reward choices and parent approval.

Columns:

- `period_type`
- `period_id`
- `reward_tier`
- `child_proposal`
- `approved_reward`
- `approval_status`
- `approved_at`
- `updated_at`

#### Periods

Optional for MVP. Periods can be calculated from dates, but this sheet may be used later if the family wants custom semester boundaries.

Columns:

- `period_type`
- `period_id`
- `start_date`
- `end_date`
- `label`

## Data Flow

1. Parent opens the Apps Script web app link.
2. Frontend requests initial dashboard data.
3. Backend reads settings, logs, and rewards from Sheets.
4. Backend calculates today's scheduled tasks and current period progress.
5. Frontend renders daily checklist and analytics.
6. Parent checks or unchecks tasks.
7. Frontend sends changes to backend.
8. Backend writes changes to `DailyLogs`.
9. Frontend refreshes dashboard data and updates reward status.
10. Parent can approve or edit reward proposals at the start of each period.

## Error Handling

- If required sheets are missing, show a setup message and avoid writing partial data.
- If saving fails, show an alert and keep the previous confirmed state visible.
- If settings contain invalid point values, treat the affected task as inactive and show a warning.
- If a task is not scheduled for the selected date, it cannot be checked and does not count against progress.
- If duplicate logs exist, the latest `updated_at` entry wins for dashboard display.

## Testing Strategy

Manual test cases:

- Load app with empty sheets and confirm setup state.
- Save a binary task and confirm `DailyLogs` updates.
- Save Sholat partial completion and confirm partial points.
- Save Gosok Gigi morning and night separately.
- Confirm Menata Buku appears Monday to Friday only.
- Confirm TPA appears Sunday to Thursday only.
- Confirm unscheduled tasks do not reduce percentage.
- Confirm weekly reward tier changes below 70%, at 70%, and at 90%.
- Confirm reward proposal can be approved or edited.
- Confirm dashboard works on mobile width.

Calculation test cases:

- Period with all scheduled tasks completed returns 100%.
- Period with no logs returns 0%.
- Period excludes non-scheduled tasks from maximum points.
- Sholat points are calculated per prayer.
- Gosok Gigi points are calculated per morning/night slot.

## Implementation Notes

- Build the MVP as a lightweight Google Apps Script app first.
- Avoid a full React or shadcn build pipeline for the first version.
- Use shadcn-inspired naming and component structure in HTML/CSS for clarity.
- Keep backend calculation functions small and separately testable.
- Keep point and schedule configuration in Sheets so parents can adjust values later.
- Use clear Indonesian UI copy.

## Approved Direction

The agreed direction is a simple, cheerful, shadcn-inspired Google Apps Script dashboard for one child, with parent checklist input, scheduled task logic, weighted points, and weekly/monthly/semester reward tiers.
