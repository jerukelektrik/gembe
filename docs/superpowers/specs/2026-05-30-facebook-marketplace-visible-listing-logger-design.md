# Facebook Marketplace Visible Listing Logger - Design

Date: 2026-05-30

## Summary

Build a Firefox browser extension that helps a car seller track which Facebook Marketplace search-result listings have already been seen. The user opens Marketplace manually, applies filters manually, then clicks the extension to capture only the listings currently visible in the page. The extension stores the history locally in the browser and marks listings as new when their listing ID or URL has not been captured before.

This extension is a personal logging tool, not a crawler. It does not auto-scroll, auto-refresh, run background captures, call Facebook endpoints, or access hidden/internal data.

## Goals

- Capture visible Facebook Marketplace listing links from a search-results page after the user clicks a popup button.
- Store captured listing history locally in Firefox extension storage.
- Mark a listing as new when its listing ID or canonical URL has not been seen before.
- Save the first time the extension saw each listing.
- Save the visible Facebook time label when it appears in the page, without treating it as a guaranteed original publish date.
- Show a simple capture summary and links to newly seen listings.

## Non-Goals

- Do not prove the original listing publish timestamp if Facebook does not display it.
- Do not scrape data in the background.
- Do not auto-scroll or auto-refresh Marketplace pages.
- Do not collect seller profile data, chat content, or hidden/internal Facebook data.
- Do not sync data to a server or cloud account.
- Do not detect reposts when the URL/listing ID changes.

## User Workflow

1. User opens Facebook Marketplace in Firefox.
2. User applies their normal car-search filters, including location, price, year, and sort order.
3. User clicks the extension icon.
4. Popup shows a `Capture visible listings` button.
5. User clicks the button.
6. The extension reads visible Marketplace listing links from the current tab.
7. The extension compares captured listing IDs/URLs against local history.
8. Popup shows the capture summary:
   - visible listings
   - new listings
   - already seen listings
   - listings with visible Facebook time labels
9. User opens links from the new-listing list.

## Architecture

### Firefox Extension Manifest

Use Manifest V2 for the MVP because Firefox still supports it and it keeps temporary local loading simple. The extension needs:

- `activeTab` permission so it can inspect the current tab after the user clicks.
- `storage` permission for local listing history.
- Host access scoped to `https://www.facebook.com/marketplace/*` and `https://web.facebook.com/marketplace/*`.

### Popup

The popup owns the user interaction:

- Show current status.
- Provide `Capture visible listings`.
- Display the latest capture summary.
- Display new listing links from the latest capture.
- Provide `Clear history` with confirmation.

### Content Script

The content script runs only when triggered from the popup. It:

- Checks whether the current page looks like a Marketplace page.
- Finds visible listing anchors in the rendered page.
- Extracts listing ID from `/marketplace/item/<id>/` when available.
- Falls back to canonical URL when no listing ID is found.
- Attempts to read a visible time label near the listing card and stores the raw text when present.
- Returns structured capture results to the popup.

### Local Storage

Use Firefox extension local storage through `browser.storage.local`.

The extension stores:

```json
{
  "listings": {
    "<listing-key>": {
      "listingId": "1234567890",
      "url": "https://www.facebook.com/marketplace/item/1234567890/",
      "firstSeenAt": "2026-05-30T08:00:00.000Z",
      "lastSeenAt": "2026-05-30T08:10:00.000Z",
      "seenCount": 2,
      "sourceUrl": "https://www.facebook.com/marketplace/category/vehicles...",
      "displayedPublishedText": "baru saja dicantumkan"
    }
  }
}
```

The listing key is `listingId` when available. If no ID can be extracted, the key is a normalized listing URL.

## Data Rules

- `firstSeenAt` is the reliable timestamp created by the extension.
- `displayedPublishedText` is raw visible text from Facebook, such as `baru saja dicantumkan`, `3 hari lalu`, or `Listed 2 days ago`.
- The UI must label these as:
  - `Pertama terlihat oleh alat`
  - `Label waktu dari Facebook`
- The extension must not call this field `firstPublishedAt` unless Facebook visibly provides a precise published timestamp in the page.

## Capture Rules

- Capture only starts after the user clicks the popup button.
- Capture reads only the current page state.
- Capture does not scroll the page.
- Capture does not refresh the page.
- Capture does not follow listing links automatically.
- Capture does not call private or undocumented Facebook endpoints.

## Error Handling

- If the current tab is not a Marketplace page, show: `Buka halaman hasil pencarian Marketplace dulu.`
- If no listing links are found, show: `Belum ada listing yang bisa dicapture. Coba scroll manual sedikit lalu capture lagi.`
- If Facebook changes its page structure, the extension should return an empty result instead of crashing.
- If storage fails or is full, show a clear storage error and suggest clearing history.
- If a listing cannot be normalized, skip it and count it as ignored.

## Testing

Manual tests:

- Capture on a valid Facebook Marketplace search-results page.
- Capture the same page twice and verify listings become `seen`.
- Capture a Marketplace page with at least one visible time label and verify `displayedPublishedText` is saved.
- Use the popup on a non-Marketplace Facebook page and verify the error state.
- Use the popup on a non-Facebook page and verify the error state.
- Clear history and verify the next capture treats listings as new again.
- Test Indonesian and English Facebook UI labels by storing visible text as-is.

Automated tests where practical:

- Unit test URL normalization and listing ID extraction.
- Unit test merging captured listings into local history.
- Unit test capture summary counts.

## Acceptance Criteria

- The extension can be loaded temporarily in Firefox through `about:debugging`.
- On a Marketplace search-results page, clicking `Capture visible listings` records visible listing IDs/URLs in local extension storage.
- Repeating the same capture reports those listings as already seen.
- The latest capture summary is visible in the popup.
- New listing links from the latest capture can be opened by the user.
- The extension stores `displayedPublishedText` only when visible text is available.
- The extension does not run automatic background collection.
