# UI/UX Design Plan Family Learning MVP

Tanggal: 2026-05-30

Referensi PRD: `docs/superpowers/specs/2026-05-30-family-learning-mvp-prd.md`

## 1. Tujuan Desain

Design plan ini menerjemahkan PRD Family Learning MVP menjadi arah UI/UX untuk web app keluarga dengan dua akun: orangtua dan anak. Desain harus membantu orangtua mengelola belajar tanpa terasa seperti sistem sekolah yang berat, sekaligus membuat anak kelas 2 SD merasa mudah, jelas, dan termotivasi.

Prinsip utama:

- Anak melihat sedikit pilihan, tombol besar, bahasa sederhana, dan feedback cepat.
- Orangtua melihat informasi padat, antrean tindakan jelas, dan form yang efisien.
- Poin dan reward tampil sebagai motivasi, bukan sebagai satu-satunya fokus.
- Semua layar harus mobile-first karena rutinitas keluarga kemungkinan sering dibuka dari ponsel.
- Desain harus bisa mengikuti anak naik kelas tanpa mengubah struktur utama aplikasi.

## 2. Product Personality

Karakter produk:

- Hangat, rapi, dan mendukung.
- Edukatif tanpa terasa formal seperti portal sekolah.
- Playful secukupnya di akun anak, tenang dan utilitarian di akun orangtua.
- Optimistis, tetapi tidak berisik.

Kata rasa:

- Jelas.
- Ramah.
- Terarah.
- Ringan.
- Terpercaya.

Yang harus dihindari:

- Terlalu ramai dengan ilustrasi, badge, confetti, atau animasi.
- Layout dashboard orangtua yang terlalu seperti landing page.
- Emoji sebagai ikon struktural.
- Reward yang terlalu mendominasi belajar.
- Warna pastel satu nada yang membuat hierarchy lemah.

## 3. Design Direction

Gaya desain yang direkomendasikan adalah **warm educational utility**: fondasi visual bersih seperti SaaS ringan, diberi aksen warna ramah anak pada momen motivasi.

Arahan visual:

- Light mode sebagai default.
- Surface putih dan netral hangat untuk area kerja utama.
- Accent color berbeda untuk konteks belajar, aktivitas, poin, reward, dan approval.
- Cards hanya untuk item berulang, summary, reward, soal, dan modal. Hindari card di dalam card.
- Radius 8px untuk komponen orangtua, 12px untuk komponen anak yang membutuhkan rasa lebih ramah.
- Shadow halus hanya untuk overlay, modal, bottom sheet, atau item interaktif penting.

## 4. Information Architecture

### 4.1 Mode Orangtua

Navigasi utama orangtua:

- Dashboard.
- Aktivitas.
- Mapel & Materi.
- Soal.
- AI Generator.
- Review.
- Reward.
- Pengaturan.

Prioritas layar:

1. Dashboard: tindakan yang perlu diselesaikan hari ini.
2. Review: approval aktivitas, review uraian, approval reward.
3. AI Generator: pembuatan draft soal cepat.
4. Soal dan Paket Latihan: pengelolaan konten.
5. Aktivitas dan Reward: aturan motivasi.
6. Pengaturan: profil anak, kelas aktif, semester, PIN.

Desktop layout:

- Sidebar kiri permanen untuk navigasi.
- Header atas berisi kelas aktif, nama anak, dan quick action.
- Main content memakai max width yang nyaman untuk dashboard dan form.

Mobile layout:

- Top app bar dengan nama layar dan menu.
- Bottom navigation untuk 4 tujuan terpenting: Dashboard, Review, Belajar, Reward.
- Menu lainnya masuk ke sheet atau drawer.

### 4.2 Mode Anak

Navigasi utama anak:

- Hari Ini.
- Latihan.
- Aktivitas.
- Poin.
- Reward.

Mobile layout anak:

- Bottom navigation maksimal 5 item, selalu pakai ikon dan label.
- Poin tampil di header kecil, bukan banner besar di semua layar.
- Setiap layar punya satu primary action yang jelas.

Desktop/tablet layout anak:

- Grid dua kolom sederhana: agenda hari ini dan latihan/reward.
- Elemen tetap besar, tidak menjadi terlalu padat seperti dashboard orangtua.

