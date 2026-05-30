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
