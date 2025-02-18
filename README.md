# RESTful API Blog dengan Express.js, Sequelize, dan MySQL

## Deskripsi
RESTful API ini dibangun menggunakan **Express.js**, **Sequelize** sebagai ORM (Object-Relational Mapping), dan **MySQL** sebagai database. API ini dirancang untuk mendukung operasi CRUD (Create, Read, Update, Delete) pada blog, termasuk fitur autentikasi dan manajemen sesi.

## Fitur Utama
- **CRUD Blog Posts**: Membuat, membaca, memperbarui, dan menghapus postingan blog.
- **Autentikasi Pengguna**: Registrasi dan login pengguna dengan enkripsi password menggunakan bcrypt.
- **Manajemen Sesi**: Menggunakan express-session dan connect-session-sequelize untuk menyimpan sesi di database.
- **Unggah File**: Mendukung unggah gambar atau file terkait blog menggunakan express-fileupload.
- **CORS**: Dukungan lintas domain dengan middleware cors.

## Dependensi
### Dependencies
- `bcrypt` ^5.1.1 - Untuk enkripsi password.
- `connect-session-sequelize` ^7.1.7 - Integrasi Sequelize dengan express-session.
- `cors` ^2.8.5 - Middleware untuk menangani Cross-Origin Resource Sharing (CORS).
- `dotenv` ^16.3.1 - Mengelola variabel lingkungan dari file `.env`.
- `express` ^4.18.2 - Framework web Node.js.
- `express-fileupload` ^1.4.1 - Middleware untuk mengunggah file.
- `express-session` ^1.17.3 - Middleware untuk manajemen sesi.
- `mysql2` ^3.6.2 - Driver MySQL untuk Sequelize.
- `sequelize` ^6.33.0 - ORM untuk berinteraksi dengan database MySQL.
