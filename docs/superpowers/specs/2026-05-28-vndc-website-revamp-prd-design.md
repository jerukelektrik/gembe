# PRD Revamp Website VNDC

Date: 2026-05-28

## 1. Background

VNDC saat ini menggunakan WordPress dengan Elementor, theme Aimo, Rank Math, dan W3 Total Cache. Dari audit cepat halaman live pada 2026-05-28, homepage masih membawa banyak aset front-end: sekitar 44 stylesheet, 47 script, 47 image, serta inline CSS/JS yang cukup besar. Ini membuat revamp perlu diarahkan ke WordPress custom theme ringan agar website tetap mudah dikelola, tetapi lebih cepat, kredibel, dan siap menghasilkan lead.

Halaman existing yang menjadi acuan:

- Home: `https://www.vndc.co.id/`
- Service Web Development: `https://www.vndc.co.id/service/web-development/`
- Service SEO: `https://www.vndc.co.id/service/search-engine-optimization-seo/`
- Case Study OLX: `https://www.vndc.co.id/project-olx/`
- Case Study Diricare: `https://www.vndc.co.id/project-diricare/`
- Case Study Gamatechno: `https://www.vndc.co.id/project-gamatechno/`
- Case Study Catraspector: `https://www.vndc.co.id/project-catraspector/`

Primary CTA:

`https://api.whatsapp.com/send/?phone=6289678777264&text=Halo+Kak%2C+Mau+konsultasi+untuk+layanannya+dong&type=phone_number&app_absent=0`

## 2. Goal

Revamp website VNDC menjadi website WordPress custom theme yang ringan, profesional, dan berorientasi lead. Fokus utama adalah meningkatkan klik konsultasi WhatsApp dan memperkuat kredibilitas melalui portfolio/case study.

Website baru harus memosisikan VNDC sebagai partner web development dan SEO untuk perusahaan menengah yang membutuhkan eksekusi serius, bukan sekadar vendor website murah.

## 3. Target Audience

Target utama adalah perusahaan menengah di Indonesia yang membutuhkan partner untuk:

- Membuat atau memperbaiki website company/profile/service.
- Meningkatkan performa SEO dan organic visibility.
- Meningkatkan kepercayaan calon customer lewat website yang rapi, cepat, dan kredibel.
- Bekerja dengan tim yang bisa menjelaskan proses, hasil, dan prioritas teknis secara jelas.

Persona utama:

- Founder atau owner perusahaan menengah.
- Marketing manager.
- Business development manager.
- Tim digital/brand yang butuh partner implementasi.

## 4. Positioning

Recommended positioning:

> Partner Web Development dan SEO untuk perusahaan yang ingin website lebih cepat, kredibel, dan siap menghasilkan inquiry.

Supporting message:

> VNDC membantu bisnis membangun website profesional, memperkuat visibilitas organik, dan mengubah traffic menjadi konsultasi yang lebih berkualitas.

Tone harus terasa corporate, credible, practical, dan result-oriented. Hindari framing utama seperti "murah", klaim berlebihan seperti "naik omzet 10x", atau jargon teknis yang terlalu berat di area hero.

## 5. Success Metrics

Primary metrics:

- Peningkatan klik CTA WhatsApp dari halaman yang direvamp.
- Peningkatan jumlah inquiry WhatsApp yang menyebut kebutuhan web development atau SEO.

Secondary metrics:

- Scroll depth sampai section case study.
- Klik dari Home ke halaman service dan case study.
- Klik dari service page ke case study relevan.
- Lighthouse Performance mobile minimal 90 pada template utama.
- Core Web Vitals memenuhi target: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.

## 6. Scope

In scope untuk fase ini:

1. Homepage.
2. Service Web Development.
3. Service SEO.
4. Case Study OLX.
5. Case Study Diricare.
6. Case Study Gamatechno.
7. Case Study Catraspector.
8. Header, footer, navigation, dan global CTA WhatsApp yang dibutuhkan tujuh halaman tersebut.
9. WordPress custom theme ringan untuk halaman di atas.
10. Content model untuk service page dan case study.
11. Tracking event untuk CTA WhatsApp.
12. Performance, SEO, accessibility, dan QA acceptance criteria.

Out of scope fase ini:

- Revamp blog, category, author, archive, about, contact, dan 404.
- Lead form custom selain WhatsApp.
- Payment, booking calendar, CRM integration penuh, atau marketing automation.
- Dashboard admin custom kompleks.
- Migrasi ke headless CMS.
- Redesign brand identity penuh di luar kebutuhan website.

