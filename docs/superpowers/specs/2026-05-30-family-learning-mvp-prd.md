# PRD Family Learning MVP

Tanggal: 2026-05-30

## 1. Ringkasan Produk

Family Learning MVP adalah web app pendamping belajar harian untuk satu keluarga dengan dua akun: orangtua dan anak. Aplikasi membantu anak mengakses mapel sekolah, mengerjakan latihan soal digital, menyelesaikan aktivitas belajar atau aktivitas rumah, mengumpulkan poin, dan menukar poin dengan reward yang disiapkan orangtua.

Produk ini bukan LMS sekolah penuh. Fokusnya adalah rutinitas keluarga: orangtua menyiapkan konten dan aturan, anak belajar dan beraktivitas, sistem mencatat progress, lalu reward dipakai sebagai motivasi yang sehat.

Anak saat ini berada di kelas 2 SD, tetapi aplikasi harus mendukung perubahan kelas, semester, mapel, dan materi saat anak naik kelas.

## 2. Tujuan Produk

- Membantu orangtua mengatur rutinitas belajar dan aktivitas rumah anak dalam satu tempat.
- Membuat anak termotivasi mengerjakan latihan dan aktivitas melalui sistem poin dan reward.
- Memudahkan orangtua membuat soal sendiri, termasuk dengan bantuan AI generator berbasis field terstruktur.
- Memberi anak pengalaman belajar digital yang sederhana, aman, dan sesuai usia SD.
- Menyediakan fondasi data yang bisa mengikuti kenaikan kelas tanpa membangun ulang aplikasi.

## 3. Pengguna

### Orangtua

Orangtua adalah admin keluarga. Orangtua mengatur akun anak, kelas aktif, mapel, materi, aktivitas harian, soal latihan, katalog reward, dan persetujuan poin aktivitas.

### Anak

Anak adalah pengguna belajar. Anak masuk dengan PIN atau kode pendek, melihat agenda hari ini, mengerjakan latihan soal digital, menandai aktivitas selesai, melihat poin, dan mengajukan penukaran reward.

## 4. Prinsip Produk

- Sederhana dulu, konsisten dipakai harian.
- Orangtua memegang kendali akhir atas konten, poin aktivitas, dan reward.
- Anak mendapat feedback cepat dari latihan digital.
- Aktivitas rumah tetap perlu validasi orangtua agar poin tidak mudah dimanipulasi.
- Kelas, semester, mapel, dan materi harus fleksibel karena anak akan naik kelas.
- AI membantu membuat draft soal, tetapi orangtua tetap meninjau sebelum soal dipakai.

## 5. Ruang Lingkup MVP

### In Scope

- Dua akun: orangtua dan anak.
- Login sederhana: anak memakai PIN atau kode pendek, orangtua memakai password.
- Satu anak untuk MVP.
- Pengaturan profil anak, kelas aktif, semester aktif, dan tahun ajaran.
- Manajemen mapel dan materi oleh orangtua.
- Bank soal manual oleh orangtua.
- AI generator soal dengan input konteks terstruktur.
- Latihan soal digital yang dikerjakan anak di aplikasi.
- Penilaian otomatis untuk pilihan ganda.
- Review manual orangtua untuk soal uraian bila diperlukan.
- Template aktivitas harian yang bisa diedit orangtua.
- Anak dapat menandai aktivitas selesai.
- Aktivitas rumah atau non-digital masuk status menunggu konfirmasi orangtua.
- Sistem poin untuk latihan dan aktivitas.
- Katalog reward dari orangtua.
- Anak dapat menukar poin dengan reward jika poin cukup.
- Orangtua menyetujui atau menolak klaim reward.
- Dashboard progress dasar untuk orangtua dan anak.

### Out of Scope untuk MVP

- Multi-anak.
- Akun guru, sekolah, kelas, atau admin institusi.
- Ranking, leaderboard, fitur sosial, chat, atau komunitas.
- Marketplace soal.
- Pembayaran atau monetisasi.
- Import otomatis dari PDF, DOCX, atau XLSX.
- Koreksi AI otomatis untuk uraian sebagai sumber nilai final.
- Aplikasi mobile native.
- Integrasi WhatsApp atau email otomatis.

## 6. Akun dan Akses

