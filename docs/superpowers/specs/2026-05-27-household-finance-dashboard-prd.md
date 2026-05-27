# PRD: Household Finance Dashboard

Tanggal: 2026-05-27
Status: Approved for planning review
Output: Web app dengan React dan Supabase

## 1. Ringkasan Produk

Household Finance Dashboard adalah aplikasi laporan keuangan rumah tangga untuk suami dan istri. Aplikasi ini membantu pengguna mencatat transaksi harian secara manual, melihat total pendapatan dan pengeluaran, memantau saldo di beberapa bank, mencatat investasi, mengelola budget, memantau target keuangan, dan mencatat utang atau cicilan sederhana.

Produk ini dirancang untuk pengguna awam. Aplikasi tidak boleh terasa seperti software akuntansi profesional. Fokusnya adalah menjawab pertanyaan sehari-hari secara cepat:

- Bulan ini pendapatan dan pengeluaran berapa?
- Uang saat ini ada di bank mana saja dan totalnya berapa?
- Total investasi saat ini berapa?
- Kategori pengeluaran mana yang paling besar?
- Budget masih aman atau sudah lewat batas?
- Target tabungan atau investasi masih on-track atau tidak?
- Sisa utang atau cicilan masih berapa?

## 2. Tujuan

Tujuan utama:

1. Membuat satu pusat kendali keuangan rumah tangga untuk suami dan istri.
2. Memudahkan input transaksi harian secara manual.
3. Menampilkan laporan pendapatan, pengeluaran, saldo bank, investasi, budget, target, dan utang secara mudah dipahami.
4. Memberikan gambaran kondisi keuangan saat ini dan perkembangan dari waktu ke waktu.
5. Menjaga data tetap privat dan hanya bisa diakses anggota household.

Ukuran keberhasilan:

- Pengguna bisa menambahkan transaksi harian dalam waktu kurang dari 30 detik.
- Dashboard bisa menjawab kondisi keuangan utama tanpa perlu membuka banyak halaman.
- Saldo bank bisa dihitung dari transaksi, tetapi tetap bisa dikoreksi manual.
- Laporan harian, mingguan, bulanan, dan tahunan tersedia untuk evaluasi.
- Data suami dan istri tersimpan dalam household yang sama dan aman melalui Supabase Row Level Security.

## 3. Non-Goals

Hal yang tidak masuk versi awal:

- Integrasi otomatis dengan bank.
- Integrasi otomatis dengan platform investasi.
- Import CSV atau Excel.
- E-wallet dan uang cash.
- Multi-currency. Semua nominal menggunakan Rupiah.
- Role admin, editor, atau viewer. Suami dan istri punya akses yang sama.
- Fitur akuntansi formal seperti jurnal debit kredit, chart of accounts lengkap, rekonsiliasi bank profesional, dan laporan pajak.
- Multi-household untuk satu user.

## 4. Pengguna

Target pengguna:

- Suami dan istri yang ingin mengelola keuangan rumah tangga bersama.
- Pengguna awam yang lebih nyaman dengan bahasa sederhana daripada istilah akuntansi.
- Pengguna yang ingin input manual dan tidak ingin menghubungkan aplikasi ke bank atau API finansial.

Model akses:

- Setiap orang punya akun sendiri melalui Supabase Auth.
- Suami dan istri masuk ke household yang sama.
- Keduanya bisa melihat, menambah, mengubah, dan menghapus data.
- Data penting menyimpan informasi pembuat dan pengubah data.

## 5. Scope MVP

MVP harus mencakup:

1. Autentikasi suami dan istri.
2. Setup household.
3. Manajemen rekening bank.
4. Kategori bawaan dan kategori custom.
5. Input transaksi harian manual untuk pendapatan dan pengeluaran.
6. Estimasi saldo bank dari transaksi dan koreksi saldo manual.
7. Pencatatan investasi dengan nilai terkini dan riwayat transaksi investasi.
8. Budget kategori per bulan.
9. Target tabungan atau investasi dengan deadline dan progress.
10. Utang atau cicilan sederhana.
11. Dashboard ringkasan.
12. Laporan harian, mingguan, bulanan, dan tahunan.
13. Keamanan data household menggunakan Supabase Row Level Security.

