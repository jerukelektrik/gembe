# Bengkel Ban CRM PRD

Date: 2026-05-28

## 1. Ringkasan Produk

Bengkel Ban CRM adalah aplikasi web modern untuk mencatat invoice penjualan dan melihat analitik operasional outlet bengkel ban. Aplikasi ini menggantikan pola dashboard Google Apps Script yang sudah ada dengan sistem yang lebih terstruktur: CRM menjadi sumber data utama, sedangkan Google Sheets dipakai sebagai backup dan export laporan.

MVP berfokus pada satu outlet dan tiga kategori bisnis:

- Barang: oli, chemical, ban, dan barang lain.
- Jasa: balancing, spooring, service rem, nitrogen, finish balance, selep diskbrake, dan jasa lain.
- Understeel: penggantian part kaki-kaki.

Nilai utama MVP adalah membuat data transaksi lebih rapi sejak input, sehingga owner dapat menjawab pertanyaan penting: ban ukuran dan merek apa yang terjual, sparepart apa yang paling sering diganti berdasarkan merek/series/tahun mobil, jasa apa yang paling sering dikerjakan dan sering ikut terjual, serta sales mana yang paling kuat berdasarkan revenue dan jumlah transaksi.

## 2. Latar Belakang

Outlet bengkel ban memiliki transaksi yang sering berisi kombinasi barang, jasa, dan understeel dalam satu invoice. Jika data hanya dicatat sebagai deskripsi bebas, analitik menjadi sulit karena sistem tidak tahu mana ukuran ban, merek ban, part understeel, posisi part, sales, atau hubungan transaksi dengan mobil tertentu.

CRM referensi yang sudah ada menampilkan ringkasan harian, performa bulanan, filter kategori, top barang, top jasa, top understeel, top ban luar, dan leaderboard sales. PRD ini mempertahankan insight yang sudah berguna dari dashboard tersebut, tetapi memperbaiki fondasi datanya melalui input invoice multi-item dan field analitik per kategori.

## 3. Tujuan Produk

- Mencatat transaksi bengkel dalam format invoice yang rapi dan mudah dicari.
- Mendukung satu invoice berisi banyak item dari kategori Barang, Jasa, dan Understeel.
- Menyediakan analitik penjualan ban berdasarkan ukuran, merek, qty, revenue, dan periode.
- Menyediakan analitik understeel berdasarkan part yang diganti, posisi, merek mobil, series mobil, tahun mobil, qty, revenue, dan periode.
- Menyediakan analitik jasa berdasarkan volume layanan dan attach rate terhadap pembelian ban atau understeel.
- Menampilkan performa sales berdasarkan gabungan revenue dan jumlah invoice/transaksi.
- Menyediakan export atau backup ke Google Sheets tanpa menjadikan Sheets sebagai tempat edit utama.

## 4. Bukan Tujuan MVP

- Bukan sistem POS lengkap dengan pembayaran kasir, refund, shift kasir, atau printer struk.
- Belum mengelola stok barang secara penuh seperti purchase order, mutasi gudang, minimum stock, atau opname.
- Belum menghitung margin/laba kotor karena harga pokok belum masuk scope MVP.
- Belum mendukung multi-outlet.
- Belum mendukung sinkronisasi dua arah dengan Google Sheets.
- Belum mendukung customer loyalty, reminder servis, WhatsApp broadcast, atau campaign CRM lanjutan.
- Belum mendukung role dan permission kompleks.

## 5. Pengguna Dan Hak Akses

### Owner

Owner menggunakan aplikasi untuk melihat performa outlet, memantau sales, mengecek tren ban, understeel, dan jasa, serta melakukan export laporan. Owner dapat melihat dan mengelola semua data.

### Admin/Kasir

Admin atau kasir menggunakan aplikasi untuk membuat invoice, mengubah invoice sebelum final, mencari riwayat invoice, dan melakukan export bila diberi akses.

### Sales

Sales dikaitkan dengan invoice atau item transaksi. Untuk MVP, sales tidak harus login sendiri. Nama sales dapat dipilih dari master data saat input invoice atau detail item.

### Teknisi

Teknisi belum menjadi user utama MVP. Jika dibutuhkan, nama teknisi dapat dicatat sebagai field opsional pada item jasa atau understeel, tetapi belum dihitung sebagai performa utama.

## 6. Platform Dan Arsitektur

MVP dibangun sebagai aplikasi modern siap deploy:

- Frontend: React untuk input transaksi dan dashboard.
- Backend: Node.js API untuk validasi, penyimpanan, dan agregasi data.
- Database awal: SQLite untuk MVP lokal/internal, dengan struktur yang mudah dipindahkan ke Postgres saat aplikasi perlu deploy lebih serius.
- Google Sheets: export/backup dari data CRM, bukan sumber utama dan bukan tempat edit utama.