### Login Orangtua

- Orangtua login dengan password.
- Orangtua dapat mengubah password.
- Orangtua dapat mengatur PIN atau kode login anak.
- Mode orangtua tidak boleh dapat diakses dari akun anak.

### Login Anak

- Anak login dengan PIN atau kode pendek.
- Anak tidak melihat fitur admin seperti pengaturan poin, pembuatan soal, dan katalog reward.
- Anak hanya dapat mengerjakan latihan, menandai aktivitas, melihat progress, dan mengajukan reward.

## 7. Fitur Orangtua

### 7.1 Dashboard Orangtua

Dashboard menampilkan ringkasan:

- Poin anak saat ini.
- Latihan yang dikerjakan hari ini.
- Aktivitas menunggu konfirmasi.
- Klaim reward menunggu persetujuan.
- Progress mingguan sederhana.
- Mapel atau materi yang paling sering dilatih.

### 7.2 Pengaturan Anak dan Kelas

Orangtua dapat mengatur:

- Nama anak.
- Kelas aktif, misalnya kelas 2 SD.
- Semester aktif.
- Tahun ajaran.
- PIN atau kode anak.

Riwayat kelas lama tetap tersimpan agar progress sebelumnya tidak hilang saat kelas aktif berubah.

### 7.3 Mapel dan Materi

Orangtua dapat membuat dan mengedit:

- Mapel.
- Materi atau topik per mapel.
- Kelas dan semester terkait.
- Status aktif atau arsip.

Contoh mapel awal untuk kelas 2 SD:

- Matematika.
- Bahasa Indonesia.
- Pendidikan Pancasila.
- Pendidikan Agama Islam.
- Bahasa Inggris.

Mapel dapat diubah sesuai kebutuhan keluarga dan sekolah.

### 7.4 Bank Soal

Orangtua dapat membuat soal manual dengan atribut:

- Kelas.
- Semester.
- Mapel.
- Materi.
- Tipe soal: pilihan ganda atau uraian.
- Pertanyaan.
- Opsi jawaban untuk pilihan ganda.
- Jawaban benar untuk pilihan ganda.
- Jawaban contoh untuk uraian.
- Pembahasan opsional.
- Tingkat kesulitan.
- Status: draft, siap dipakai, arsip.

### 7.5 AI Generator Soal

AI generator membantu orangtua membuat draft soal dari field terstruktur.

Field wajib:

- Kelas.
- Semester.
- Mapel.
- Materi.
- Tipe soal.
- Jumlah soal.

Field opsional:

- Tingkat kesulitan.
- Tujuan pembelajaran.
- Gaya bahasa, misalnya sederhana untuk anak kelas 2 SD.
- Format opsi, misalnya A/B/C.
- Sertakan kunci jawaban.
- Sertakan pembahasan.
- Contoh soal acuan.
- Catatan konteks dari sekolah.

Output generator:

- Daftar soal draft.
- Opsi jawaban untuk pilihan ganda.
- Kunci jawaban.
- Pembahasan singkat jika diminta.
- Label mapel, materi, kelas, semester, dan tingkat kesulitan.

Aturan penting:

- Soal hasil AI selalu berstatus draft.
- Orangtua harus meninjau dan menyimpan soal sebelum soal muncul untuk anak.
- UI harus memberi peringatan bahwa hasil AI perlu diperiksa.

### 7.6 Paket Latihan

Orangtua dapat membuat paket latihan dari bank soal.

Paket latihan memiliki:

- Judul.
- Mapel.
- Materi.
- Kelas dan semester.
- Daftar soal.
- Poin maksimal.
- Status: draft atau terbit.

Saat paket latihan diterbitkan, anak dapat mengerjakannya dari akun anak.

### 7.7 Review Jawaban dan Aktivitas

Orangtua dapat:

- Melihat hasil latihan pilihan ganda.
- Memberi nilai atau catatan untuk jawaban uraian.
- Menyetujui atau menolak aktivitas yang diajukan anak.
- Melihat riwayat poin yang masuk.

### 7.8 Aktivitas dan Jadwal

Aplikasi menyediakan template aktivitas awal, lalu orangtua dapat menambah atau mengedit aktivitas.

Contoh template:

