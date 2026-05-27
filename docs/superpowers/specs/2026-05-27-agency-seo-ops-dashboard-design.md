# Agency SEO Ops Dashboard PRD

Date: 2026-05-27

## 1. Ringkasan Produk

Agency SEO Ops Dashboard adalah web app desktop-first untuk membantu owner dan project manager agency SEO mengelola operasional delivery client dalam satu tempat.

MVP berfokus pada empat area utama:

- Project Plan: mengelola client/brand, task manual, kategori layanan, PIC, deadline, dan status pekerjaan.
- Writer Performance: melihat performa writer berdasarkan total artikel yang harus dikerjakan, jumlah artikel selesai, dan total brand/client yang dikerjakan.
- Invoice Status: memantau status tagihan per client/project dengan data invoice dasar.
- Finance Summary: menghitung revenue, cost, actual profit, dan projected profit level perusahaan per periode.

Aplikasi ini bukan HR/payroll lengkap dan bukan accounting system penuh. Tujuan MVP adalah memberi owner dan project manager visibility cepat tentang pekerjaan yang berjalan, performa writer, invoice yang belum beres, dan profit sederhana perusahaan.

## 2. Latar Belakang

Agency SEO biasanya menjalankan banyak pekerjaan paralel untuk beberapa client. Pekerjaan dapat berupa web development, SEO maintenance, content production, atau kombinasi web development dan SEO. Tanpa sistem yang terpusat, owner dan project manager perlu memeriksa banyak catatan terpisah untuk menjawab pertanyaan operasional seperti:

- Task client mana yang sedang berjalan?
- Writer mana yang punya artikel terbanyak?
- Berapa artikel yang sudah selesai dibanding total assignment?
- Invoice mana yang sudah dikirim, dibayar, atau overdue?
- Apakah revenue paid sudah menutup gaji dan biaya operasional?

MVP ini dirancang sebagai pusat operasional internal yang ringan, manual-first, dan mudah dipakai dari laptop/desktop.

## 3. Tujuan Produk

- Owner dapat melihat kondisi operasional dan finansial agency dalam satu dashboard.
- Project manager dapat mengelola task client harian tanpa struktur project yang rumit.
- Project manager dapat melihat output writer berdasarkan jumlah artikel dan brand/client yang dikerjakan.
- Owner dan project manager dapat memantau status invoice dan outstanding payment.
- Owner dan project manager dapat menghitung profit sederhana berdasarkan invoice paid dan biaya operasional manual.

## 4. Bukan Tujuan MVP

- Bukan sistem HR lengkap untuk absensi, cuti, payroll, kontrak kerja, atau appraisal formal.
- Bukan aplikasi akuntansi penuh dengan jurnal, chart of accounts, pajak, rekonsiliasi bank, atau laporan keuangan resmi.
- Belum menghitung profit per client/project.
- Belum menyediakan portal khusus writer atau client.
- Belum menyediakan integrasi dengan Google Sheets, Trello, ClickUp, Notion, Xero, payment gateway, atau bank.
- Belum menyediakan import/export data.
- Belum menyediakan template task otomatis per layanan.
- Belum menghitung quality score, revision rate, atau on-time rate writer.

## 5. Pengguna Dan Hak Akses

### Owner

Owner menggunakan aplikasi untuk melihat kondisi bisnis dan operasional secara menyeluruh. Owner dapat melihat dan mengelola semua data utama:

- Client/brand.
- Project plan dan task.
- Writer performance.
- Invoice.
- Cost dan finance summary.
- Akun pengguna dan role.

### Project Manager

Project manager menggunakan aplikasi untuk mengelola delivery harian. Project manager dapat melihat dan mengelola:

- Client/brand.
- Project plan dan task.
- Assignment writer/PIC.
- Writer performance.
- Invoice status.
- Cost dan finance summary.

Untuk MVP, perbedaan akses dibuat sederhana: owner dan project manager sama-sama bisa mengakses semua modul utama, tetapi hanya owner yang bisa mengelola akun pengguna dan role.

## 6. Layanan Yang Didukung

MVP mendukung semua kategori layanan agency sejak awal, tetapi dengan struktur sederhana:

- Web Development.
- SEO Maintenance.
- Content Production.
- Web Development & SEO.

Kategori layanan berfungsi sebagai label/kategori pada task dan invoice, bukan sebagai struktur project kompleks. Setiap pekerjaan tetap dikelompokkan per client/brand.

## 7. Modul Project Plan

Project Plan adalah pusat operasional harian. Struktur MVP dibuat per client/brand. Dalam konteks produk ini, satu client sama dengan satu brand, sehingga aplikasi cukup memakai master data `ClientBrand`.

Setiap client/brand dapat memiliki banyak task. Task dibuat manual oleh owner atau project manager. MVP tidak menyediakan template otomatis.