## 5. Key Screens

### 5.1 Login

Tujuan:

- Anak cepat masuk dengan PIN/kode.
- Orangtua masuk dengan password tanpa membingungkan anak.

Layout:

- Segmented control: Anak dan Orangtua.
- Mode Anak menjadi default jika aplikasi sering dibuka oleh anak.
- Form anak hanya satu field PIN/kode dan tombol masuk.
- Form orangtua berisi password dan opsi lihat/sembunyikan password.

UX rules:

- Error dekat field.
- Jangan sebut apakah PIN atau akun yang salah secara detail.
- Touch target minimal 44px.

### 5.2 Dashboard Orangtua

Tujuan:

- Orangtua tahu apa yang harus ditindak hari ini.

Konten:

- Summary row: poin anak, latihan selesai minggu ini, aktivitas pending, reward pending.
- Action queue: aktivitas menunggu approval, jawaban uraian menunggu review, klaim reward.
- Progress minggu ini.
- Riwayat latihan terbaru.
- Quick action: buat latihan, generate soal, tambah aktivitas, tambah reward.

UX rules:

- Pending action harus lebih menonjol daripada chart.
- Dashboard tidak boleh dipenuhi grafik saat data masih sedikit.
- Empty state harus memberi CTA langsung.

### 5.3 Aktivitas Orangtua

Tujuan:

- Orangtua mengatur template aktivitas, jadwal, poin, dan kebutuhan approval.

Layout:

- List aktivitas dengan status aktif/nonaktif.
- Form tambah/edit di drawer atau modal.
- Jadwal memakai checkbox hari.
- Poin memakai numeric input/stepper.
- Approval memakai toggle.

States:

- Aktif.
- Tidak aktif.
- Perlu approval.
- Tidak dijadwalkan hari ini.

### 5.4 Mapel & Materi

Tujuan:

- Orangtua mengelola struktur belajar yang bisa mengikuti naik kelas.

Layout:

- Filter kelas dan semester.
- List mapel di kiri atau atas.
- Materi/topik sebagai list utama.
- Empty state per mapel: tambah materi pertama.

UX rules:

- Kelas aktif harus terlihat jelas.
- Perubahan kelas aktif diberi konfirmasi karena memengaruhi konten anak.

### 5.5 Bank Soal

Tujuan:

- Orangtua membuat, mencari, mengedit, dan mengarsipkan soal.

Layout:

- Filter: kelas, semester, mapel, materi, tipe, status.
- Table pada desktop.
- Card list pada mobile.
- Badge status: draft, siap, arsip.
- Detail soal dibuka di side panel atau halaman detail.

UX rules:

- Pilihan ganda wajib memperlihatkan jawaban benar.
- Uraian wajib punya jawaban contoh atau catatan review.
- Soal AI draft diberi label jelas.

### 5.6 AI Generator Soal

Tujuan:

- Orangtua membuat draft soal dari input terstruktur.

Layout:

- Step 1: Konteks soal.
- Step 2: Opsi output.
- Step 3: Review draft.
- Step 4: Simpan ke bank soal.

Field utama:

- Kelas.
- Semester.
- Mapel.
- Materi.
- Tipe soal.
- Jumlah soal.

Field lanjutan:

- Tingkat kesulitan.
- Tujuan pembelajaran.
- Format opsi.
- Sertakan kunci.
- Sertakan pembahasan.
- Contoh gaya soal.
- Catatan konteks sekolah.

UX rules:

- Pakai progressive disclosure untuk field lanjutan.
- Tombol generate disabled sampai field wajib lengkap.
- Simpan input terakhir jika generate gagal.
- Draft hasil AI tidak langsung terbit.
- Review screen memungkinkan edit inline sebelum simpan.
- Tampilkan disclaimer pendek bahwa soal perlu dicek orangtua.

### 5.7 Paket Latihan

Tujuan:

- Orangtua menyusun latihan digital dari bank soal.

Layout:

- Form judul, mapel, materi, poin maksimal.
- Picker soal dengan filter.
- Preview urutan soal.
- Status draft/terbit.

UX rules:

- Tampilkan jumlah soal dan komposisi tipe.
- Jika paket belum punya soal, tombol terbit disabled.
- Jika soal uraian ada, beri info bahwa review manual diperlukan.

### 5.8 Review Orangtua

Tujuan:

- Mengumpulkan semua pekerjaan yang butuh keputusan orangtua.

Tabs:

- Aktivitas.
- Uraian.
- Reward.
- Riwayat.

UX rules:

- Approval action jelas: Setujui dan Tolak.
- Tolak aktivitas/reward dapat menambahkan catatan opsional.
- Aksi destruktif atau berpengaruh pada poin memakai konfirmasi.
- Setelah approval, item keluar dari antrean dengan feedback singkat.

### 5.9 Beranda Anak: Hari Ini

Tujuan:

- Anak tahu apa yang bisa dilakukan sekarang.

Konten:

- Sapaan singkat.
- Poin saat ini.
- Aktivitas hari ini.
- Latihan tersedia.
- Reward yang hampir bisa ditukar.

UX rules:

- Maksimal 2-3 area utama di first viewport.
- Primary action terlihat jelas.
- Copy pendek, misalnya "Kerjakan latihan" atau "Tandai selesai".
- Hindari tabel di mode anak.

### 5.10 Latihan Anak

Tujuan:

- Anak mengerjakan soal digital dengan fokus.

Layout:

- Satu soal per layar untuk mobile.
- Progress indicator, misalnya 3 dari 10.
- Pilihan jawaban sebagai button besar.
- Tombol lanjut dan kembali.
- Review jawaban sebelum submit jika diperlukan.

UX rules:

- Pilihan jawaban minimal 44px tinggi.
- Jangan terlalu banyak distraksi saat mengerjakan.
- Setelah submit, tampilkan hasil ringkas dan poin yang masuk.
- Uraian memakai textarea besar dengan helper text sederhana.

### 5.11 Aktivitas Anak

Tujuan:

- Anak menandai aktivitas rumah atau belajar selesai.

Layout:

- List aktivitas hari ini.
- Setiap item menampilkan nama, poin, dan status.
- Tombol "Saya sudah selesai" untuk item yang bisa diajukan.

States:

- Belum.
- Menunggu orangtua.
- Disetujui.
- Ditolak.
- Tidak dijadwalkan.

UX rules:

- Status tidak boleh hanya warna. Gunakan teks dan ikon.
- Aktivitas yang sudah diajukan tidak bisa diajukan ulang.

### 5.12 Reward Anak

Tujuan:

- Anak melihat reward, memahami poin yang dibutuhkan, dan mengajukan klaim.

Layout:

- Wallet poin di atas.
- Reward card dengan nama, deskripsi, harga poin, status bisa diklaim.
- Progress kecil menuju harga poin jika belum cukup.

UX rules:

- Jika poin cukup, CTA "Tukar reward".
- Jika poin belum cukup, CTA disabled dengan info kurang berapa poin.
- Setelah klaim, status menjadi menunggu orangtua.

## 6. Design System

### 6.1 Color Tokens

Gunakan semantic tokens, bukan raw color langsung di komponen.

Core:

- `background`: neutral 50.
- `surface`: white.
- `surface-muted`: neutral 100.
- `border`: neutral 200.
- `text-primary`: slate 900.
- `text-secondary`: slate 600.
- `text-muted`: slate 500.

Brand:

- `primary`: teal 600 untuk aksi utama dan identitas belajar.
- `primary-soft`: teal 50 untuk highlight ringan.
- `primary-contrast`: white.

Learning:

- `learning`: sky 600.
- `learning-soft`: sky 50.

Activity:

- `activity`: emerald 600.
- `activity-soft`: emerald 50.

Reward:

- `reward`: amber 500.
- `reward-soft`: amber 50.
- `reward-text`: amber 900.

AI:

- `ai`: violet 600.
- `ai-soft`: violet 50.

Feedback:

- `success`: emerald 600.
- `warning`: amber 600.
- `danger`: rose 600.
- `info`: sky 600.

Contrast rules:

- Body text harus memenuhi 4.5:1.
- Secondary text minimal 3:1 untuk teks besar dan 4.5:1 untuk teks kecil.
- Jangan gunakan amber terang untuk teks kecil di atas putih; pakai amber 900 atau slate.