- Membaca buku.
- Latihan mapel.
- Sholat.
- Menata buku.
- Gosok gigi.
- Membantu pekerjaan rumah.
- TPA atau kegiatan agama.

Setiap aktivitas memiliki:

- Nama aktivitas.
- Deskripsi opsional.
- Jadwal hari.
- Poin.
- Perlu persetujuan orangtua atau tidak.
- Status aktif.

Default MVP: aktivitas rumah dan non-digital perlu persetujuan orangtua.

### 7.9 Katalog Reward

Orangtua membuat katalog reward dengan:

- Nama reward.
- Deskripsi.
- Harga poin.
- Status aktif atau tidak aktif.
- Catatan opsional.

Klaim reward oleh anak masuk ke antrean persetujuan orangtua.

Jika klaim disetujui:

- Status klaim menjadi disetujui.
- Poin anak berkurang sesuai harga reward.
- Sistem mengecek ulang saldo poin saat approval. Jika saldo sudah tidak cukup, approval diblokir sampai orangtua menyesuaikan saldo atau menolak klaim.

Jika klaim ditolak:

- Status klaim menjadi ditolak.
- Poin anak tidak berkurang.

## 8. Fitur Anak

### 8.1 Beranda Hari Ini

Anak melihat:

- Sapaan sederhana.
- Poin saat ini.
- Aktivitas hari ini.
- Latihan yang tersedia.
- Reward yang hampir tercapai.

### 8.2 Latihan Mapel

Anak dapat:

- Memilih paket latihan yang diterbitkan orangtua.
- Menjawab soal pilihan ganda atau uraian.
- Melihat hasil pilihan ganda setelah submit.
- Melihat status jawaban uraian jika menunggu review orangtua.

Poin latihan:

- Pilihan ganda dapat memberi poin otomatis berdasarkan skor.
- Uraian dapat memberi poin setelah orangtua memberi nilai.

### 8.3 Aktivitas Rumah

Anak dapat:

- Melihat aktivitas yang dijadwalkan hari ini.
- Menandai aktivitas sebagai selesai.
- Menambahkan catatan singkat opsional.

Setelah dikirim, aktivitas masuk status menunggu persetujuan orangtua. Poin masuk setelah orangtua menyetujui.

### 8.4 Progress dan Poin

Anak dapat melihat:

- Total poin.
- Poin dari latihan.
- Poin dari aktivitas.
- Riwayat singkat pencapaian.
- Reward yang bisa ditukar.

### 8.5 Toko Reward

Anak dapat:

- Melihat reward aktif.
- Melihat harga poin.
- Mengajukan klaim jika poin cukup.
- Melihat status klaim: menunggu, disetujui, atau ditolak.

## 9. Sistem Poin

Sistem poin memakai ledger agar setiap perubahan poin tercatat.

Sumber poin:

- Latihan pilihan ganda otomatis.
- Latihan uraian setelah review orangtua.
- Aktivitas harian setelah persetujuan orangtua.
- Penyesuaian manual oleh orangtua jika diperlukan.

Aturan awal:

- Poin latihan pilihan ganda masuk otomatis setelah submit.
- Poin aktivitas rumah masuk setelah persetujuan orangtua.
- Poin reward dikurangi saat klaim disetujui, bukan saat diajukan.
- Saldo poin harus divalidasi ulang saat klaim reward disetujui.
- Semua perubahan poin harus memiliki alasan dan timestamp.

Contoh perhitungan latihan:

- Skor 100 persen: poin penuh.
- Skor 80 sampai 99 persen: poin proporsional sesuai skor.
- Skor di bawah 80 persen: poin proporsional, tetapi tetap memberi apresiasi jika orangtua mengaktifkan aturan minimum.

Aturan detail poin harus bisa diedit orangtua pada fase berikutnya. Untuk MVP, poin dapat diatur per aktivitas dan per paket latihan.

## 10. Reward

Reward berasal dari katalog orangtua. Anak tidak membuat reward custom pada MVP.

Alur klaim:

1. Orangtua membuat reward dan harga poin.
2. Anak melihat reward di toko reward.
3. Anak mengajukan klaim jika poin cukup.
4. Orangtua menyetujui atau menolak.
5. Jika disetujui, sistem mengurangi poin dan menandai reward disetujui.