CRM adalah source of truth. Semua input dan edit dilakukan di aplikasi. Google Sheets menerima hasil export periodik atau manual untuk arsip dan laporan luar aplikasi.

## 7. Modul Utama MVP

MVP terdiri dari lima modul utama:

- Input Invoice.
- Riwayat Invoice.
- Dashboard Overview.
- Analitik Kategori: Ban, Understeel, dan Jasa.
- Sales Leaderboard.

Modul export Google Sheets tersedia sebagai fungsi pendukung, bukan halaman utama analitik.

## 8. Struktur Data Invoice

Satu invoice terdiri dari data header dan banyak baris detail.

### Header Invoice

Field wajib header invoice:

- Nomor invoice.
- Tanggal invoice.
- Nama pelanggan.
- Merek mobil.
- Series mobil.
- Tahun mobil.

Field opsional header invoice:

- Catatan umum.
- Nama sales utama invoice.
- Status invoice: `Draft`, `Final`, atau `Cancelled`.

Nomor invoice harus unik. Invoice final masih dapat dikoreksi oleh user yang berwenang, tetapi perubahan penting sebaiknya menyimpan timestamp update agar riwayat data lebih jelas.

### Detail Invoice Multi-item

Satu invoice dapat berisi banyak baris item. Setiap baris memiliki field umum:

- Kategori: `Barang`, `Jasa`, atau `Understeel`.
- Nama item/layanan/part.
- Qty.
- Harga satuan.
- Diskon opsional.
- Subtotal.
- Sales item opsional.
- Catatan item opsional.

Subtotal dihitung dari qty, harga satuan, dan diskon. Total invoice dihitung dari seluruh subtotal item.

## 9. Field Khusus Per Kategori

### Barang

Barang mencakup oli, chemical, ban, dan barang lain.

Field Barang:

- Jenis barang: `Ban`, `Oli`, `Chemical`, atau `Lainnya`.
- Nama barang.
- Merek barang.
- Qty.
- Harga satuan.

Jika jenis barang adalah `Ban`, field tambahan wajib:

- Merek ban.
- Ukuran ban.

Field ban opsional:

- Pattern/model ban.
- Posisi ban: depan, belakang, kiri, kanan, atau set.

### Jasa

Jasa mencakup balancing, spooring, service rem, nitrogen, finish balance, selep diskbrake, dan jasa lain.

Field Jasa:

- Tipe layanan.
- Qty.
- Harga satuan.
- Sales item opsional.
- Teknisi opsional.

Daftar tipe layanan disimpan sebagai master data agar nama jasa konsisten untuk analitik.

### Understeel

Understeel mencakup penggantian part kaki-kaki.

Field Understeel:

- Nama part.
- Merek part opsional.
- Posisi part: depan/belakang/kiri/kanan/tengah atau kombinasi yang relevan.
- Qty.
- Harga satuan.
- Sales item opsional.
- Teknisi opsional.

Analitik understeel selalu dapat dikaitkan dengan merek mobil, series mobil, dan tahun mobil dari header invoice.

## 10. Alur Input Invoice

Alur input dibuat cepat dan cocok untuk admin outlet:

1. User membuat invoice baru.
2. User mengisi nomor invoice, tanggal, pelanggan, merek mobil, series mobil, dan tahun mobil.
3. User menambahkan satu atau lebih item.
4. Saat memilih kategori item, form menampilkan field khusus kategori tersebut.
5. Sistem menghitung subtotal item dan total invoice otomatis.
6. User menyimpan sebagai `Draft` atau menyelesaikan sebagai `Final`.
7. Data invoice final langsung masuk ke dashboard dan laporan.

Draft tidak dihitung dalam dashboard revenue. Invoice `Cancelled` tetap disimpan untuk jejak data, tetapi tidak dihitung sebagai penjualan.

## 11. Dashboard Overview

Dashboard Overview adalah layar ringkasan untuk owner.

Scorecard utama:

- Total revenue.
- Total invoice final.
- Rata-rata nilai invoice.
- Qty ban terjual.
- Total jasa dikerjakan.
- Total understeel item diganti.

Visual utama:

- Tren revenue harian/bulanan.
- Proporsi revenue Barang, Jasa, dan Understeel.
- Top item per kategori.
- Sales leaderboard ringkas.

Filter global:

- Periode tanggal.
- Kategori.
- Sales.
- Merek mobil.
- Series mobil.
- Tahun mobil.

## 12. Analitik Ban

Analitik ban menjawab pertanyaan: ukuran dan merek ban apa yang paling banyak terjual dalam periode tertentu.

Metrik utama:

- Qty ban terjual.
- Revenue ban.
- Rata-rata harga jual ban.
- Kontribusi tiap ukuran/merek terhadap total revenue ban.

Tampilan utama:

- Tabel top ban berdasarkan kombinasi ukuran dan merek.
- Tabel top ukuran ban.
- Tabel top merek ban.
- Filter ukuran ban, merek ban, sales, dan periode.

Ban dihitung hanya dari item kategori `Barang` dengan jenis barang `Ban`.

## 13. Analitik Understeel

Analitik understeel menjawab pertanyaan: sparepart apa yang paling sering diganti, untuk merek mobil dan tahun mobil apa, dalam periode tertentu.

Metrik utama:

- Qty part diganti.
- Revenue understeel.
- Frekuensi penggantian per nama part.
- Frekuensi penggantian per merek mobil, series mobil, dan tahun mobil.

Tampilan utama:

- Top part understeel berdasarkan qty.
- Top part understeel berdasarkan revenue.
- Matrix part vs merek/series mobil.
- Filter part, posisi, merek mobil, series mobil, tahun mobil, sales, dan periode.

Contoh insight yang harus bisa dijawab:

- Part kaki-kaki apa yang paling sering diganti bulan ini?
- Mobil merek/series/tahun apa yang paling sering mengganti part tertentu?
- Part apa yang revenue-nya tinggi walaupun qty-nya tidak besar?

## 14. Analitik Jasa

Analitik jasa MVP fokus pada volume layanan dan attach rate.

### Volume Layanan

Metrik volume layanan:

- Qty jasa dikerjakan per tipe layanan.
- Revenue jasa per tipe layanan.
- Tren jasa per periode.

Tampilan utama:

- Top jasa berdasarkan qty.
- Top jasa berdasarkan revenue.
- Tren volume jasa harian/bulanan.

### Attach Rate

Attach rate menjawab jasa apa yang sering ikut terjual saat pelanggan membeli ban atau understeel.

Rumus MVP:

```text
Attach Rate Jasa terhadap Ban = jumlah invoice final yang memiliki item Ban dan jasa tersebut / jumlah invoice final yang memiliki item Ban

Attach Rate Jasa terhadap Understeel = jumlah invoice final yang memiliki item Understeel dan jasa tersebut / jumlah invoice final yang memiliki item Understeel
```

Tampilan utama:

- Jasa paling sering ikut dengan pembelian ban.
- Jasa paling sering ikut dengan understeel.
- Jumlah invoice terkait dan persentase attach rate.

## 15. Sales Leaderboard

Sales leaderboard menjawab pertanyaan: sales mana yang paling jago jualan.

MVP menggabungkan dua metrik utama:

- Total revenue final.
- Jumlah invoice final.

Metrik tambahan:

- Rata-rata nilai invoice.
- Revenue Barang, Jasa, dan Understeel per sales.
- Qty ban terjual per sales.

Default leaderboard menampilkan `Sales Score` agar revenue dan jumlah transaksi sama-sama terbaca.

Rumus MVP:

```text
Revenue Index = revenue sales / revenue sales tertinggi dalam periode
Invoice Index = jumlah invoice sales / jumlah invoice sales tertinggi dalam periode
Sales Score = (Revenue Index * 0.6) + (Invoice Index * 0.4)
```

Jika dua sales memiliki score sama, urutan ditentukan oleh revenue lebih tinggi. Dashboard tetap menampilkan revenue dan jumlah invoice secara eksplisit agar ranking mudah dipahami.

## 16. Riwayat Invoice Dan Pencarian

Riwayat Invoice digunakan untuk operasional harian.

Fitur utama:

- Tabel invoice dengan tanggal, nomor invoice, pelanggan, mobil, total, status, dan sales.
- Search nomor invoice, nama pelanggan, merek mobil, atau series mobil.
- Filter status, tanggal, sales, dan kategori item.
- Detail invoice menampilkan header dan seluruh item.
- Edit invoice draft.
- Koreksi invoice final untuk user berwenang.
- Cancel invoice.

Riwayat harus membantu admin menemukan transaksi lama tanpa harus membuka Google Sheets.

## 17. Master Data

Master data membuat input konsisten sehingga dashboard tidak kacau karena variasi penulisan.

Master data MVP:

- Sales.
- Merek mobil.
- Series mobil.
- Tahun mobil tetap input angka, bukan master list wajib.
- Tipe jasa.
- Jenis barang.
- Merek ban.
- Ukuran ban.
- Part understeel.
- Posisi part.

User dapat menambah nilai baru saat input jika belum ada, tetapi aplikasi perlu menyarankan pilihan yang sudah ada agar tidak muncul duplikasi seperti `Avanza`, `AVANZA`, dan `Toyota Avanza` untuk konsep yang sama.