## 7. Recommended Approach

Gunakan custom WordPress theme ringan dengan arah visual **Corporate Proof**:

- Clean, modern, profesional, dan mudah discan.
- Bukti kredibilitas ditampilkan sejak awal: client names, case study metrics, framework kerja, testimonial, dan FAQ.
- CTA WhatsApp tetap jelas tanpa membuat halaman terasa terlalu sales-heavy.
- Case study menjadi aset trust utama, bukan hanya dekorasi portfolio.

Teknologi utama:

- WordPress core terbaru yang stabil.
- Custom theme VNDC, bukan Elementor/page builder berat.
- Gutenberg untuk konten dasar.
- ACF atau custom fields native untuk structured content.
- Rank Math atau plugin SEO equivalent untuk metadata dan schema, jika masih dibutuhkan.
- W3 Total Cache atau cache layer equivalent untuk page cache, minification, browser cache, dan CDN integration.
- Build tool ringan untuk CSS/JS production assets, misalnya Vite, esbuild, Rollup, atau npm scripts sederhana.

## 8. Information Architecture

Navigation utama:

- Home
- Web Development
- SEO
- Project
- FAQ atau Contact section anchor
- CTA: Konsultasi Gratis

Internal linking:

- Home link ke Web Development, SEO, dan case study unggulan.
- Web Development link ke Gamatechno dan Catraspector jika relevan.
- SEO link ke OLX, Diricare, dan Gamatechno jika relevan.
- Setiap case study link kembali ke service terkait dan CTA WhatsApp.
- Footer menampilkan service, project, phone/WhatsApp, dan trust copy singkat.

## 9. Content Model

### 9.1 Page

Gunakan WordPress `page` untuk:

- Home
- Web Development
- SEO

Fields minimum:

- SEO title
- meta description
- hero eyebrow
- hero title
- hero subtitle
- primary CTA label
- primary CTA URL
- secondary CTA label
- secondary CTA target
- service summary blocks
- proof metrics
- FAQ items
- final CTA title
- final CTA subtitle

### 9.2 Case Study CPT

Buat custom post type `case_study` untuk:

- OLX
- Diricare
- Gamatechno
- Catraspector

Fields minimum:

- client name
- slug
- industry
- service type: SEO, web development, atau web + SEO
- hero title
- summary
- client logo
- featured image
- challenge
- solution
- implementation steps
- result metrics
- testimonial quote
- testimonial name/title
- related service page
- FAQ items
- final CTA message

Result metrics harus structured agar bisa ditampilkan sebagai cards. Contoh dari halaman existing:

- OLX: organic traffic +25% per bulan, indeksasi 95%, page views +15% per bulan, ranking halaman pertama +60%.
- Diricare: peningkatan organic traffic, penguasaan ranking keyword, peningkatan keandalan situs.
- Gamatechno: traffic +40%, speed meningkat 50%, retensi pengunjung meningkat.
- Catraspector: peningkatan interaksi, traffic, kepercayaan pelanggan, dan kecepatan halaman.

Jika angka belum tervalidasi, angka tersebut tidak boleh dipublish. Gunakan bahasa aman seperti "meningkat" tanpa angka spesifik sampai data internal sudah disetujui.

### 9.3 Global Settings

Buat theme settings atau ACF Options Page untuk:

- WhatsApp phone: `6289678777264`
- WhatsApp default message: `Halo Kak, Mau konsultasi untuk layanannya dong`
- Header CTA label
- Footer CTA label
- Business name
- Logo
- Social links
- Tracking IDs
- Default Organization schema data

## 10. Page Requirements

### 10.1 Homepage

Purpose:

Menjelaskan positioning VNDC, menunjukkan bukti kredibilitas, dan membawa visitor ke WhatsApp atau halaman service/case study.

Required sections:

1. Header with CTA.
2. Hero Corporate Proof.
3. Trusted by / client proof strip.
4. Service summary: Web Development dan SEO.
5. Why VNDC: terpercaya, tim profesional, pengerjaan terstruktur, biaya fleksibel, hasil terukur.
6. Framework: Design, Deploy, Dominate atau versi yang lebih jelas secara business.
7. Featured case studies: OLX, Diricare, Gamatechno, Catraspector.
8. Result metrics overview.
9. FAQ.
10. Final WhatsApp CTA.