## 11. Data Utama

Entitas inti:

- User.
- ChildProfile.
- SchoolLevel atau GradePeriod.
- Subject.
- Topic.
- Question.
- PracticeSet.
- PracticeAttempt.
- PracticeAnswer.
- ActivityTemplate.
- ActivityLog.
- PointLedger.
- Reward.
- RewardClaim.

Relasi utama:

- Satu orangtua memiliki satu profil anak pada MVP.
- Anak memiliki kelas aktif dan riwayat kelas.
- Mapel memiliki banyak materi.
- Materi memiliki banyak soal.
- Paket latihan memiliki banyak soal.
- Anak memiliki banyak attempt latihan.
- Aktivitas dibuat dari template dan menghasilkan log harian.
- Semua poin masuk atau keluar dicatat di PointLedger.
- RewardClaim mengacu pada Reward dan anak.

## 12. Alur Utama

### 12.1 Setup Awal

1. Orangtua membuat password.
2. Orangtua membuat profil anak.
3. Orangtua mengatur PIN anak.
4. Orangtua memilih kelas dan semester aktif.
5. Orangtua menyiapkan mapel, materi, aktivitas, dan reward awal.

### 12.2 Membuat Soal dengan AI

1. Orangtua membuka AI Generator Soal.
2. Orangtua mengisi kelas, semester, mapel, materi, tipe soal, dan jumlah soal.
3. Orangtua menambahkan opsi seperti kesulitan, tujuan pembelajaran, kunci jawaban, dan pembahasan.
4. Sistem menghasilkan draft soal.
5. Orangtua meninjau, mengedit, lalu menyimpan soal ke bank soal.

### 12.3 Anak Mengerjakan Latihan

1. Anak login dengan PIN atau kode.
2. Anak memilih latihan mapel.
3. Anak menjawab soal.
4. Sistem menyimpan attempt.
5. Sistem memberi skor otomatis untuk pilihan ganda.
6. Poin masuk otomatis untuk bagian yang bisa dinilai otomatis.
7. Jawaban uraian masuk review orangtua jika ada.

### 12.4 Anak Menyelesaikan Aktivitas

1. Anak membuka aktivitas hari ini.
2. Anak menandai aktivitas selesai.
3. Aktivitas masuk antrean orangtua.
4. Orangtua menyetujui atau menolak.
5. Jika disetujui, poin masuk ke dompet anak.

### 12.5 Anak Menukar Reward

1. Anak membuka toko reward.
2. Anak memilih reward yang poinnya cukup.
3. Anak mengajukan klaim.
4. Orangtua menyetujui atau menolak.
5. Jika disetujui, poin berkurang dan klaim ditandai selesai.

## 13. Dashboard dan Analitik

### Orangtua

Minimal menampilkan:

- Poin anak.
- Jumlah latihan selesai minggu ini.
- Aktivitas menunggu persetujuan.
- Reward menunggu persetujuan.
- Riwayat latihan terbaru.
- Aktivitas paling konsisten.

### Anak

Minimal menampilkan:

- Poin saat ini.
- Aktivitas hari ini.
- Latihan yang tersedia.
- Reward yang bisa atau hampir bisa ditukar.
- Status klaim reward terakhir.

## 14. UX dan Visual

Karakter UI:

- Ramah untuk anak SD.
- Tetap rapi dan efisien untuk orangtua.
- Bahasa Indonesia sederhana.
- Tombol besar untuk akun anak.
- Navigasi orangtua lebih padat, tetapi tetap mudah dipindai.

Prinsip layar anak:

- Tidak terlalu banyak teks.
- Fokus ke tindakan hari ini.
- Feedback positif setelah submit latihan atau aktivitas.
- Poin terlihat jelas, tetapi tidak mendominasi proses belajar.

Prinsip layar orangtua:

- Mudah mengelola konten.
- Mudah melihat antrean yang perlu disetujui.
- Mudah membuat soal dari manual maupun AI.
- Hindari istilah teknis seperti "entity", "prompt", atau "schema" di UI.

## 15. Error Handling

