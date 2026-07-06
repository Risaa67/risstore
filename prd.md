
# Product Requirements Document (PRD)

## 1. Informasi Produk

| Item            | Keterangan                 |
| --------------- | -------------------------- |
| Nama Produk     | Marketplace Produk Digital |
| Versi           | 1.0 (MVP)                  |
| Platform        | Website Responsive         |
| Frontend        | Next.js 15 + Tailwind CSS  |
| Backend         | Supabase                   |
| Database        | PostgreSQL (Supabase)      |
| Authentication  | Supabase Auth              |
| Storage         | Supabase Storage           |
| Deployment      | Vercel                     |
| Version Control | GitHub                     |

---

# 2. Latar Belakang

Marketplace Produk Digital merupakan platform berbasis web yang memungkinkan kreator menjual produk digital seperti ebook, template, desain, preset, source code, maupun kursus. Sistem menyediakan proses jual beli secara otomatis mulai dari registrasi pengguna, upload produk, pembayaran, hingga pengunduhan file setelah transaksi berhasil.

Platform ini bertujuan membantu kreator mendistribusikan produk digital secara lebih aman, mudah, dan profesional tanpa harus melakukan proses transaksi secara manual.

---

# 3. Tujuan Produk

### Tujuan Utama

Membangun marketplace produk digital yang:

* Mempermudah kreator menjual produk digital.
* Memudahkan pengguna mencari produk digital.
* Mengotomatisasi proses transaksi.
* Menyediakan akses download otomatis setelah pembayaran berhasil.
* Menyediakan dashboard penjualan bagi seller.

---

# 4. Target Pengguna

## Seller

Kebutuhan

* Membuat akun
* Upload produk
* Mengatur harga
* Melihat statistik penjualan
* Mengelola produk

---

## Buyer

Kebutuhan

* Mencari produk
* Membeli produk
* Download produk
* Melihat riwayat transaksi

---

## Admin

Kebutuhan

* Mengelola pengguna
* Menghapus produk yang melanggar
* Memantau transaksi
* Melihat laporan

---

# 5. Ruang Lingkup Sistem

## Fitur MVP

### Authentication

Menggunakan **Supabase Auth**

Fitur:

* Register
* Login
* Logout
* Forgot Password
* Login dengan Google (opsional)

---

### Marketplace

Menampilkan seluruh produk digital.

Fitur:

* Search
* Filter kategori
* Filter harga
* Pagination

---

### Detail Produk

Menampilkan:

* Thumbnail
* Nama Produk
* Harga
* Deskripsi
* Rating
* Nama Seller
* Tombol Beli

---

### Upload Produk

Seller dapat mengunggah:

* Nama produk
* Thumbnail
* File Digital
* Harga
* Deskripsi
* Kategori

File disimpan pada:

**Supabase Storage**

---

### Checkout

Pembeli dapat:

* Melihat ringkasan pesanan
* Memilih metode pembayaran
* Melakukan pembayaran

---

### Pembayaran

Integrasi Payment Gateway

Contoh:

* Midtrans
* Xendit

Status:

* Pending
* Success
* Failed

---

### Download

Setelah pembayaran sukses

User dapat:

* Download file
* Melihat histori download

---

### Dashboard Seller

Menampilkan

* Jumlah Produk
* Penjualan
* Pendapatan
* Produk Terlaris

---

### Dashboard Admin

Admin dapat

* Melihat seluruh user
* Melihat transaksi
* Menghapus produk
* Mengelola kategori

---

# 6. User Flow

## Buyer

```text
Landing Page
      │
      ▼
Register/Login
      │
      ▼
Cari Produk
      │
      ▼
Detail Produk
      │
      ▼
Checkout
      │
      ▼
Pembayaran
      │
      ▼
Download Produk
```

---

## Seller

```text
Register
     │
     ▼
Login
     │
     ▼
Dashboard
     │
     ▼
Upload Produk
     │
     ▼
Produk Dipublikasikan
     │
     ▼
Menerima Penjualan
```

---

# 7. Functional Requirements

| ID   | Requirement                    | Prioritas |
| ---- | ------------------------------ | --------- |
| FR01 | User dapat register            | High      |
| FR02 | User dapat login               | High      |
| FR03 | User dapat upload produk       | High      |
| FR04 | User dapat mencari produk      | High      |
| FR05 | User dapat membeli produk      | High      |
| FR06 | User dapat download produk     | High      |
| FR07 | Seller melihat dashboard       | Medium    |
| FR08 | Admin mengelola user           | Medium    |
| FR09 | Admin mengelola produk         | Medium    |
| FR10 | User melihat histori transaksi | Medium    |