## 18. Export Dan Backup Google Sheets

Google Sheets digunakan sebagai backup dan laporan.

Fitur export MVP:

- Export invoice header.
- Export invoice items.
- Export ringkasan dashboard periode aktif.
- Export manual dari aplikasi.

Struktur minimal sheet:

- `Invoices`: satu baris per invoice.
- `InvoiceItems`: satu baris per item invoice.
- `DashboardSummary`: ringkasan hasil agregasi periode export.

MVP tidak mengizinkan edit dari Google Sheets lalu sinkron balik ke CRM.

## 19. Validasi Dan Error Handling

Validasi input wajib:

- Nomor invoice tidak boleh kosong dan harus unik.
- Tanggal invoice wajib.
- Nama pelanggan wajib.
- Merek mobil, series mobil, dan tahun mobil wajib.
- Invoice final harus memiliki minimal satu item.
- Qty harus lebih besar dari 0.
- Harga satuan tidak boleh negatif.
- Item ban wajib memiliki merek ban dan ukuran ban.
- Item jasa wajib memiliki tipe layanan.
- Item understeel wajib memiliki nama part dan posisi part.

Error handling:

- Jika simpan invoice gagal, data yang sedang diketik tidak hilang.
- Jika export Google Sheets gagal, transaksi CRM tetap tersimpan dan user melihat pesan gagal export.
- Jika dashboard gagal memuat data, user melihat pesan error dan tombol retry.
- Jika filter tidak menemukan data, tampilkan empty state yang jelas.

## 20. Testing Dan Acceptance Criteria

### Input Invoice

- User dapat membuat invoice final dengan satu item Barang.
- User dapat membuat invoice final dengan kombinasi Ban, Jasa, dan Understeel dalam satu invoice.
- Sistem menolak invoice final tanpa item.
- Sistem menolak nomor invoice duplikat.
- Total invoice sama dengan jumlah subtotal item.

### Analitik Ban

- Item ban muncul di analitik ban berdasarkan merek dan ukuran.
- Item barang non-ban tidak masuk analitik ban.
- Filter periode mengubah hasil analitik ban dengan benar.

### Analitik Understeel

- Item understeel terhubung dengan merek mobil, series mobil, dan tahun mobil dari header invoice.
- Top part berdasarkan qty dan revenue dihitung dengan benar.
- Filter merek/series/tahun mobil mengubah hasil dengan benar.

### Analitik Jasa

- Top jasa berdasarkan qty dan revenue dihitung dari item jasa saja.
- Attach rate terhadap ban menghitung invoice yang memiliki ban sebagai denominator.
- Attach rate terhadap understeel menghitung invoice yang memiliki understeel sebagai denominator.

### Sales Leaderboard

- Revenue sales dihitung dari invoice final dalam periode aktif.
- Jumlah invoice sales menghitung invoice unik, bukan jumlah item.
- Sales Score mengikuti formula revenue index dan invoice index.

### Export

- Export invoice menghasilkan data header dan item yang dapat dibuka di Google Sheets.
- Kegagalan export tidak menghapus atau mengubah data di CRM.

## 21. Prioritas Implementasi MVP

Urutan prioritas yang disarankan:

1. Fondasi aplikasi, database, dan master data dasar.
2. Input invoice multi-item dengan validasi kategori.
3. Riwayat invoice dan pencarian.
4. Dashboard Overview.
5. Analitik Ban.
6. Analitik Understeel.
7. Analitik Jasa volume dan attach rate.
8. Sales Leaderboard.
9. Export Google Sheets.

## 22. Keputusan Yang Sudah Disepakati

- Fase pertama mendukung satu outlet.
- CRM menjadi sumber data utama.
- Google Sheets hanya untuk backup/export, bukan tempat edit utama.
- Invoice wajib mendukung multi-item.
- Detail item dipisah berdasarkan kategori agar analitik lebih akurat.
- Analitik sales menggabungkan revenue dan jumlah invoice/transaksi.
- Analitik jasa MVP mencakup volume layanan dan attach rate.
- Aplikasi dibangun sebagai web app modern siap deploy dengan React, backend Node.js, dan database.

## 23. Risiko Dan Catatan Lanjutan

- Kualitas analitik sangat tergantung konsistensi master data, terutama merek mobil, series mobil, ukuran ban, dan nama part.
- Jika outlet membutuhkan stok, modul inventory perlu menjadi fase lanjutan terpisah.
- Jika jumlah user bertambah, perlu login, role, audit log, dan database server seperti Postgres.
- Jika owner ingin menghitung sales berdasarkan margin, sistem perlu menyimpan harga pokok barang/part.
- Jika Google Sheets harus menjadi backup otomatis, aplikasi perlu konfigurasi Google API dan mekanisme retry export.