- Jika anak salah PIN, tampilkan pesan sederhana tanpa membocorkan detail akun.
- Jika AI generator gagal, simpan input terakhir agar orangtua tidak mengetik ulang.
- Jika hasil AI kosong atau tidak sesuai format, tampilkan pesan dan minta generate ulang.
- Jika latihan gagal disubmit karena koneksi, simpan jawaban sementara di browser bila memungkinkan.
- Jika aktivitas sudah disetujui, anak tidak bisa mengubahnya tanpa orangtua.
- Jika poin tidak cukup, tombol klaim reward dinonaktifkan dan tampilkan berapa poin lagi yang dibutuhkan.
- Jika dua proses poin terjadi bersamaan, PointLedger menjadi sumber kebenaran agar saldo tidak salah.

## 16. Kebutuhan Teknis

Rekomendasi basis aplikasi:

- Next.js untuk web app.
- Supabase untuk database dan autentikasi sederhana.
- Vercel untuk deployment.
- Integrasi AI melalui server-side API route agar kunci API tidak terekspos ke browser.

Catatan:

- Detail provider AI dapat diputuskan pada fase implementasi.
- Prompt AI harus dibuat dari field terstruktur, bukan dari teks bebas saja.
- Semua request AI harus menghasilkan draft yang bisa direview orangtua.

## 17. Keamanan dan Privasi

- Data anak hanya digunakan untuk kebutuhan aplikasi keluarga.
- PIN anak tidak boleh disimpan dalam bentuk teks asli.
- Password orangtua harus disimpan dengan mekanisme autentikasi yang aman.
- Kunci API AI hanya berada di server.
- Akun anak tidak boleh mengakses endpoint admin.
- Semua aksi penting, seperti approval poin dan reward, harus mencatat waktu dan aktor.

## 18. Success Metrics

MVP dianggap berhasil jika:

- Orangtua dapat membuat profil anak, mapel, materi, soal, aktivitas, dan reward tanpa bantuan teknis.
- Anak dapat login, mengerjakan latihan, dan melihat poin.
- Poin latihan pilihan ganda masuk otomatis.
- Aktivitas rumah dapat diajukan anak dan disetujui orangtua.
- Anak dapat mengajukan klaim reward dari katalog.
- Orangtua dapat menyetujui klaim reward dan saldo poin berkurang benar.
- Orangtua dapat mengganti kelas aktif tanpa kehilangan riwayat lama.

## 19. Acceptance Criteria MVP

- Orangtua bisa login dengan password.
- Anak bisa login dengan PIN atau kode.
- Orangtua bisa mengatur kelas aktif anak.
- Orangtua bisa membuat mapel dan materi.
- Orangtua bisa membuat soal manual pilihan ganda dan uraian.
- Orangtua bisa generate draft soal menggunakan field kelas, semester, mapel, materi, tipe soal, dan jumlah soal.
- Orangtua bisa menyimpan draft soal AI ke bank soal setelah review.
- Orangtua bisa membuat paket latihan dan menerbitkannya.
- Anak bisa mengerjakan paket latihan digital.
- Sistem bisa menilai pilihan ganda otomatis.
- Sistem bisa mencatat jawaban uraian untuk review orangtua.
- Anak bisa menandai aktivitas harian selesai.
- Orangtua bisa menyetujui atau menolak aktivitas.
- Poin aktivitas masuk hanya setelah approval.
- Orangtua bisa membuat katalog reward.
- Anak bisa mengajukan klaim reward jika poin cukup.
- Orangtua bisa menyetujui atau menolak klaim reward.
- Saldo poin tercatat melalui ledger dan tidak hanya angka tunggal.

## 20. Keputusan MVP untuk Mengurangi Ambiguitas

Keputusan ini dipakai sebagai default saat masuk implementation plan:

- Jawaban uraian dinilai manual oleh orangtua pada MVP. AI belum memberi nilai atau saran nilai.
- Paket latihan boleh dikerjakan ulang, tetapi poin hanya diberikan untuk attempt pertama yang selesai pada paket tersebut. Orangtua dapat membuat paket baru jika ingin memberi poin lagi untuk materi yang sama.
- Aktivitas harian hanya bisa diajukan satu kali per aktivitas per tanggal.
- Reward aktif boleh diklaim berulang kali selama poin cukup, kecuali orangtua menonaktifkan reward tersebut.
- Export riwayat progress ke CSV atau PDF tidak masuk MVP.