Nice-to-have setelah MVP:

- Filter dan pencarian transaksi yang lebih detail.
- Grafik tren lebih kaya.
- Export laporan ke PDF atau CSV.
- Notifikasi budget, target, dan jatuh tempo cicilan.
- Mobile PWA.

## 6. Navigasi Utama

Navigasi aplikasi:

1. Dashboard
2. Transaksi
3. Bank
4. Investasi
5. Budget
6. Target
7. Utang/Cicilan
8. Laporan
9. Pengaturan

Prioritas UX:

- Tombol tambah transaksi harus sangat mudah ditemukan.
- Angka ringkasan harus terbaca cepat.
- Bahasa UI harus sederhana: gunakan "uang masuk", "uang keluar", "saldo bank", "target", dan "cicilan" daripada istilah akuntansi berat.
- Empty state harus membantu pengguna memulai, misalnya "Tambahkan rekening bank pertama" atau "Catat transaksi pertama".

## 7. Fitur Detail

### 7.1 Autentikasi dan Household

User bisa login dengan email dan password. Setelah login pertama, user bisa membuat household atau bergabung ke household yang sudah dibuat pasangannya.

Kebutuhan:

- Supabase Auth digunakan untuk akun user.
- Household menyimpan data keluarga bersama.
- Household member menghubungkan user ke household.
- Hanya anggota household yang bisa mengakses data household tersebut.
- Untuk MVP, semua anggota household punya izin yang sama.

Acceptance criteria:

- User yang belum login tidak bisa membuka data aplikasi.
- User yang sudah login tetapi belum punya household diarahkan ke setup household.
- User hanya bisa membaca dan mengubah data household miliknya.

### 7.2 Dashboard

Dashboard adalah halaman utama setelah login. Dashboard harus memberikan kondisi keuangan saat ini secara cepat.

Komponen ringkasan:

- Total pendapatan bulan ini.
- Total pengeluaran bulan ini.
- Sisa cashflow bulan ini = pendapatan - pengeluaran.
- Total saldo bank.
- Total investasi.
- Total sisa utang.
- Net worth sederhana = total saldo bank + total investasi - total sisa utang.
- Budget yang hampir habis atau sudah melebihi batas.
- Progress target utama.
- Transaksi terbaru.

Acceptance criteria:

- Ketika transaksi pendapatan ditambahkan, total pendapatan bulan berjalan bertambah.
- Ketika transaksi pengeluaran ditambahkan, total pengeluaran bulan berjalan bertambah.
- Ketika nilai investasi diperbarui, total investasi di dashboard berubah.
- Ketika pembayaran cicilan dicatat, total sisa utang berkurang.

### 7.3 Transaksi Harian

Transaksi harian adalah catatan manual pendapatan dan pengeluaran.

Field transaksi:

- Tanggal.
- Tipe: pendapatan atau pengeluaran.
- Kategori.
- Rekening bank.
- Nominal.
- Catatan opsional.
- Dibuat oleh.
- Diubah oleh.

Kategori awal:

- Pendapatan: Gaji, Bonus, Hadiah, Lain-lain.
- Pengeluaran: Makan, Transport, Tagihan, Belanja, Kesehatan, Hiburan, Keluarga, Pendidikan, Cicilan, Lain-lain.

Kategori bisa ditambah atau diubah sendiri oleh pengguna. Subkategori tidak masuk MVP agar input harian tetap ringan.

Acceptance criteria:

- User bisa menambah transaksi pendapatan.
- User bisa menambah transaksi pengeluaran.
- User bisa mengubah dan menghapus transaksi.
- Nominal wajib angka positif.
- Tanggal, tipe, kategori, rekening bank, dan nominal wajib diisi.
- Transaksi mempengaruhi estimasi saldo bank terkait.

### 7.4 Bank

Halaman bank menampilkan daftar rekening bank dan saldo.

Field rekening bank:

- Nama bank.
- Nama rekening atau label, misalnya "BCA Gaji".
- Nomor rekening opsional, boleh disamarkan.
- Saldo awal.
- Tanggal saldo awal.
- Status aktif/nonaktif.

Saldo bank dihitung dengan pendekatan gabungan:

- Estimasi saldo = saldo awal + pendapatan ke rekening - pengeluaran dari rekening + koreksi saldo.
- User bisa melakukan koreksi saldo manual jika saldo asli di bank berbeda dari estimasi aplikasi.
- Koreksi saldo harus menyimpan tanggal, nominal perubahan atau saldo hasil koreksi, dan catatan alasan.

Acceptance criteria:

- User bisa membuat, mengubah, dan menonaktifkan rekening bank.
- Dashboard menampilkan total saldo dari semua rekening bank aktif.
- Transaksi pendapatan menambah estimasi saldo rekening terkait.
- Transaksi pengeluaran mengurangi estimasi saldo rekening terkait.
- Koreksi saldo manual mengubah estimasi saldo dan tersimpan sebagai riwayat.

### 7.5 Investasi

Investasi menggunakan model gabungan: user bisa melihat nilai terkini dan mencatat riwayat transaksi investasi.

Field aset investasi:

- Nama aset, misalnya "Bibit", "Saham BCA", "Emas", atau "Deposito".
- Jenis aset: reksa dana, saham, emas, deposito, crypto, atau lainnya.
- Nilai terkini.
- Catatan opsional.
- Status aktif/nonaktif.

Jenis transaksi investasi:

- Top up.
- Beli.
- Jual.
- Withdraw.
- Penyesuaian nilai.

Untuk transaksi top up, beli, jual, dan withdraw, user dapat memilih rekening bank terkait agar estimasi saldo bank ikut berubah. Pergerakan uang ke investasi tidak dihitung sebagai pengeluaran rumah tangga; ini dihitung sebagai perpindahan aset dari bank ke investasi.

Acceptance criteria:

- User bisa menambah aset investasi.
- User bisa mencatat transaksi investasi.
- User bisa memperbarui nilai terkini aset.
- Transaksi top up atau beli dapat mengurangi saldo bank jika rekening bank dipilih.
- Transaksi jual atau withdraw dapat menambah saldo bank jika rekening bank dipilih.
- Dashboard menampilkan total nilai investasi aktif.
- Riwayat transaksi investasi bisa dilihat per aset.

### 7.6 Budget

Budget membantu mengontrol pengeluaran per kategori setiap bulan.

Field budget:

- Bulan dan tahun.
- Kategori.
- Nominal budget.
- Catatan opsional.

Status budget:

- Aman: pemakaian kurang dari 80%.
- Hampir habis: pemakaian 80% sampai 100%.
- Melebihi budget: pemakaian lebih dari 100%.

Acceptance criteria:

- User bisa membuat budget kategori bulanan.
- Pengeluaran di kategori terkait mengurangi sisa budget.
- Aplikasi menampilkan status budget berdasarkan persentase pemakaian.
- Dashboard menyorot budget yang hampir habis atau sudah lewat batas.

### 7.7 Target Keuangan

Target keuangan membantu pengguna merencanakan tujuan seperti dana darurat, liburan, DP rumah, pendidikan anak, atau target investasi.

Field target:

- Nama target.
- Tipe target: tabungan atau investasi.
- Nominal tujuan.
- Nominal terkumpul saat ini.
- Deadline.
- Kontribusi bulanan rencana.
- Catatan opsional.
- Status aktif/selesai.

Perhitungan:

- Progress = nominal terkumpul / nominal tujuan.
- Sisa target = nominal tujuan - nominal terkumpul.
- Estimasi kontribusi bulanan yang dibutuhkan = sisa target / jumlah bulan tersisa.
- Status target: on-track, perlu perhatian, atau terlambat.

Acceptance criteria:

- User bisa membuat target dengan nominal dan deadline.
- Aplikasi menampilkan progress target.
- Aplikasi menghitung rekomendasi nominal menabung per bulan.
- Aplikasi memberi status apakah target masih on-track berdasarkan deadline dan progress.

### 7.8 Utang dan Cicilan

