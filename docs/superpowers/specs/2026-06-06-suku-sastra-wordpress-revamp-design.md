# Suku Sastra WordPress Revamp PRD

Date: 2026-06-06
Status: Draft for user review

## 1. Summary

Suku Sastra will be revamped as a clean, modern, lightweight WordPress media site for Indonesian literature. The first phase focuses on a custom classic PHP theme that is ready to run with placeholder content, without requiring access to the current WordPress admin, hosting, database, or SEO plugins.

The new theme should make the homepage feel like an active reading room: recent literary works, book reviews, news, events, and a clear path to submit work. The theme also introduces a cleaner content model so future editorial work is more structured.

## 2. Goals

- Build a custom classic WordPress PHP theme from scratch.
- Keep the theme lightweight, native, and free from required plugins.
- Use Tailwind CSS only as a development/build-time styling tool; ship compiled CSS to WordPress.
- Support light mode, dark mode, and system preference.
- Improve editorial structure with custom post types for book reviews, news, and events.
- Keep poems, short stories, and essays as regular WordPress posts using categories.
- Add tag hub pages for SEO-focused articles that are public and indexable but do not appear on the homepage.
- Provide native SEO controls for title, description, canonical, robots, redirect, Open Graph, and structured data.
- Make the theme usable with placeholder content now and ready for real data later.

## 3. Non-Goals

- Directly changing the live website.
- Migrating live data during phase one.
- Replacing the full functionality of Yoast, Rank Math, or another advanced SEO plugin.
- Building a page builder or block/FSE theme.
- Requiring ACF, Elementor, Jetpack, Yoast, or another plugin.
- Implementing editorial workflow, paid membership, or full submission management in phase one.

## 4. Current Context

The current public site is WordPress at `https://sukusastra.com/`. Public REST API inspection shows:

- Site name: `Suku Sastra`.
- Timezone: `Asia/Jakarta`.
- Current homepage behavior: latest posts (`show_on_front: posts`).
- Existing public content types include standard `post`, `page`, media, and WordPress template-related types.
- Relevant existing categories include `Puisi`, `Cerpen`, `Esai`, `Peristiwa`, and `Buku` using the slug `resensi-buku`.
- Many posts do not have featured images, so the new theme must handle image-less cards gracefully.

Because there is no current admin or hosting access, the PRD treats data migration as a future roadmap item. The first phase should be built and validated with placeholder/sample data.

## 5. Audience And Positioning

Primary audience:

- Readers of Indonesian literature.
- Writers looking for a place to submit poems, short stories, and essays.
- Readers looking for book reviews and literary events.
- Search visitors landing on topical/tag pages.

Product positioning:

- Suku Sastra is a modern literary media site.
- Homepage experience should be easy to scan.
- Reading pages should remain calm, focused, and comfortable for long-form content.
- Book reviews, news, and events should feel richer than generic posts.

## 6. Information Architecture

Primary navigation:

- Puisi
- Cerpen
- Esai
- Review Buku
- Berita
- Event
- Kirim Karya

Secondary/static pages:

- Tentang Kami
- Ketentuan Pengiriman Karya
- Tag/topic hub pages
- Search results

Homepage priority:

1. Latest or featured literary works from Puisi, Cerpen, and Esai.
2. Latest book reviews.
3. Latest news.
4. Upcoming events.
5. Clear submit-work CTA.

## 7. Content Model

### 7.1 Standard Post

Use standard WordPress posts for literary works and SEO articles.

Primary categories:

- `Puisi`
- `Cerpen`
- `Esai`
- `Ruang Baca`

Standard fields:

- Title
- Slug/permalink using native WordPress controls
- Content
- Excerpt
- Featured image
- Author
- Publish date
- Category
- Tags

Native metabox fields:

- Show on homepage/editorial feed: yes/no
- Mark as SEO article: yes/no

Behavior:

- Puisi, Cerpen, and Esai can appear on the homepage unless excluded.
- SEO articles use `Ruang Baca`, can be marked as SEO articles through the metabox, can be excluded from the homepage, and remain public through tag hubs, search, sitemap, and direct URLs.