## 21. Rencana Design UI/UX

Rencana desain ini menjadi pegangan visual dan pengalaman pengguna untuk Family Learning MVP. Fokusnya adalah membuat aplikasi terasa hangat untuk keluarga, mudah dipakai anak SD, dan tetap efisien untuk orangtua.

### 21.1 Tujuan Desain

Desain harus membantu orangtua mengelola belajar tanpa terasa seperti sistem sekolah yang berat, sekaligus membuat anak kelas 2 SD merasa mudah, jelas, dan termotivasi.

Prinsip utama:

- Anak melihat sedikit pilihan, tombol besar, bahasa sederhana, dan feedback cepat.
- Orangtua melihat informasi padat, antrean tindakan jelas, dan form yang efisien.
- Poin dan reward tampil sebagai motivasi, bukan sebagai satu-satunya fokus.
- Semua layar mobile-first karena rutinitas keluarga kemungkinan sering dibuka dari ponsel.
- Desain harus bisa mengikuti anak naik kelas tanpa mengubah struktur utama aplikasi.

### 21.2 Product Personality

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

### 21.3 Design Direction

Gaya desain yang direkomendasikan adalah **warm educational utility**: fondasi visual bersih seperti SaaS ringan, diberi aksen warna ramah anak pada momen motivasi.

Arahan visual:

- Light mode sebagai default.
- Surface putih dan netral hangat untuk area kerja utama.
- Accent color berbeda untuk konteks belajar, aktivitas, poin, reward, dan approval.
- Cards hanya untuk item berulang, summary, reward, soal, dan modal. Hindari card di dalam card.
- Radius 8px untuk komponen orangtua, 12px untuk komponen anak yang membutuhkan rasa lebih ramah.
- Shadow halus hanya untuk overlay, modal, bottom sheet, atau item interaktif penting.

### 21.4 Information Architecture

#### Mode Orangtua

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

#### Mode Anak

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

### 21.5 Key Screens

#### Login

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

#### Dashboard Orangtua

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

#### Aktivitas Orangtua

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

#### Mapel & Materi

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

#### Bank Soal

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

#### AI Generator Soal

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

#### Paket Latihan

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

#### Review Orangtua

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

#### Beranda Anak: Hari Ini

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

#### Latihan Anak

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

#### Aktivitas Anak

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

#### Reward Anak

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

### 21.6 Design System

#### Color Tokens

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

#### Typography

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

#### Spacing and Layout

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

### 21.7 Component Plan

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

### 21.8 Interaction and Motion

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

### 21.9 Accessibility Plan

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

### 21.10 Responsive Strategy

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

### 21.11 Data Visualization

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

### 21.12 Content and Microcopy

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

### 21.13 Empty, Loading, and Error States

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

### 21.14 Design QA Checklist

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

### 21.15 Implementation Design Phases

#### Phase 1: Design Foundation

- App shell untuk parent dan child mode.
- Color tokens, typography, spacing, radius, shadow.
- Core components: button, input, select, card, badge, modal, toast, skeleton.
- Login role switch.

#### Phase 2: Parent Admin UX

- Parent dashboard.
- Activity management.
- Subject/topic management.
- Question bank.
- Reward catalog.

#### Phase 3: Learning Creation Flow

- AI generator multi-step form.
- Draft review and save flow.
- Practice set builder.
- Published practice management.

#### Phase 4: Child Experience

- Child home.
- Practice taking flow.
- Activity submission.
- Points overview.
- Reward store.

#### Phase 5: Review and Polish

- Parent review queue.
- Manual scoring for uraian.
- Approval states and point feedback.
- Responsive QA.
- Accessibility QA.

### 21.16 Open Design Decisions

Keputusan ini bisa divalidasi saat wireframe:

- Apakah mode anak memakai font heading berbeda dari mode orangtua atau cukup satu font saja.
- Apakah parent mobile memakai bottom nav atau drawer utama.
- Apakah AI generator dibuat sebagai halaman penuh atau modal/drawer besar.
- Apakah latihan anak memakai review screen sebelum submit atau langsung submit di soal terakhir.
- Apakah reward card memakai gambar opsional pada MVP atau cukup teks dan ikon.