Utang/cicilan dibuat sederhana agar cukup untuk kebutuhan rumah tangga.

Field utang:

- Nama utang atau cicilan.
- Pemberi pinjaman atau lembaga opsional.
- Total awal.
- Sisa utang.
- Pembayaran bulanan.
- Tanggal jatuh tempo bulanan opsional.
- Status: aktif atau lunas.

Field pembayaran:

- Tanggal pembayaran.
- Nominal pembayaran.
- Rekening bank yang digunakan melalui transaksi pengeluaran kategori Cicilan.
- Catatan opsional.

Pembayaran cicilan harus membuat atau terhubung ke transaksi pengeluaran kategori Cicilan. Dengan begitu, laporan pengeluaran dan estimasi saldo bank tetap konsisten, sementara `debt_payments` bertugas mengurangi sisa utang.

Acceptance criteria:

- User bisa mencatat utang/cicilan.
- User bisa mencatat pembayaran cicilan.
- Pembayaran cicilan mengurangi sisa utang.
- Pembayaran cicilan membuat atau terhubung ke transaksi pengeluaran kategori Cicilan.
- Saldo bank berkurang melalui transaksi pengeluaran yang terhubung dengan pembayaran cicilan.
- Utang berubah status menjadi lunas ketika sisa utang 0.

### 7.9 Laporan

Laporan tersedia untuk periode:

- Harian.
- Mingguan.
- Bulanan.
- Tahunan.

Isi laporan:

- Total pendapatan.
- Total pengeluaran.
- Selisih pendapatan dan pengeluaran.
- Pengeluaran per kategori.
- Kategori pengeluaran terbesar.
- Perubahan saldo bank.
- Perubahan nilai investasi.
- Status budget.
- Progress target.
- Sisa utang.

Acceptance criteria:

- User bisa memilih periode laporan.
- Angka laporan sesuai dengan data transaksi pada periode tersebut.
- Laporan bulanan bisa dibandingkan dengan bulan sebelumnya.
- Laporan tahunan menampilkan tren per bulan.

## 8. Data Model Supabase

Tabel utama:

### 8.1 `households`

- `id` uuid primary key
- `name` text not null
- `created_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.2 `profiles`

- `id` uuid primary key references auth.users
- `full_name` text
- `email` text
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.3 `household_members`

- `id` uuid primary key
- `household_id` uuid references households
- `user_id` uuid references auth.users
- `member_label` text, contoh: suami atau istri
- `created_at` timestamptz

### 8.4 `bank_accounts`

- `id` uuid primary key
- `household_id` uuid references households
- `bank_name` text not null
- `account_label` text not null
- `masked_account_number` text
- `opening_balance` numeric not null default 0
- `opening_balance_date` date not null
- `is_active` boolean default true
- `created_by` uuid references auth.users
- `updated_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.5 `categories`

- `id` uuid primary key
- `household_id` uuid references households
- `name` text not null
- `type` text check in income, expense
- `is_default` boolean default false
- `is_active` boolean default true
- `created_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.6 `transactions`

- `id` uuid primary key
- `household_id` uuid references households
- `bank_account_id` uuid references bank_accounts
- `category_id` uuid references categories
- `type` text check in income, expense
- `transaction_date` date not null
- `amount` numeric not null check amount > 0
- `notes` text
- `created_by` uuid references auth.users
- `updated_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.7 `balance_adjustments`

- `id` uuid primary key
- `household_id` uuid references households
- `bank_account_id` uuid references bank_accounts
- `adjustment_date` date not null
- `adjustment_amount` numeric not null
- `reason` text not null
- `created_by` uuid references auth.users
- `created_at` timestamptz

### 8.8 `investment_assets`