### 6.2 Typography

Rekomendasi font:

- Primary: `Inter` untuk UI orangtua dan konsistensi dashboard.
- Child-friendly alternative for headings: `Nunito Sans` atau `Quicksand` untuk mode anak.
- Jika ingin paling sederhana secara implementasi, gunakan `Inter` untuk semua mode dan tambah weight/spacing yang lebih ramah di mode anak.

Type scale:

- Display: 32px/40, hanya untuk greeting anak atau headline empty state.
- H1: 28px/36.
- H2: 24px/32.
- H3: 20px/28.
- Body: 16px/24.
- Small: 14px/20.
- Caption: 12px/16, hanya untuk metadata dan badge.

Rules:

- Body minimum 16px di mobile.
- Line-height body 1.5.
- Letter spacing default 0.
- Angka poin memakai tabular figures.

### 6.3 Spacing and Layout

Spacing scale:

- 4, 8, 12, 16, 24, 32, 48.

Page gutters:

- Mobile: 16px.
- Tablet: 24px.
- Desktop: 32px.

Container:

- Parent dashboard: max width 1280px.
- Parent forms: max width 880px.
- Child mode: max width 960px.
- Reading/help text: max width 680px.

Breakpoints:

- Small mobile: 375px.
- Tablet: 768px.
- Desktop: 1024px.
- Wide: 1440px.

## 7. Component Plan

Core components:

- App shell.
- Role switch/login panel.
- Sidebar navigation.
- Bottom navigation.
- Top app bar.
- Button.
- Icon button with tooltip/aria-label.
- Input.
- Select.
- Textarea.
- Checkbox group.
- Toggle.
- Stepper/numeric input.
- Segmented control.
- Badge.
- Progress bar.
- Summary metric.
- Action queue item.
- Activity item.
- Question card.
- Answer option button.
- Reward card.
- Modal/dialog.
- Drawer/sheet.
- Toast.
- Empty state.
- Skeleton loader.
- Data table.

Component rules:

- Buttons use icons from one icon family such as Lucide.
- Icon-only buttons require accessible label and tooltip.
- Loading buttons disable repeat submit.
- Destructive actions are visually separated from primary actions.
- Forms use visible labels, not placeholder-only labels.
- Errors appear near the related field.

## 8. Interaction and Motion

Motion principles:

- Motion explains state changes, not decoration.
- Duration 150-300ms for micro-interactions.
- Use transform and opacity, not width/height animation.
- Respect `prefers-reduced-motion`.

Recommended interactions:

- Button press: subtle opacity or background state.
- Drawer/modal: fade + small translate.
- Stepper/generator: step transition with light fade.
- Review queue item: fade out after approval.
- Correct answer feedback: brief success state after submit.

Avoid:

- Continuous bouncing animation.
- Confetti after every activity.
- Layout-shifting hover effects.
- Reward animations that make learning feel secondary.

## 9. Accessibility Plan

Must-have checks:

- Keyboard navigation for all forms, tables, dialogs, and question flows.
- Focus ring visible on all interactive controls.
- Dialog focus trapped while open and returned to trigger when closed.
- Color is never the only status indicator.
- Icon-only controls have labels.
- Bottom nav items have icon and text label.
- Touch targets at least 44px.
- Form errors use clear text and are connected to fields.
- Toasts use polite live region and do not steal focus.
- Route changes move focus to main content.

Mode anak:

- Labels and instructions short.
- Tap targets generous.
- Avoid dense tables.
- Avoid relying on hover.

## 10. Responsive Strategy

Mobile-first rules:

- Anak: one-column flows.
- Orangtua: primary actions first, secondary filters collapse.
- Tables become card lists below tablet width.
- Long filters move into a filter sheet on mobile.
- Fixed bottom navigation reserves bottom padding.
- No horizontal scrolling on mobile.

Desktop enhancements:

- Sidebar for parent mode.
- Multi-column dashboard summaries.
- Split view for bank soal and detail when space allows.
- Wider AI generator review screen for comparing generated draft.

## 11. Data Visualization

MVP chart needs are light. Prioritize plain summaries and short trends.

Recommended:

- Weekly progress: small line chart or bar sparkline.
- Activity consistency: simple calendar strip or horizontal bars.
- Practice completion by mapel: horizontal bar chart.
- Point ledger: table/list, not chart-first.

Rules:

- Every chart has a text summary.
- Chart colors must not rely on red/green only.
- Empty data state explains what to do next.
- Tooltips show exact values.

## 12. Content and Microcopy

Tone:

- Orangtua: clear, direct, calm.
- Anak: simple, encouraging, not childish in a distracting way.

Examples:

- Login anak error: "Kode belum cocok. Coba lagi ya."
- AI generator helper: "Isi konteks soal agar hasilnya lebih sesuai dengan pelajaran anak."
- Draft AI disclaimer: "Periksa dulu sebelum soal diberikan ke anak."
- Activity pending: "Menunggu konfirmasi orangtua."
- Reward disabled: "Kurang 12 poin lagi."
- Approval success: "Aktivitas disetujui. Poin sudah masuk."

Avoid:

- Istilah "prompt", "schema", "ledger", "entity" di UI.
- Pesan error teknis tanpa jalan keluar.
- Copy panjang di layar anak.

## 13. Empty, Loading, and Error States

Empty states:

- Belum ada mapel: CTA "Tambah mapel".
- Belum ada materi: CTA "Tambah materi".
- Belum ada soal: CTA "Buat soal" dan "Generate dengan AI".
- Belum ada latihan: CTA "Buat paket latihan".
- Belum ada reward: CTA "Tambah reward".
- Anak belum punya aktivitas hari ini: pesan ringan dan tidak menyalahkan.

Loading:

- Skeleton untuk dashboard, list soal, reward, dan review queue.
- Button loading untuk submit form dan generate AI.
- Generator AI menampilkan progress message pendek.

Error:

- Error field dekat input.
- Error page untuk session expired dengan CTA login ulang.
- Error AI generator menyimpan field terakhir dan menyediakan retry.
- Error submit latihan menawarkan retry tanpa menghapus jawaban.

## 14. Design QA Checklist

Sebelum implementasi dianggap siap:

- Semua layar utama punya empty, loading, error, dan success state.
- Mobile 375px tidak horizontal scroll.
- Bottom nav anak maksimal 5 item.
- Touch target minimal 44px.
- Text kecil tidak di bawah 12px, body minimal 16px.
- Primary CTA hanya satu per layar.
- Form AI generator tidak menampilkan semua field kompleks sekaligus.
- Reward yang belum cukup poin jelas alasan disabled-nya.
- Status aktivitas dan reward memakai teks + warna/icon.
- Mode anak tidak memakai tabel padat.
- Mode orangtua bisa dipakai cepat untuk approval harian.
- Semua dialog punya escape/cancel path.
- Semua icon-only buttons punya tooltip dan aria-label.

## 15. Implementation Design Phases

### Phase 1: Design Foundation

- App shell untuk parent dan child mode.
- Color tokens, typography, spacing, radius, shadow.
- Core components: button, input, select, card, badge, modal, toast, skeleton.
- Login role switch.

### Phase 2: Parent Admin UX

- Parent dashboard.
- Activity management.
- Subject/topic management.
- Question bank.
- Reward catalog.

### Phase 3: Learning Creation Flow

- AI generator multi-step form.
- Draft review and save flow.
- Practice set builder.
- Published practice management.

### Phase 4: Child Experience

- Child home.
- Practice taking flow.
- Activity submission.
- Points overview.
- Reward store.

### Phase 5: Review and Polish

- Parent review queue.
- Manual scoring for uraian.
- Approval states and point feedback.
- Responsive QA.
- Accessibility QA.

## 16. Open Design Decisions

Keputusan ini bisa divalidasi saat wireframe:

- Apakah mode anak memakai font heading berbeda dari mode orangtua atau cukup satu font saja.
- Apakah parent mobile memakai bottom nav atau drawer utama.
- Apakah AI generator dibuat sebagai halaman penuh atau modal/drawer besar.
- Apakah latihan anak memakai review screen sebelum submit atau langsung submit di soal terakhir.
- Apakah reward card memakai gambar opsional pada MVP atau cukup teks dan ikon.