Hero content direction:

- Headline harus menggabungkan web development dan SEO untuk perusahaan.
- Subheadline menjelaskan outcome: website profesional, visibility organik, dan inquiry.
- Primary CTA: Konsultasi Gratis.
- Secondary CTA: Lihat Project.

### 10.2 Service Web Development

Purpose:

Meyakinkan perusahaan menengah bahwa VNDC dapat membangun website profesional yang cepat, credible, responsive, mudah dikelola, dan siap SEO.

Required sections:

1. Hero service with CTA.
2. Problems VNDC solves.
3. Deliverables: strategy, UI structure, development, responsive implementation, SEO foundation, analytics setup.
4. Process/framework.
5. Relevant case studies.
6. Why choose VNDC.
7. FAQ.
8. Final CTA.

Important copy direction:

- Hindari fokus harga murah sebagai headline utama.
- Tekankan reliability, clarity, maintainability, speed, dan conversion path.

### 10.3 Service SEO

Purpose:

Meyakinkan visitor bahwa VNDC dapat membantu SEO secara terstruktur, dari audit teknis sampai content planning dan reporting.

Required sections:

1. Hero service with CTA.
2. SEO problems: traffic stagnan, technical issue, konten tidak terarah, ranking tidak stabil, conversion rendah.
3. SEO scope: technical audit, on-page, content strategy, editorial plan, internal linking, reporting, optional link building.
4. Framework: Optimize, Rank, Convert.
5. Relevant case studies.
6. FAQ with honest expectation: SEO tidak menjamin ranking instan.
7. Final CTA.

Important copy direction:

- Jangan menjanjikan ranking #1 pasti.
- Jelaskan SEO sebagai proses prioritas, eksperimen, dan perbaikan berkelanjutan.

### 10.4 Case Study Pages

Purpose:

Menjadikan portfolio VNDC sebagai bukti kemampuan, bukan sekadar halaman cerita panjang.

Required structure:

1. Case study hero: client, service type, summary, CTA.
2. Executive summary.
3. Challenge.
4. Solution and strategic approach.
5. Implementation details.
6. Results/metrics.
7. Testimonial if available.
8. Related service CTA.
9. FAQ.
10. Final CTA: Konsultasikan kebutuhan serupa.

Scanability requirements:

- Metrics harus terlihat dalam 1 layar awal desktop jika memungkinkan.
- Gunakan heading deskriptif.
- Hindari blog-style wall of text.
- Gunakan bullets dan cards untuk problem, solution, result.

## 11. Conversion Requirements

CTA WhatsApp harus tersedia di:

- Header desktop.
- Hero setiap halaman.
- Tengah halaman setelah proof atau service explanation.
- Final CTA.
- Sticky bottom CTA di mobile setelah user scroll melewati hero.

WhatsApp URL harus dibuat dari global settings agar mudah diubah.

Recommended CTA labels:

- Konsultasi Gratis
- Konsultasikan Kebutuhan
- Diskusi Project Website
- Audit Kebutuhan SEO
- Konsultasikan Kebutuhan Serupa

Tracking events:

- `cta_whatsapp_click`
- properties: `page_type`, `page_slug`, `cta_position`, `cta_label`, `service_type`, `case_study_client`

Tracking tidak boleh memblokir rendering. Gunakan deferred script atau tag manager dengan konfigurasi ringan.

## 12. Visual Direction

Selected direction: **Corporate Proof**.

Visual principles:

- Clean white/light background dengan aksen navy, teal/blue, dan WhatsApp green hanya untuk CTA WhatsApp.
- Typography modern dan sangat readable.
- Layout rapi, card radius kecil, shadow restrained.
- Section proof dan metrics harus terasa seperti business evidence.
- Case study cards harus menonjolkan client name, service type, dan result.
- Hindari gradient agency generik, efek 3D berat, slider besar, animasi berlebihan, dan stock image yang tidak relevan.

UX requirements:

- Mobile-first.
- Touch target minimal 44px.
- Tidak ada teks overlap di mobile.
- Sticky CTA tidak menutup konten penting.
- Header mobile ringkas dan cepat digunakan.
- FAQ mudah discan.

## 13. WordPress Architecture

Theme structure recommendation:

- `style.css` theme header only or minimal base.
- `functions.php` for theme setup, asset enqueue, CPT registration, settings registration.
- `inc/` for modular PHP: assets, CPTs, fields, schema, helpers, tracking.
- `template-parts/` for reusable sections.
- `assets/src/` for readable source CSS/JS.
- `assets/dist/` for production minified one-line CSS/JS.
- Templates: `front-page.php`, `page-service.php`, `single-case_study.php`, `archive-case_study.php` if needed.

Development source should stay readable. Production assets must be generated by build tooling.

No Elementor dependency for these seven pages. If Elementor remains installed for legacy pages, the new templates must not enqueue Elementor assets on the revamp pages.

## 14. Minification Requirement

The revamp must include a clear production build and deployment rule:

- Source CSS/JS tetap modular dan readable di `assets/src`.
- Production CSS/JS di `assets/dist` harus minified menjadi output satu baris per file sebelum deploy.
- Hilangkan whitespace, comments, dan line breaks di production assets.
- Inline CSS/JS custom yang benar-benar diperlukan juga harus minified satu baris.
- HTML minification boleh dilakukan oleh cache plugin jika stabil dan tidak merusak markup/schema.
- Source map hanya boleh aktif di staging/development, bukan production publik.
- Build harus gagal jika production asset belum minified.

Acceptance criteria:

- File CSS production utama memiliki 1 baris minified.
- File JS production utama memiliki 1 baris minified.
- Tidak ada CSS/JS custom unminified yang dienqueue di production.
- WordPress tidak memuat aset Elementor/theme lama di halaman revamp.

## 15. Core Web Vitals Requirements

Targets:

- LCP mobile <= 2.5s.
- INP <= 200ms.
- CLS <= 0.1.
- Lighthouse Performance mobile >= 90 untuk Home, service page, dan case study template.
- Accessibility Lighthouse >= 90.
- SEO Lighthouse >= 95.

Implementation rules:

- Critical CSS untuk above-the-fold.
- Defer atau async semua JS non-kritis.
- Hindari heavy animation library, slider berat, dan unused CSS besar.
- Hero image harus optimized, preloaded jika menjadi LCP image, dan tidak lazy-loaded.
- Images lain harus lazy-loaded, pakai WebP/AVIF, responsive `srcset`, dan explicit `width`/`height`.
- Font self-hosted, subset, `font-display: swap`, preload hanya font utama yang dipakai above-the-fold.
- Header, image, logo, sticky CTA, dan accordion harus memiliki reserved space agar tidak menyebabkan layout shift.
- Third-party scripts harus dibatasi dan dimuat setelah interaksi atau setelah page idle jika memungkinkan.
- Cache harus aktif: page cache, browser cache, gzip/brotli, object cache jika tersedia, CDN jika tersedia.

Performance budget:

- Initial JS custom untuk halaman marketing <= 35 KB gzip.
- Initial CSS custom <= 45 KB gzip.
- Hero image <= 180 KB jika memungkinkan.
- Total blocking time harus dijaga rendah dengan JS minimal.

## 16. SEO Requirements

Metadata:

- Setiap halaman memiliki title, meta description, canonical, Open Graph, dan Twitter card unik.
- Keyword utama tetap disesuaikan dengan existing page intent, tetapi tone copy diarahkan ke perusahaan menengah.

Recommended title direction:

- Home: Partner Web Development & SEO untuk Perusahaan | VNDC
- Web Development: Jasa Web Development untuk Perusahaan | VNDC
- SEO: Jasa SEO untuk Pertumbuhan Organik Bisnis | VNDC
- Case studies: `[Client] Case Study: [Outcome] | VNDC`

Schema:

- Organization.
- WebSite.
- BreadcrumbList.
- Service untuk service pages.
- FAQPage untuk FAQ valid.
- Article atau CreativeWork untuk case study pages.

SEO content rules:

- Hanya satu H1 per halaman.
- Heading hierarchy harus rapi.
- Internal links harus deskriptif.
- Image alt text harus menjelaskan konteks, bukan keyword stuffing.
- FAQ harus menjawab objection nyata dan tidak berisi klaim ranking yang tidak bisa dijamin.

## 17. Analytics And Tracking

Minimum tracking:

- GA4 or equivalent.
- Google Tag Manager jika dibutuhkan, dengan container ringan.
- Search Console.
- CTA WhatsApp click event.
- Scroll depth optional.

Tracking QA:

- Klik CTA header, hero, mid-page, sticky mobile, dan final CTA tercatat dengan `cta_position` berbeda.
- Event tidak duplicate.
- WhatsApp URL tetap terbuka benar setelah tracking aktif.