- `id` uuid primary key
- `household_id` uuid references households
- `name` text not null
- `asset_type` text not null
- `current_value` numeric not null default 0
- `notes` text
- `is_active` boolean default true
- `created_by` uuid references auth.users
- `updated_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.9 `investment_transactions`

- `id` uuid primary key
- `household_id` uuid references households
- `investment_asset_id` uuid references investment_assets
- `bank_account_id` uuid references bank_accounts nullable
- `transaction_type` text check in top_up, buy, sell, withdraw, value_adjustment
- `transaction_date` date not null
- `amount` numeric not null check amount > 0
- `notes` text
- `created_by` uuid references auth.users
- `created_at` timestamptz

### 8.10 `budgets`

- `id` uuid primary key
- `household_id` uuid references households
- `category_id` uuid references categories
- `budget_month` date not null
- `amount` numeric not null check amount > 0
- `notes` text
- `created_by` uuid references auth.users
- `updated_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.11 `goals`

- `id` uuid primary key
- `household_id` uuid references households
- `name` text not null
- `goal_type` text check in savings, investment
- `target_amount` numeric not null check target_amount > 0
- `current_amount` numeric not null default 0
- `deadline` date not null
- `planned_monthly_contribution` numeric default 0
- `notes` text
- `status` text check in active, completed, archived
- `created_by` uuid references auth.users
- `updated_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.12 `debts`

- `id` uuid primary key
- `household_id` uuid references households
- `name` text not null
- `lender_name` text
- `initial_amount` numeric not null check initial_amount > 0
- `remaining_amount` numeric not null check remaining_amount >= 0
- `monthly_payment` numeric not null default 0
- `monthly_due_day` int check monthly_due_day between 1 and 31
- `status` text check in active, paid_off
- `created_by` uuid references auth.users
- `updated_by` uuid references auth.users
- `created_at` timestamptz
- `updated_at` timestamptz

### 8.13 `debt_payments`

- `id` uuid primary key
- `household_id` uuid references households
- `debt_id` uuid references debts
- `transaction_id` uuid references transactions
- `payment_date` date not null
- `amount` numeric not null check amount > 0
- `notes` text
- `created_by` uuid references auth.users
- `created_at` timestamptz

## 9. Keamanan dan Row Level Security

Prinsip keamanan:

- Semua tabel household wajib mengaktifkan Row Level Security.
- User hanya bisa membaca data jika user adalah anggota household terkait.
- User hanya bisa membuat, mengubah, dan menghapus data dalam household miliknya.
- `profiles` hanya bisa dibaca oleh user terkait dan anggota household yang sama jika diperlukan untuk menampilkan nama pembuat transaksi.

Helper policy yang direkomendasikan:

- Buat function Supabase/Postgres seperti `is_household_member(household_id uuid)` untuk mengecek apakah `auth.uid()` ada di `household_members`.
- Gunakan function tersebut pada policy select, insert, update, dan delete.

Audit:

- Tabel penting menyimpan `created_by`, `updated_by`, `created_at`, dan `updated_at`.
- Untuk MVP, audit log terpisah tidak wajib jika field audit sudah konsisten.

## 10. Perhitungan Utama

Pendapatan periode:

```text
sum(transactions.amount) where type = income and transaction_date in selected period
```

Pengeluaran periode:

```text
sum(transactions.amount) where type = expense and transaction_date in selected period
```

Saldo estimasi per bank:

```text
opening_balance
+ sum(income transactions for bank)
- sum(expense transactions for bank)
+ sum(balance_adjustments.adjustment_amount for bank)
- sum(investment top_up and buy amounts for bank, if linked)
+ sum(investment sell and withdraw amounts for bank, if linked)
```

Total saldo bank:

```text
sum(estimated balance for active bank accounts)
```

Total investasi:

```text
sum(investment_assets.current_value) for active assets
```

Total sisa utang:

```text
sum(debts.remaining_amount) where status = active
```

Net worth sederhana:

```text
total_bank_balance + total_investments - total_remaining_debt
```

Budget usage:

```text
category_expense_this_month / budget.amount
```

Target monthly need:

```text
(target_amount - current_amount) / remaining_months_until_deadline
```

## 11. Validasi dan Error Handling

Validasi form:

- Nominal wajib angka positif.
- Tanggal wajib diisi.
- Transaksi wajib punya tipe.
- Transaksi wajib punya kategori dan rekening bank.
- Budget wajib punya kategori, bulan, dan nominal.
- Target wajib punya nominal tujuan dan deadline.
- Utang wajib punya total awal dan sisa utang.
- Sisa utang tidak boleh lebih besar dari total awal.
- Koreksi saldo wajib punya catatan alasan.

Error handling:

- Jika simpan gagal, tampilkan pesan yang jelas dan data form tidak hilang.
- Tombol simpan menampilkan loading state saat proses berjalan.
- Empty state memberi arahan langkah berikutnya.
- Jika user belum punya household, arahkan ke setup household.
- Jika data tidak ditemukan atau tidak punya akses, tampilkan pesan akses ditolak atau data tidak tersedia.

## 12. Tech Stack

Frontend:

- React.
- React Router untuk navigasi halaman.
- State lokal React untuk form dan filter.
- Data fetching langsung ke Supabase client atau melalui service layer frontend.
- Chart library ringan untuk laporan dan tren.

Backend dan database:

- Supabase Auth untuk login.
- Supabase Postgres untuk database.
- Supabase Row Level Security untuk keamanan data.
- Supabase generated types atau type definitions manual agar model data konsisten.

Deployment:

- Web app bisa dideploy sebagai static React app.
- Environment variable menyimpan Supabase URL dan anon key.

## 13. Testing

Prioritas testing:

- Unit test untuk fungsi perhitungan saldo, laporan, budget, target, dan net worth.
- Component test untuk form transaksi, dashboard summary, dan budget status.
- Integration test ringan untuk alur login/setup household jika tooling tersedia.
- Manual QA untuk alur utama sebelum rilis MVP.

Skenario minimal:

1. Tambah transaksi pendapatan, dashboard berubah.
2. Tambah transaksi pengeluaran, dashboard dan budget berubah.
3. Koreksi saldo bank, estimasi saldo berubah.
4. Tambah investasi, total investasi berubah.
5. Tambah pembayaran cicilan, sisa utang dan saldo bank berubah.
6. User bukan anggota household tidak bisa membaca data household lain.

## 14. Open Decisions untuk Implementation Plan

Keputusan yang perlu dibuat saat planning teknis:

- Pilihan starter React: Vite React atau framework lain.
- Pilihan styling: CSS biasa, Tailwind, atau design system lokal.
- Cara membuat household invitation untuk pasangan: kode invite sederhana atau input email pasangan.

Keputusan yang sudah dikunci untuk mencegah scope melebar:

- MVP tetap hanya menargetkan dua anggota household: suami dan istri.
- Kategori bawaan dibuat otomatis per household agar user bisa mengubahnya tanpa mempengaruhi household lain.
- Pembayaran cicilan terhubung ke transaksi pengeluaran kategori Cicilan agar saldo bank dan laporan tetap konsisten.

## 15. Prioritas Implementasi MVP

Urutan implementasi yang direkomendasikan:

1. Setup React app, Supabase client, routing, dan auth.
2. Database schema, RLS, dan seed kategori bawaan.
3. Setup household dan membership suami/istri.
4. Bank accounts.
5. Transactions.
6. Dashboard summary dasar.
7. Balance adjustments.
8. Investments.
9. Budgets.
10. Goals.
11. Debts and debt payments.
12. Reports.
13. Polish UX, empty states, validation, and test coverage.

## 16. Acceptance Criteria Global

PRD dianggap terpenuhi jika:

- Suami dan istri bisa login dengan akun masing-masing dan masuk ke household yang sama.
- Keduanya bisa mencatat transaksi harian manual.
- Aplikasi menampilkan total pendapatan dan pengeluaran berdasarkan periode.
- Aplikasi menampilkan total saldo beberapa rekening bank.
- Aplikasi mendukung koreksi saldo bank manual.
- Aplikasi menampilkan total investasi dan riwayat transaksi investasi.
- Aplikasi mendukung budget kategori bulanan.
- Aplikasi mendukung target keuangan lengkap dengan progress dan rekomendasi kontribusi bulanan.
- Aplikasi mendukung utang/cicilan sederhana.
- Aplikasi menyediakan laporan harian, mingguan, bulanan, dan tahunan.
- Data household tidak bisa diakses user yang bukan anggota household.