---

# 8. Non Functional Requirements

| Requirement  | Detail                                  |
| ------------ | --------------------------------------- |
| Performance  | Loading halaman < 3 detik               |
| Security     | HTTPS, JWT, Row Level Security Supabase |
| Availability | 24/7                                    |
| Responsive   | Mobile & Desktop                        |
| Scalability  | Menggunakan Supabase Cloud              |
| Backup       | Database Backup Supabase                |

---

# 9. Arsitektur Sistem

```text
                 User
                   │
                   ▼
      Next.js + Tailwind CSS
                   │
         Supabase Client SDK
                   │
      ┌────────────┼────────────┐
      ▼            ▼            ▼
 Supabase Auth  PostgreSQL   Storage
      │            │            │
      └────────────┼────────────┘
                   │
              Payment Gateway
                   │
                Midtrans
```

---

# 10. Struktur Database

## users

| Field      | Type               |
| ---------- | ------------------ |
| id         | UUID               |
| name       | varchar            |
| email      | varchar            |
| role       | buyer/seller/admin |
| created_at | timestamp          |

---

## products

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| seller_id   | UUID      |
| title       | varchar   |
| description | text      |
| price       | integer   |
| thumbnail   | text      |
| file_url    | text      |
| category    | varchar   |
| created_at  | timestamp |

---

## orders

| Field      | Type                   |
| ---------- | ---------------------- |
| id         | UUID                   |
| buyer_id   | UUID                   |
| total      | integer                |
| status     | pending/success/failed |
| created_at | timestamp              |

---

## order_items

| Field      | Type    |
| ---------- | ------- |
| id         | UUID    |
| order_id   | UUID    |
| product_id | UUID    |
| price      | integer |

---

## reviews

| Field      | Type    |
| ---------- | ------- |
| id         | UUID    |
| product_id | UUID    |
| user_id    | UUID    |
| rating     | integer |
| comment    | text    |

---

# 11. Teknologi yang Digunakan

| Teknologi         | Fungsi                   |
| ----------------- | ------------------------ |
| Next.js           | Frontend Framework       |
| Tailwind CSS      | Styling                  |
| TypeScript        | Bahasa Pemrograman       |
| Supabase Auth     | Login & Authentication   |
| Supabase Database | PostgreSQL Database      |
| Supabase Storage  | Penyimpanan File Digital |
| Supabase Realtime | Notifikasi Real-time     |
| Vercel            | Deployment               |
| GitHub            | Version Control          |
| Midtrans          | Payment Gateway          |

---

# 12. Deployment

## Development

```
Developer
      │
      ▼
GitHub Repository
      │
      ▼
Vercel Preview Deployment
```

## Production

```
GitHub
     │
     ▼
Vercel CI/CD
     │
     ▼
Website Production
     │
     ▼
Supabase Backend
```

---

# 13. MVP (Versi 1.0)

Fitur yang harus tersedia pada versi pertama:

* ✅ Login & Register (Supabase Auth)
* ✅ Landing Page Marketplace
* ✅ Search Produk
* ✅ Detail Produk
* ✅ Upload Produk
* ✅ Dashboard Seller
* ✅ Checkout
* ✅ Pembayaran (Midtrans)
* ✅ Download File Digital
* ✅ Riwayat Pembelian
* ✅ Dashboard Admin
* ✅ Deploy otomatis melalui GitHub ke Vercel

## Saran Arsitektur Folder

Karena menggunakan **Next.js + Supabase**, struktur proyek berikut akan memudahkan pengembangan dan pemeliharaan:

```text
marketplace-digital/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── marketplace/
│   ├── product/
│   ├── checkout/
│   └── api/
├── components/
│   ├── ui/
│   ├── product/
│   ├── layout/
│   └── forms/
├── lib/
│   ├── supabase/
│   ├── auth.ts
│   └── utils.ts
├── hooks/
├── types/
├── public/
├── styles/
└── middleware.ts
```

Dokumen PRD ini sudah cukup lengkap untuk dijadikan acuan pengembangan aplikasi menggunakan **Next.js, Tailwind CSS, Supabase, GitHub, dan Vercel**, sekaligus memenuhi standar dokumentasi yang umum diminta dalam proyek atau tugas akhir.