## 18. Accessibility Requirements

- Semua CTA adalah link atau button dengan accessible name jelas.
- Kontras warna memenuhi WCAG AA untuk teks utama dan CTA.
- FAQ accordion bisa digunakan dengan keyboard.
- Focus state terlihat.
- Mobile menu bisa ditutup dengan keyboard dan tidak menjebak focus.
- Icon dekoratif diberi `aria-hidden="true"`.
- Gambar informatif punya alt text.

## 19. Migration Notes

- Audit semua konten existing sebelum rewrite agar tidak kehilangan keyword dan proof penting.
- Redirect tidak diperlukan jika slug tetap sama.
- Jika slug berubah, buat 301 redirect.
- Backup WordPress, database, theme, dan uploads sebelum deploy.
- Deploy lewat staging terlebih dahulu.
- Jalankan crawl staging untuk broken link, canonical, schema, dan noindex.
- Pastikan Rank Math metadata tidak duplikat dengan schema custom theme.

## 20. QA Checklist

Functional QA:

- Semua halaman scope bisa dibuka.
- Header nav bekerja.
- Mobile menu bekerja.
- CTA WhatsApp membuka URL benar.
- Sticky CTA mobile muncul setelah hero dan tidak menutupi footer.
- FAQ accordion bekerja tanpa layout shift besar.
- Case study fields tampil lengkap dan fallback rapi jika testimonial kosong.

Performance QA:

- Lighthouse mobile dan desktop untuk Home.
- Lighthouse mobile untuk Web Development.
- Lighthouse mobile untuk SEO.
- Lighthouse mobile untuk salah satu case study.
- PageSpeed Insights setelah deploy staging/public.
- Chrome DevTools Coverage untuk mengecek unused CSS/JS.
- WebPageTest optional untuk waterfall dan LCP image.

SEO QA:

- Title/meta unik.
- Canonical benar.
- Schema valid di Rich Results Test atau Schema Markup Validator.
- Sitemap mencakup halaman yang direvamp.
- Internal link tidak broken.
- Tidak ada accidental noindex.

Accessibility QA:

- Lighthouse accessibility.
- Keyboard navigation basic.
- Color contrast check.
- Screen reader label spot check untuk CTA dan menu.

## 21. Acceptance Criteria

Revamp dianggap selesai jika:

- Tujuh halaman scope sudah menggunakan custom WordPress theme ringan.
- Tidak ada dependency Elementor/page builder untuk rendering tujuh halaman tersebut.
- Semua CTA WhatsApp menggunakan global settings dan membuka message yang benar.
- Semua CTA penting memiliki tracking event.
- Case study tampil sebagai structured content, bukan copy panjang tanpa hierarchy.
- Production CSS dan JS custom sudah minified satu baris per file.
- Core Web Vitals memenuhi target pada testing staging atau production awal.
- SEO metadata dan schema valid.
- Tidak ada broken link pada halaman scope.
- Mobile layout tidak memiliki horizontal scroll atau overlap.
- Tim bisa mengedit konten utama melalui WordPress admin tanpa mengubah code.

## 22. Implementation Assumptions

Default asumsi untuk development:

- Gunakan ACF free atau custom fields native. Jangan membuat implementasi bergantung pada ACF Pro kecuali lisensi sudah tersedia.
- Rank Math tetap dipakai untuk metadata dasar. Schema yang membutuhkan struktur khusus boleh dibuat di theme, dengan guard agar tidak duplicate.
- W3 Total Cache tetap dipakai selama tidak mengganggu output custom theme. Jika konflik dengan minification atau cache invalidation muncul di staging, cache plugin boleh diganti dengan approval.
- Angka hasil case study hanya boleh dipublish jika sudah disetujui internal. Jika belum, tampilkan outcome tanpa angka spesifik.
- Gunakan logo VNDC existing, lalu sederhanakan color system ke corporate proof palette: navy/dark text, white/light background, blue/teal accent, dan WhatsApp green hanya untuk CTA WhatsApp.

## 23. Implementation Phasing

Recommended phases:

1. Content audit dan final copy outline.
2. Theme foundation, global settings, asset build, and minification pipeline.
3. Content model: service fields and case study CPT.
4. Template implementation: Home, service, case study.
5. SEO schema, tracking, and CTA wiring.
6. Performance optimization and QA.
7. Staging review, fixes, and production deploy.