Setiap task memiliki data:

- Judul task.
- Client/brand.
- Kategori layanan: `Web Development`, `SEO Maintenance`, `Content Production`, atau `Web Development & SEO`.
- Tipe task: `Content` atau `Non-content`.
- PIC/assignee.
- Deadline.
- Status.
- Deskripsi atau catatan opsional.
- Tanggal selesai jika sudah selesai.

### Status Content Task

Task bertipe `Content` memakai status:

- `Brief`.
- `Writing`.
- `Review`.
- `Revision`.
- `Published`.
- `Done`.

### Status Non-Content Task

Task bertipe `Non-content` memakai status:

- `To Do`.
- `In Progress`.
- `Review`.
- `Done`.

### Overdue

Task yang melewati deadline dan belum `Done` ditandai sebagai overdue secara otomatis. Overdue adalah indikator turunan dari deadline dan status, bukan status manual yang dipilih user.

## 8. Modul Writer Performance

Writer Performance berfokus hanya pada writer. Role lain boleh menjadi PIC task, tetapi belum dihitung sebagai performance khusus di MVP.

Sumber data performance berasal dari task bertipe `Content` yang ditugaskan ke writer.

Metrik utama per writer:

- Total artikel yang harus dikerjakan: jumlah semua content task yang assigned ke writer dalam periode/filter aktif.
- Jumlah artikel selesai: jumlah content task yang sudah mencapai status `Done`.
- Total brand/client yang dikerjakan: jumlah client/brand unik dari content task yang assigned ke writer.

Artikel dengan status `Published` belum dihitung selesai kecuali status akhirnya dipindah ke `Done`.

Filter Writer Performance:

- Periode tanggal.
- Writer.
- Client/brand.

Filter periode untuk Writer Performance menggunakan deadline task. Artinya, total artikel yang harus dikerjakan dan jumlah artikel selesai dihitung dari content task yang deadline-nya berada dalam periode aktif. Jika task berubah menjadi `Done`, sistem menyimpan tanggal selesai, tetapi metrik MVP tetap memakai deadline sebagai dasar filter agar target kerja periode berjalan konsisten.

Metrik kualitas seperti revision rate, on-time rate, dan quality score tidak masuk MVP.

## 9. Modul Invoice Status

Invoice Status digunakan untuk tracking tagihan, bukan accounting lengkap.

Setiap invoice memiliki data:

- Nomor invoice.
- Client/brand.
- Project/layanan atau deskripsi pekerjaan.
- Nominal.
- Tanggal kirim.
- Due date.
- Tanggal bayar.
- Status.

Status invoice MVP:

- `Draft`: invoice dibuat tetapi belum dikirim.
- `Sent`: invoice sudah dikirim dan belum dibayar.
- `Paid`: invoice sudah dibayar.
- `Overdue`: invoice melewati due date dan belum `Paid` atau `Cancelled`.
- `Cancelled`: invoice dibatalkan.

`Overdue` dapat dihitung otomatis dari due date dan status pembayaran. Owner dan project manager dapat melihat serta mengubah invoice.

Ringkasan invoice di dashboard menampilkan:

- Total invoice `Sent`.
- Total invoice `Paid`.
- Total invoice `Overdue`.
- Nominal outstanding.
- Invoice yang overdue atau mendekati due date.

## 10. Modul Finance Summary

Finance Summary membantu owner dan project manager melihat kondisi finansial sederhana level perusahaan per periode. Modul ini tidak menggantikan aplikasi akuntansi.

### Revenue

Data revenue diambil dari invoice:

- Paid revenue: total nominal invoice dengan status `Paid` dan tanggal bayar dalam periode aktif.
- Sent revenue: total nominal invoice dengan status `Sent` dan tanggal kirim dalam periode aktif.
- Overdue revenue: total nominal invoice dengan status `Overdue` dan due date dalam periode aktif.

### Cost

Data cost dimasukkan manual. Kategori cost MVP:

- Gaji karyawan/writer.
- Hosting.
- Domain.
- Tools SEO.
- Subscription software.
- Biaya operasional lain.

Setiap cost memiliki nama biaya, kategori, nominal, tanggal/periode, dan catatan opsional.

### Rumus Profit

MVP menggunakan dua rumus:

```text
Actual Profit = Paid Revenue - Total Cost
Projected Profit = Paid Revenue + Sent Revenue - Total Cost
```

Profit dihitung level perusahaan per periode. MVP belum melakukan alokasi biaya ke client/project tertentu.

## 11. Dashboard Dan Filter

Dashboard utama adalah halaman pertama setelah login. Tujuannya memberi gambaran cepat tentang operasional dan finansial.

Isi dashboard MVP:

- Ringkasan task: total task aktif, content task aktif, non-content task aktif, dan overdue.
- Ringkasan writer: total artikel yang harus dikerjakan, artikel selesai, dan total brand/client aktif.
- Ringkasan invoice: total invoice `Sent`, `Paid`, `Overdue`, dan nominal outstanding.
- Ringkasan finance: paid revenue, total cost, actual profit, dan projected profit.
- Daftar task yang butuh perhatian.
- Daftar invoice overdue atau mendekati due date.

Filter utama MVP:

- Periode tanggal.
- Client/brand.
- Writer.
- Kategori layanan.
- Status task.
- Status invoice.

Filter periode dashboard menggunakan aturan per modul: task dan writer performance memakai deadline task, paid revenue memakai tanggal bayar, sent invoice memakai tanggal kirim, overdue invoice memakai due date, dan cost memakai tanggal/periode cost.

## 12. Alur Data Utama

Alur operasional MVP:

1. Owner membuat akun project manager jika diperlukan.
2. Owner atau project manager membuat client/brand.
3. Owner atau project manager membuat task manual per client/brand.
4. Task diberi kategori layanan, tipe task, PIC/assignee, deadline, dan status.
5. Project manager memperbarui status task sesuai progress.
6. Writer performance otomatis dihitung dari content task yang assigned ke writer.
7. Owner atau project manager membuat invoice dan memperbarui statusnya.
8. Owner atau project manager memasukkan cost operasional manual.
9. Dashboard menghitung ringkasan task, writer performance, invoice, revenue, cost, dan profit.

## 13. Data Model Konseptual

### User

- Nama.
- Email.
- Role: `Owner` atau `Project Manager`.
- Status aktif.

### ClientBrand

- Nama client/brand.
- Kontak opsional.
- Status aktif.

### Employee

- Nama.
- Role, termasuk `Writer`.
- Status aktif.

### Task

- Judul.
- Client/brand.
- Kategori layanan.
- Tipe task.
- Assignee.
- Deadline.
- Status.
- Deskripsi/catatan.
- Tanggal selesai.

### Invoice

- Nomor invoice.
- Client/brand.
- Layanan/deskripsi pekerjaan.
- Nominal.
- Tanggal kirim.
- Due date.
- Tanggal bayar.
- Status.

### Cost

- Nama biaya.
- Kategori biaya.
- Nominal.
- Tanggal/periode.
- Catatan.

### FinanceSummary

FinanceSummary adalah hasil kalkulasi dari invoice dan cost. Data ini tidak perlu menjadi input manual utama.

## 14. Validasi Dan Error Handling

Validasi wajib:

- Task wajib memiliki judul, client/brand, tipe task, assignee, deadline, dan status.
- Invoice wajib memiliki nomor invoice, client/brand, nominal, due date, dan status.
- Cost wajib memiliki nama biaya, nominal, dan tanggal/periode.
- User wajib memiliki nama, email, role, dan status aktif.

Aturan status otomatis:

- Task overdue dihitung dari deadline dan status `Done`.
- Invoice overdue dihitung dari due date dan status `Paid` atau `Cancelled`.

Jika data tanggal tidak valid, aplikasi menampilkan pesan error yang jelas dan tidak menyimpan perubahan. Jika user mencoba menghapus data yang masih dipakai, aplikasi harus memberi peringatan dan mencegah data turunan menjadi tidak konsisten.

## 15. Testing MVP

Testing MVP harus mencakup alur utama berikut:

- Login sebagai owner dan project manager.
- Owner membuat dan mengelola akun project manager.
- Membuat, mengubah, dan menonaktifkan client/brand.
- Membuat content task dan non-content task.
- Mengubah status content task sesuai pipeline content.
- Mengubah status non-content task sesuai pipeline non-content.
- Memastikan task overdue muncul saat deadline lewat dan task belum done.
- Memastikan writer performance berubah sesuai content task.
- Membuat invoice dan mengubah status invoice.
- Memastikan invoice overdue muncul saat due date lewat dan invoice belum paid/cancelled.
- Menambahkan cost operasional.
- Memastikan finance summary menghitung actual profit dan projected profit dengan benar.
- Memastikan filter dashboard menghasilkan data yang konsisten.

## 16. Kriteria Sukses MVP

- Owner dapat memahami kondisi pekerjaan, writer, invoice, dan profit dalam satu dashboard.
- Project manager dapat membuat dan memperbarui task harian tanpa membutuhkan template atau integrasi eksternal.
- Writer performance dapat menjawab tiga pertanyaan utama: total artikel assigned, total artikel selesai, dan total brand/client yang dikerjakan.
- Invoice status dapat menunjukkan tagihan yang sent, paid, overdue, dan outstanding.
- Finance Summary dapat menghitung actual profit dan projected profit level perusahaan per periode dari data invoice dan cost.