### 7.2 `review_buku` Custom Post Type

Purpose:

- A structured home for book reviews and literary review content.

Fields:

- Book title
- Book author
- Publisher
- Publication year
- Book cover
- Reviewer
- Short summary
- Marketplace CTA label
- Marketplace URL
- Contact sales CTA label
- Contact sales URL

Frontend behavior:

- Archive cards show cover, book metadata, review title, reviewer, and CTA.
- Single page emphasizes cover, book metadata, review content, and CTA.
- If marketplace/contact fields are empty, the CTA block is hidden or simplified.

### 7.3 `berita` Custom Post Type

Purpose:

- News, coverage, announcements, and literary updates.

Fields:

- News summary
- Optional location
- Optional source/reference URL
- Optional YouTube embed URL
- Featured image

Frontend behavior:

- Archive lists news in a scan-friendly layout.
- Single page supports an optional YouTube embed if a video URL exists.
- If no video exists, no empty video container is rendered.

### 7.4 `event` Custom Post Type

Purpose:

- Literary events, agendas, workshops, readings, performances, and related activities.

Fields:

- Start date
- Optional end date
- Location or online/offline format
- Status: upcoming, past, cancelled
- Paid ticket: yes/no
- Ticket availability: available, sold out
- Booking CTA label
- Booking URL
- Contact sales/contact person label
- Contact sales/contact person URL
- Featured image

Frontend behavior:

- Upcoming events appear before past events.
- Event single pages show date, location, status, booking/contact CTA, and event details.
- Booking CTA is clickable only when the event is upcoming and tickets are available.
- If the event has ended, the CTA is disabled with label `Event Berakhir`.
- If tickets are sold out, the CTA is disabled with label `Tiket Habis`.
- Cancelled events should show a clear cancelled state and no active booking CTA.

## 8. Tag Hub And SEO Articles

Tag pages should become structured topic hubs, not plain WordPress tag archives.

Tag hub requirements:

- URL format remains natural: `/tag/nama-topik/`.
- Show tag title and editorial description when available.
- Show related articles with pagination.
- Include SEO articles that are excluded from the homepage.
- Keep the page indexable when it has meaningful content.
- Avoid indexing low-value empty tag pages.

SEO article requirements:

- Use standard posts.
- Assign category `Ruang Baca`.
- Assign one or more topical tags.
- Set `show_on_homepage` to no when the article is designed for search traffic rather than homepage editorial placement.
- Remain reachable through tag hubs, internal search, sitemap, and direct links.

SEO safety:

- These articles must not be hidden or cloaked.
- They should remain reachable by normal crawlable HTML links.
- Complex filter combinations should not create excessive indexable URL variants.

## 9. Templates

### 9.1 `front-page.php`

Homepage sections:

- Header and primary navigation.
- Submit-work icon/CTA.
- Featured editorial area for latest or selected content.
- Latest works section with tabs/segments for Puisi, Cerpen, and Esai.
- Review Buku section with richer book cards.
- Berita section.
- Event section with upcoming events prioritized.
- Footer with about text, social links, categories, and submission links.

### 9.2 Category Archives

For `Puisi`, `Cerpen`, and `Esai`:

- Show category title and description.
- Show list/grid of posts.
- Support filter controls where relevant.
- Handle posts without images using typographic fallback cards.

### 9.3 CPT Archives

`archive-review_buku.php`:

- Cover-led card layout.
- Book metadata visible at card level.
- CTA marketplace/contact sales when available.

`archive-berita.php`:

- News list/card layout.
- Optional video indicator when YouTube embed exists.

`archive-event.php`:

- Upcoming events first.
- Past events as archive.
- Clear status indicators.

### 9.4 Singles

`single.php`:

- Main reading column.
- Lightweight sidebar with related articles, categories/tags, and submit-work CTA.
- Comfortable typography for long-form reading.

`single-review_buku.php`:

- Book cover and metadata.
- Review content.
- Marketplace/contact sales CTA.
- Related reviews or related posts.

`single-berita.php`:

- News content.
- Optional YouTube embed.
- Source/reference link if available.

`single-event.php`:

