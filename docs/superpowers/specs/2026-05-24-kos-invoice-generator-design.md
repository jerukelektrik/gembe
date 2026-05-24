# Kos Invoice Generator Design

Date: 2026-05-24

## Summary

Build a mobile-first static web app for generating kos-kosan invoices as PDF files. The owner opens the app from a Vercel URL, fills a one-time form, adds flexible billing items, previews the invoice, and downloads a PDF that can be sent to the tenant.

The app does not store tenant data, invoice history, or payment details. It is optimized for quick use on a phone and should live in a separate `kos-invoice/` folder so existing projects in the workspace remain unchanged.

## Product Goals

- Generate a clean PDF invoice for kos tenants from a phone.
- Support flexible invoice line items, not only monthly rent.
- Keep the workflow simple: fill form, preview, download PDF.
- Avoid login, database, account setup, and backend complexity.
- Preserve existing workspace apps by isolating this app under `kos-invoice/`.

## Users

### Kos Owner

The kos owner is the only operator. They enter invoice details manually each time and send the downloaded PDF to a tenant through WhatsApp, email, or another channel outside the app.

### Tenant

The tenant only receives the PDF. The invoice must be readable, clear, and professional enough to understand the billed items, total, period, room number, and due date.

## Core Workflow

1. Owner opens the `/kos-invoice/` web page on a phone.
2. Owner fills the invoice form:
   - Nama kos.
   - Nama penyewa.
   - Nomor kamar.
   - Periode tagihan.
   - Tanggal jatuh tempo.
   - One or more billing items.
3. App generates an invoice number from the local timestamp, using the format `INV-YYYYMMDD-HHMM`.
4. App calculates the total from all billing items.
5. Owner checks the on-page preview.
6. Owner taps **Download PDF**.
7. App creates and downloads a PDF file locally in the browser.

## Invoice Data

### Business Identity

Only the kos name appears as the business identity. Address, contact, bank account, and QRIS are out of scope for the MVP.

### Tenant Details

Each invoice includes:

- Tenant name.
- Room number.
- Billing period.

### Invoice Metadata

Each invoice includes:

- Invoice number generated from local date and time.
- Invoice date, defaulting to the current date.
- Due date selected by the owner.

### Billing Items

Billing items are flexible. Each row has:

- Item name.
- Amount in Indonesian rupiah.

The form starts with one default empty row. The owner can add and remove rows. At least one valid item with a positive amount is required before PDF download.

## UI Design

The first screen is the invoice tool itself, not a landing page.

The mobile layout is a single-column flow:

- Header with app name and compact context.
- Form fields for invoice and tenant details.
- Dynamic billing item editor.
- Total summary.
- Invoice preview.
- Primary **Download PDF** button.

The desktop layout may use two columns, with the form on the left and preview on the right, as long as the mobile experience stays primary.

The visual style should be clean with light branding color, suitable for a small kos business. Use restrained accents, clear typography, and a simple table preview. Avoid a heavy dashboard, marketing hero, or decorative layout.

## PDF Design

The generated PDF uses an A4 portrait layout.

Required sections:

- Header: kos name, invoice number, invoice date.
- Recipient block: tenant name, room number, billing period.
- Due date block.
- Item table with item name and amount.
- Total amount highlighted clearly.
- Short payment reminder: `Harap melakukan pembayaran sebelum jatuh tempo.`

The PDF should use a light accent color and otherwise remain mostly white for readability. It should be practical to view on a phone and acceptable to print.

## Technical Design

### Structure

Create a new static app folder:

- `kos-invoice/index.html`: UI, CSS, browser logic, preview rendering, and PDF generation.
- `kos-invoice/README.md`: short usage and deploy notes.

Do not modify the existing root `index.html`, `catratool/`, `KeketBelajar/`, or unrelated files as part of this feature.

### Runtime

The app is static HTML, CSS, and JavaScript deployed on Vercel. It runs entirely in the browser with no server-side API.

### PDF Library

Use client-side PDF generation with `jsPDF` and `jspdf-autotable`, loaded from a CDN or bundled in the page. `autoTable` handles table layout and page breaks for longer item lists.

### State

All data is temporary browser state. The MVP does not use local storage, cookies, server storage, or Google Sheets. Reloading the page clears the form.

### Formatting

Use Indonesian formatting conventions:

- Currency: `Rp` with thousands separators.
- Dates: Indonesian-readable date labels.
- Invoice number timestamp uses the user's local browser time. The intended operating timezone is Asia/Jakarta.

## Validation And Error Handling

Before generating a PDF, the app validates:

- Kos name is filled.
- Tenant name is filled.
- Room number is filled.
- Billing period is filled.
- Due date is selected.
- At least one item has a name and positive amount.

Invalid fields should show clear inline messages. The PDF button should not silently fail. If the PDF library is unavailable because the CDN cannot load, show a readable error message asking the owner to refresh or check the connection.

## Testing Plan

Manual verification should cover:

- Mobile layout fits without overlapping controls.
- Add and remove item rows.
- Rupiah formatting and total calculation.
- Required field validation.
- PDF download works from the browser.
- PDF includes kos name, tenant details, room number, billing period, due date, item table, total, and reminder text.
- Longer item lists create a readable PDF table without broken layout.
- Existing workspace apps remain untouched.

## Out Of Scope

- Tenant database.
- Invoice archive/history.
- Login or authentication.
- Bank account, QRIS, or payment method details.
- WhatsApp sending automation.
- Email sending.
- Google Sheets integration.
- Backend/serverless PDF rendering.
- Multi-language support.
