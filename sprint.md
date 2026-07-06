Kalau deadline **nanti malam**, kita jangan membuat sprint yang terlalu besar. Gunakan **Sprint 0 (Planning)** dan **Sprint 1 (MVP)** dalam satu hari. Fokusnya adalah menghasilkan aplikasi yang sudah bisa didemokan, bukan aplikasi yang sudah lengkap.

# Sprint Backlog - Marketplace Produk Digital

**Deadline:** Hari ini (23.59)

**Sprint Goal:**

> Menghasilkan MVP Marketplace Produk Digital yang memungkinkan pengguna login, melihat produk, mengunggah produk, dan menyimpan data ke Supabase.

---

# Sprint 0 - Persiapan (30-45 menit)

| No   | Task                              | Status |
| ---- | --------------------------------- | ------ |
| S0-1 | Membuat repository GitHub         | ⬜      |
| S0-2 | Membuat project Next.js           | ⬜      |
| S0-3 | Install Tailwind CSS              | ⬜      |
| S0-4 | Membuat project Supabase          | ⬜      |
| S0-5 | Menghubungkan Next.js ke Supabase | ⬜      |
| S0-6 | Deploy awal ke Vercel             | ⬜      |

**Output**

* Repository GitHub
* Project berjalan di localhost
* Deploy berhasil di Vercel

---

# Sprint 1 - Authentication

Estimasi: **1 jam**

## User Story

> Sebagai pengguna saya ingin dapat mendaftar dan login agar dapat menggunakan marketplace.

### Task

| No    | Task                       | Prioritas |
| ----- | -------------------------- | --------- |
| SP1-1 | Halaman Login              | High      |
| SP1-2 | Halaman Register           | High      |
| SP1-3 | Integrasi Supabase Auth    | High      |
| SP1-4 | Logout                     | High      |
| SP1-5 | Middleware Protected Route | High      |

**Acceptance Criteria**

* Register berhasil
* Login berhasil
* Logout berhasil
* Dashboard tidak bisa diakses tanpa login

---

# Sprint 2 - Marketplace

Estimasi: **2 jam**

## User Story

> Sebagai pembeli saya ingin melihat seluruh produk.

### Task

| No    | Task          |
| ----- | ------------- |
| SP2-1 | Landing Page  |
| SP2-2 | Card Product  |
| SP2-3 | Search Produk |
| SP2-4 | Detail Produk |

**Acceptance Criteria**

* Produk tampil dari database
* Search berjalan
* Detail produk tampil

---

# Sprint 3 - Seller Dashboard

Estimasi: **2 jam**

## User Story

> Sebagai seller saya ingin mengupload produk.

### Task

| No    | Task                |
| ----- | ------------------- |
| SP3-1 | Dashboard Seller    |
| SP3-2 | Form Upload         |
| SP3-3 | Upload Thumbnail    |
| SP3-4 | Upload File Digital |
| SP3-5 | Simpan ke Database  |

**Acceptance Criteria**

* Produk tersimpan
* Thumbnail tersimpan di Storage
* File tersimpan di Storage

---

# Sprint 4 - Dashboard

Estimasi: **1 jam**

## User Story

> Sebagai seller saya ingin melihat produk saya.

### Task

| No    | Task          |
| ----- | ------------- |
| SP4-1 | List Produk   |
| SP4-2 | Edit Produk   |
| SP4-3 | Delete Produk |

---

# Sprint 5 - Deployment

Estimasi: **30 menit**

| No    | Task               |
| ----- | ------------------ |
| SP5-1 | Push ke GitHub     |
| SP5-2 | Deploy ke Vercel   |
| SP5-3 | Testing Production |

---

# Product Backlog

| ID   | Fitur            | Priority | Sprint            |
| ---- | ---------------- | -------- | ----------------- |
| PB01 | Login            | High     | Sprint 1          |
| PB02 | Register         | High     | Sprint 1          |
| PB03 | Marketplace      | High     | Sprint 2          |
| PB04 | Detail Produk    | High     | Sprint 2          |
| PB05 | Upload Produk    | High     | Sprint 3          |
| PB06 | Dashboard Seller | High     | Sprint 4          |
| PB07 | Search Produk    | Medium   | Sprint 2          |
| PB08 | Edit Produk      | Medium   | Sprint 4          |
| PB09 | Delete Produk    | Medium   | Sprint 4          |
| PB10 | Payment          | Low      | Sprint Berikutnya |
| PB11 | Download Produk  | Low      | Sprint Berikutnya |
| PB12 | Review Produk    | Low      | Sprint Berikutnya |

---

# Definition of Done (DoD)

Sebuah task dianggap selesai apabila:

* Kode berhasil dijalankan tanpa error.
* Fitur sesuai dengan acceptance criteria.
* Perubahan sudah di-*push* ke GitHub.
* Perubahan berhasil ter-*deploy* di Vercel.
* Fitur dapat diuji melalui browser.

## Rekomendasi Prioritas karena Deadline Malam Ini

Agar aplikasi sudah layak dipresentasikan, fokuskan pengerjaan pada fitur berikut:

1. ✅ Setup proyek (Next.js + Tailwind + Supabase + GitHub + Vercel)
2. ✅ Login & Register menggunakan Supabase Auth
3. ✅ Landing Page Marketplace
4. ✅ Menampilkan daftar produk dari Supabase
5. ✅ Upload produk beserta thumbnail dan file digital
6. ✅ Dashboard Seller sederhana

Sementara itu, fitur **pembayaran, download otomatis setelah pembelian, rating, dan notifikasi** dapat dimasukkan ke backlog untuk sprint berikutnya. Dengan prioritas ini, Anda tetap memiliki MVP yang berfungsi dan siap didemokan sesuai tenggat waktu malam ini.