- Event metadata.
- Status-aware CTA.
- Booking/contact sales state.
- Related events or news.

### 9.5 Static Pages

`page.php`:

- Clean static page template.
- Used for Tentang Kami and Ketentuan Pengiriman Karya.
- Submit-work CTA remains visible where relevant.

### 9.6 `tag.php`

Tag hub template:

- Tag title.
- Optional tag description.
- Article list.
- Pagination.
- SEO metadata controls.
- Empty or thin tag pages can be noindexed.

### 9.7 `search.php`

Search page:

- Search input.
- Filters for content type, karya/category, year, and author.
- Results from posts and supported CPTs.
- Empty state with reset filter link.

## 10. Search And Filter

Filters:

- Content type: post, review buku, berita, event.
- Karya/category: Puisi, Cerpen, Esai, Ruang Baca.
- Year.
- Author.

Behavior:

- Filters should be server-rendered and accessible.
- Query URLs should remain stable and readable.
- Avoid creating indexable crawl traps from many filter combinations.
- Canonical should point to the most relevant base archive/tag page when filter combinations are not intended to rank.
- Empty result pages should show a reset option.

## 11. Native SEO Controls

Add a lightweight native SEO metabox for posts, pages, and CPTs.

Fields:

- SEO title
- Meta description
- Canonical URL
- Robots: default `index, follow`, with optional `noindex`
- Redirect target URL
- Redirect type: 301 or 302

Slug:

- Use native WordPress permalink/slug controls.
- Do not create a duplicate custom slug field.

Redirect behavior:

- If redirect target is set for a content item, the theme can redirect that item before rendering.
- Redirects should validate local and external URLs carefully.
- A future migration phase can add a lightweight redirect map for old path to new URL mappings.

Frontend output:

- `<title>`
- `<meta name="description">`
- Canonical link
- Robots meta
- Basic Open Graph tags
- Basic Twitter card tags
- JSON-LD for Article
- JSON-LD for Review/Book when relevant
- JSON-LD for Event when relevant

Scope boundary:

- This is a lightweight SEO layer, not a full Yoast/Rank Math replacement.
- It should cover the editorial controls needed for this revamp.

## 12. Visual Direction

Style:

- Modern media.
- Clean, scan-friendly layout.
- Dark mode support.
- Reading pages should be quieter than the homepage.

Design principles:

- Strong typography and clear hierarchy.
- Compact but not cramped cards.
- No decorative clutter.
- Cards and lists should work without images.
- Book reviews can use richer card composition because cover art is important.
- Event status should be visible at a glance.

Dark mode:

- Toggle in header.
- Persist preference with localStorage.
- Fallback to system preference.
- Use a class or data attribute on `<html>`.
- Avoid simple color inversion; define deliberate dark colors for background, text, border, muted text, and CTA states.

## 13. Technical Architecture

Theme type:

- Classic WordPress PHP theme.
- Native PHP templates.
- No block theme/FSE requirement.
- No required plugins.

Styling:

- Tailwind CSS at build time.
- Ship compiled CSS to `assets/css/theme.css`.
- WordPress hosting does not need Node.js.
- Use static, complete Tailwind class names in PHP templates.
- Avoid dynamic class construction that Tailwind cannot detect.
- Use mappings or safelists for controlled variants.

Suggested structure:

```text
sukusastra-theme/
  style.css
  functions.php
  front-page.php
  home.php
  index.php
  archive.php
  category.php
  tag.php
  search.php
  single.php
  single-review_buku.php
  single-berita.php
  single-event.php
  page.php
  inc/
    setup.php
    assets.php
    post-types.php
    metaboxes.php
    seo.php
    redirects.php
    queries.php
    event-state.php
    helpers.php
  template-parts/
    cards/
      post-card.php
      review-card.php
      news-card.php
      event-card.php
    cta-submit.php
    related-posts.php
    filters.php
    sidebar-single.php
  assets/
    css/
      theme.css
    js/
      theme-toggle.js
      navigation.js
  src/
    input.css
```

Data flow:

- Editors create posts/CPT items in WordPress admin.
- Native metaboxes store structured fields in `post_meta`.
- Query helpers centralize homepage, archive, related content, and filter queries.
- Template parts render cards and shared UI states.
- SEO helper controls metadata output.
- Redirect helper runs before rendering when a redirect target exists.

## 14. Error And Empty States

Required states:

- Post without featured image.
- Review without marketplace/contact CTA.
- News without YouTube embed.
- Event ended.
- Event sold out.
- Event cancelled.
- Archive with no posts.
- Search/filter with no results.
- Tag page with no meaningful content.
- Missing optional metadata.

Behavior:

- Do not render empty wrappers.
- Use clear disabled CTA labels for unavailable events.
- Provide reset links for empty search/filter results.
- Keep layout stable when images or metadata are missing.

## 15. Accessibility

Requirements:

- Semantic headings.
- Keyboard accessible navigation.
- Focus states for all interactive controls.
- Buttons and links have clear labels.
- Disabled event CTAs use accessible disabled state and explanatory text.
- Dark mode contrast must remain readable.
- Forms and filters must have labels.

## 16. Performance

Requirements:

- No page builder dependency.
- Minimal JavaScript.
- Compiled CSS only.
- Use WordPress responsive images.
- Use lazy loading for non-critical images and embeds.
- Only load YouTube embeds when needed.
- Avoid heavy global queries.
- Cache repeated expensive query results where appropriate.

## 17. Testing And Validation

Template checks:

- Homepage.
- Puisi/Cerpen/Esai archives.
- Review Buku archive and single.
- Berita archive and single.
- Event archive and single.
- Static pages.
- Tag hub.
- Search results.

State checks:

- Light mode.
- Dark mode.
- System preference fallback.
- Mobile and desktop.
- Featured image present/missing.
- Review CTA present/missing.
- News YouTube embed present/missing.
- Event upcoming/ended/sold out/cancelled.
- Homepage inclusion/exclusion flag.
- SEO article appearing in tag hub but not homepage.
- Search/filter combinations.

SEO checks:

- Title and meta description output.
- Canonical output.
- Robots output.
- Redirect behavior.
- Open Graph output.
- JSON-LD Article.
- JSON-LD Review/Book.
- JSON-LD Event.
- No accidental noindex on important archives.

Performance checks:

- CSS compiled.
- JS remains small.
- No plugin requirement.
- No broken layout without images.

## 18. Migration Roadmap

Migration is not part of phase one implementation because there is no current site access.

Future migration approach:

1. Export or access existing WordPress content.
2. Dry-run mapping:
   - Category `resensi-buku` to `review_buku` CPT.
   - Category `peristiwa` into `berita` or `event` based on content review.
   - Keep Puisi, Cerpen, and Esai as standard posts.
3. Generate migration report with counts, missing metadata, and uncertain mappings.
4. Add redirects if URLs change.
5. Run migration only after backup.
6. Validate frontend templates and SEO outputs.

The theme should include placeholder-ready templates so development can start before migration access exists.

## 19. Acceptance Criteria

- Custom classic PHP theme structure is defined.
- Theme does not require WordPress plugins.
- Tailwind is used only for compiled CSS output.
- Homepage layout supports latest works, book reviews, news, events, and submit-work CTA.
- Post, review, news, event, page, category, tag, and search templates are specified.
- Native CPTs are specified for review books, news, and events.
- Native metabox fields are specified for each content type.
- Event CTA state rules are specified.
- Tag hub and SEO article behavior are specified.
- Native SEO controls are specified.
- Dark mode requirements are specified.
- Search/filter requirements are specified.
- Empty/error states are specified.
- Migration is explicitly deferred to a future roadmap.

## 20. References

- Suku Sastra: `https://sukusastra.com/`
- WordPress REST API: `https://sukusastra.com/wp-json/`
- Google Search Central crawlable links: `https://developers.google.com/search/docs/crawling-indexing/links-crawlable`
- Google Search Central faceted navigation guidance: `https://developers.google.com/search/blog/2024/12/crawling-december-faceted-nav`
- Tailwind class detection: `https://tailwindcss.com/docs/detecting-classes-in-source-files`
- Tailwind dark mode: `https://tailwindcss.com/docs/dark-mode`
