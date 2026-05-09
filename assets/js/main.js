/* ============================================================
   ILHAM NUR — PORTFOLIO MAIN.JS
   Features: navbar, smooth scroll, reveal, language switcher
   ============================================================ */

(function () {
  'use strict';

  const navbar      = document.querySelector('.navbar');
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile');
  const navLinks    = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const sections    = document.querySelectorAll('section[id]');
  const backToTop   = document.querySelector('.back-to-top');
  const reveals     = document.querySelectorAll('.reveal');
  const langButtons = document.querySelectorAll('[data-lang-option]');
  const storageKey  = 'portfolioLanguage';

  const commonI18n = {
    text: [
      ['.nav-links a[href$="#home"], .nav-mobile a[href$="#home"]', 'Home', 'Beranda'],
      ['.nav-links a[href$="#about"], .nav-mobile a[href$="#about"]', 'About', 'Tentang'],
      ['.nav-links a[href$="#expertise"], .nav-mobile a[href$="#expertise"]', 'Skills', 'Keahlian'],
      ['.nav-links a[href$="#projects"], .nav-mobile a[href$="#projects"]', 'Projects', 'Proyek'],
      ['.nav-links a[href$="#experience"], .nav-mobile a[href$="#experience"]', 'Experience', 'Pengalaman'],
      ['.nav-links a[href$="#contact"], .nav-mobile a[href$="#contact"]', 'Contact', 'Kontak']
    ],
    html: [
      ['.nav-links .nav-cv, .nav-mobile .nav-cv', '⬇ Download CV', '⬇ Unduh CV'],
      ['.footer p', '© 2026 <strong>Ilham Nur</strong>. Built with HTML, CSS, and JavaScript.', '© 2026 <strong>Ilham Nur</strong>. Dibuat dengan HTML, CSS, dan JavaScript.']
    ],
    attr: [
      ['.nav-hamburger', 'aria-label', 'Toggle menu', 'Buka menu'],
      ['.back-to-top', 'aria-label', 'Back to top', 'Kembali ke atas']
    ]
  };

  const pageI18n = {
    home: {
      meta: {
        title: {
          en: 'Ilham Nur — Fullstack Laravel Developer & System Analyst | Batam',
          id: 'Ilham Nur — Fullstack Laravel Developer & System Analyst | Batam'
        },
        description: {
          en: 'Ilham Nur portfolio — Fullstack Laravel Developer & System Analyst based in Batam. Experienced in building ERP, administration systems, accounting modules, and approval workflows from analysis to deployment.',
          id: 'Portfolio Ilham Nur — Fullstack Laravel Developer & System Analyst berbasis Batam. Berpengalaman membangun ERP, sistem administrasi, accounting module, dan workflow approval dari analisis hingga deployment.'
        },
        ogDescription: {
          en: 'Professional portfolio of Ilham Nur. Laravel, ERP systems, business administration, accounting modules, Batam.',
          id: 'Portfolio profesional Ilham Nur. Laravel, sistem ERP, administrasi bisnis, accounting module, Batam.'
        }
      },
      text: [
        ['.hero-role', 'Fullstack Laravel Developer & System Analyst', 'Fullstack Laravel Developer & System Analyst'],
        ['.hero-desc', 'I build Laravel-based business applications such as ERP, administration systems, invoices, purchase orders, accounting modules, and approval workflows from analysis and database design through development and VPS deployment.', 'Saya membangun aplikasi bisnis berbasis Laravel seperti ERP, sistem administrasi, invoice, purchase order, accounting module, dan workflow approval dari tahap analisis, database design, development, hingga deployment ke VPS.'],
        ['.hero-stats > div:nth-child(1) .hero-stat-label', 'Years Experience', 'Tahun Pengalaman'],
        ['.hero-stats > div:nth-child(2) .hero-stat-label', 'Projects Delivered', 'Project Selesai'],
        ['.hero-stats > div:nth-child(3) .hero-stat-label', 'Companies', 'Perusahaan'],
        ['.dash-card:nth-child(1) .dash-card-label', 'ERP System', 'Sistem ERP'],
        ['.dash-card:nth-child(1) .dash-card-sub', 'Requests · Projects · Invoices', 'Permohonan · Proyek · Invoice'],
        ['.dash-card:nth-child(2) .dash-card-label', 'Database Design', 'Desain Database'],
        ['.dash-card:nth-child(2) .dash-card-sub', 'ERD · Relationships · Normalization', 'ERD · Relasi · Normalisasi'],
        ['.dash-card:nth-child(3) .dash-card-label', 'Approval Workflow', 'Alur Approval'],
        ['.dash-card:nth-child(3) .dash-card-sub', 'Multi-role · Status tracking', 'Multi-role · Pelacakan status'],
        ['.dash-bottom-text', 'VPS Deployment', 'Deployment VPS'],
        ['.dash-bottom-sub', 'Nginx · Linux · Production ready', 'Nginx · Linux · Siap production'],
        ['.about-accent .lbl', 'Years Dev', 'Tahun Dev'],
        ['.about .section-label', '👤 About Me', '👤 Tentang Saya'],
        ['.about .section-title', 'A Developer Who Thinks Like an Analyst', 'Developer yang Berpikir seperti Analis'],
        ['.about-inner .reveal > p:nth-of-type(1)', 'I am a Laravel-focused developer experienced in building enterprise systems such as ERP, business administration systems, invoices, purchase orders, accounting modules, and approval workflows. I work across requirement analysis, database design, backend/frontend development, and VPS deployment.', 'Saya adalah developer berbasis Laravel yang berpengalaman membangun sistem enterprise seperti ERP, sistem administrasi bisnis, invoice, purchase order, accounting module, dan workflow approval. Saya terbiasa bekerja dari tahap analisis kebutuhan, perancangan database, pengembangan backend/frontend, hingga deployment ke VPS.'],
        ['.about-inner .reveal > p:nth-of-type(2)', 'Based in Batam, Riau Islands, I do more than write code: I understand business flows, design efficient ERDs, and make sure the systems I build solve real user needs.', 'Berlokasi di Batam, Kepulauan Riau, saya tidak hanya menulis kode, tapi memahami alur bisnis, menyusun ERD yang efisien, dan memastikan sistem yang saya bangun menjawab kebutuhan nyata pengguna.'],
        ['.about-hl:nth-child(1) .about-hl-text', '2+ Years Web Development Experience', '2+ Tahun Pengalaman Web Development'],
        ['.about-hl:nth-child(3) .about-hl-text', 'ERP & Business System Development', 'Pengembangan ERP & Sistem Bisnis'],
        ['.about-hl:nth-child(4) .about-hl-text', 'System Analysis Mindset', 'Pola Pikir Analisis Sistem'],
        ['.expertise .section-label', '💡 Core Expertise', '💡 Keahlian Utama'],
        ['.expertise .section-title', 'What I Do Best', 'Apa yang Saya Kuasai'],
        ['.expertise .section-sub', 'From business analysis to deployment, I manage the full system development lifecycle.', 'Dari analisis bisnis hingga deployment, saya mengelola seluruh lifecycle pengembangan sistem.'],
        ['.projects .section-label', '📂 Featured Projects', '📂 Project Unggulan'],
        ['.projects .section-title', 'Projects I Have Built', 'Proyek yang Telah Saya Bangun'],
        ['.projects .section-sub', 'Enterprise systems and business applications developed from analysis to production.', 'Sistem enterprise dan aplikasi bisnis yang saya kembangkan dari analisis hingga production.'],
        ['.project-card:nth-child(1) .project-desc', 'A Laravel-based management system for requests, projects, invoices, payments, and approval workflows.', 'Sistem manajemen permohonan, proyek, invoice, payment, dan workflow approval berbasis Laravel.'],
        ['.project-card:nth-child(2) .project-desc', 'A business administration system for managing quotations, invoices, purchase orders, and operational documents.', 'Sistem administrasi bisnis untuk mengelola quotation, invoice, purchase order, dan dokumen operasional perusahaan.'],
        ['.project-card:nth-child(3) .project-desc', 'An integrated accounting module for Chart of Account, automatic journals, and transaction-based financial reports.', 'Modul akuntansi terintegrasi untuk Chart of Account, jurnal otomatis, dan laporan keuangan berbasis transaksi.'],
        ['.project-card:nth-child(4) .project-title', 'Financial Monitoring System', 'Sistem Monitoring Keuangan'],
        ['.project-card:nth-child(4) .project-desc', 'A financial monitoring system for a Lion Parcel logistics agent with daily and monthly transaction report visualizations.', 'Sistem monitoring keuangan untuk agen logistik Lion Parcel dengan visualisasi laporan transaksi harian dan bulanan.'],
        ['.experience .section-label', '💼 Experience', '💼 Pengalaman'],
        ['.experience .section-title', 'Work Experience', 'Pengalaman Kerja'],
        ['.experience .section-sub', 'My development journey across companies and project-based work.', 'Perjalanan karir saya sebagai developer di berbagai perusahaan dan proyek.'],
        ['.tl-item:nth-child(1) .tl-period', '2024 — Present', '2024 — Sekarang'],
        ['.tl-item:nth-child(1) .tl-company', 'Project-based / Independent', 'Project-based / Independen'],
        ['.skills .section-sub', 'Technologies and tools I use throughout the development process.', 'Teknologi dan tools yang saya gunakan dalam proses development.'],
        ['.skill-group:nth-child(6) .skill-group-name', 'Analysis', 'Analisis'],
        ['.contact .section-label', '📬 Contact', '📬 Kontak'],
        ['.contact .section-title', "Let's Collaborate", 'Mari Berkolaborasi'],
        ['.contact .container > .contact-inner > div:first-child > p', "I am open to freelance, contract, and full-time opportunities. If you need a developer who understands business systems from the ground up through deployment, let's talk.", 'Saya terbuka untuk project freelance, kontrak, maupun full-time. Jika Anda membutuhkan developer yang memahami sistem bisnis dari akar hingga deployment, mari kita bicara.'],
        ['.contact-item:nth-child(3) .contact-item-label', 'Location', 'Lokasi'],
        ['.contact-item:nth-child(3) .contact-item-value', 'Batam, Riau Islands', 'Batam, Kepulauan Riau'],
        ['.contact-cta-title', 'Contact Me Now', 'Hubungi Saya Sekarang'],
        ['.contact-cta-desc', 'Choose the most convenient channel. I usually respond within 24 hours.', 'Pilih cara paling nyaman untuk Anda. Saya biasanya merespons dalam 1x24 jam.'],
        ['.cta-btn-email > div:last-child > div:first-child', 'Email Me', 'Kirim Email'],
        ['.cta-btn-wa > div:last-child > div:first-child', 'WhatsApp Me', 'WhatsApp Saya'],
        ['.project-card:nth-child(4) .pip-text', 'Preview Coming Soon', 'Preview Segera Hadir'],
        ['.project-card:nth-child(4) .pip-sub', 'Financial monitoring dashboard', 'Dashboard monitoring keuangan']
      ],
      html: [
        ['.hero-tag', '<span class="dot"></span> Available for Projects', '<span class="dot"></span> Tersedia untuk Project'],
        ['.hero-title', 'Hi, I\'m<br><span class="accent">Ilham Nur</span>', 'Halo, Saya<br><span class="accent">Ilham Nur</span>'],
        ['.hero-float-badge.top-left', '<span class="fbi">🗄</span> MySQL ERD Design', '<span class="fbi">🗄</span> Desain ERD MySQL'],
        ['.hero-float-badge.bottom-right', '<span class="fbi">🔐</span> RBAC Implemented', '<span class="fbi">🔐</span> RBAC Terimplementasi'],
        ['.hero-cta .btn-primary', '📂 View Projects', '📂 Lihat Proyek'],
        ['.hero-cta .btn-outline:nth-child(2)', '⬇ Download CV', '⬇ Unduh CV'],
        ['.hero-cta .btn-outline:nth-child(3)', '✉ Contact Me', '✉ Hubungi Saya'],
        ['.project-card .project-role strong', 'Role:', 'Peran:'],
        ['.project-features-title', 'Key Features', 'Fitur Utama'],
        ['.project-card:nth-child(1) .feature-tag:nth-child(1)', 'Request Mgmt', 'Manajemen Permohonan'],
        ['.project-card:nth-child(1) .feature-tag:nth-child(2)', 'Project Mgmt', 'Manajemen Proyek'],
        ['.project-card:nth-child(1) .project-footer .btn', '📋 View Case Study', '📋 Lihat Studi Kasus'],
        ['.project-card:nth-child(2) .project-footer .btn', '📋 View Case Study', '📋 Lihat Studi Kasus'],
        ['.project-card:nth-child(3) .project-footer .btn', '📋 View Case Study', '📋 Lihat Studi Kasus'],
        ['.project-card:nth-child(4) .project-label .badge', 'Final Project / Thesis', 'Tugas Akhir / Skripsi'],
        ['.project-card:nth-child(4) .project-footer .btn', '🔒 Coming Soon', '🔒 Segera Hadir']
      ],
      listText: [
        ['.exp-card:nth-child(1) .exp-item', ['Requirement analysis', 'Business flow mapping', 'System flow design', 'Approval workflow'], ['Analisis kebutuhan', 'Pemetaan alur bisnis', 'Desain alur sistem', 'Workflow approval']],
        ['.exp-card:nth-child(2) .exp-item', ['Laravel', 'REST API', 'Eloquent ORM', 'Authentication & RBAC'], ['Laravel', 'REST API', 'Eloquent ORM', 'Authentication & RBAC']],
        ['.exp-card:nth-child(3) .exp-item', ['MySQL', 'ERD design', 'Relational database', 'Query optimization'], ['MySQL', 'Desain ERD', 'Database relasional', 'Optimasi query']],
        ['.exp-card:nth-child(4) .exp-item', ['VPS & Linux', 'Nginx', 'Git / GitHub / GitLab', 'Production deployment'], ['VPS & Linux', 'Nginx', 'Git / GitHub / GitLab', 'Deployment production']],
        ['.tl-item:nth-child(1) .tl-list li', ['Contributed to the development of Gatra Trust ERP and Geotama System applications.', 'Designed databases and relationships across system modules.', 'Defined application flows based on client business requirements.', 'Developed backend and frontend features using Laravel & Blade.', 'Built document, invoice, approval, and PDF report features.', 'Handled deployment and maintenance on production VPS environments.'], ['Berkontribusi dalam pengembangan aplikasi ERP Gatra Trust dan Geotama System.', 'Menyusun database dan relasi antar modul sistem.', 'Menentukan flow aplikasi berdasarkan kebutuhan bisnis klien.', 'Mengembangkan fitur backend dan frontend berbasis Laravel & Blade.', 'Membuat fitur dokumen, invoice, approval, dan report PDF.', 'Melakukan deployment dan maintenance aplikasi di VPS production.']],
        ['.tl-item:nth-child(2) .tl-list li', ['Built the Laravel-based GES Accounting System module.', 'Created Chart of Account, automatic journals, invoices, payments, debit notes, and credit notes.', 'Developed REST APIs and optimized database queries.', 'Collaborated with the UI/UX team and Project Manager.'], ['Membangun modul GES Accounting System berbasis Laravel.', 'Membuat Chart of Account, jurnal otomatis, invoice, payment, debit note, dan credit note.', 'Mengembangkan REST API dan melakukan optimasi query database.', 'Berkolaborasi dengan tim UI/UX dan Project Manager.']],
        ['.tl-item:nth-child(3) .tl-list li', ['Contributed to internal company web application development.', 'Handled enhancements and bug fixes for production applications.', 'Used GitLab and Trello for task tracking and team collaboration.'], ['Terlibat dalam pengembangan aplikasi web internal perusahaan.', 'Melakukan enhancement dan bug fixing aplikasi production.', 'Menggunakan GitLab dan Trello untuk task tracking dan kolaborasi tim.']]
      ],
      attr: [
        ['.about-img-box img', 'alt', 'Profile photo of Ilham Nur — Fullstack Laravel Developer', 'Foto profil Ilham Nur — Fullstack Laravel Developer'],
        ['.project-card:nth-child(4) .project-img img', 'alt', 'Lion Parcel Financial Monitoring System — Screenshot', 'Sistem Monitoring Keuangan Lion Parcel — Screenshot']
      ]
    },
    geotama: {
      meta: {
        title: {
          en: 'Geotama System — ERP-like Management System | Ilham Nur',
          id: 'Geotama System — ERP-like Management System | Ilham Nur'
        },
        description: {
          en: 'Geotama System case study — a Laravel-based ERP-like management system covering requests, projects, invoices, payments, and approval workflows. Built by Ilham Nur.',
          id: 'Case study Geotama System — ERP-like management system berbasis Laravel yang mencakup permohonan, proyek, invoice, payment, dan approval workflow. Dibangun oleh Ilham Nur.'
        },
        ogDescription: {
          en: 'Geotama System case study by Ilham Nur — Fullstack Developer & System Analyst.',
          id: 'Case study Geotama System oleh Ilham Nur — Fullstack Developer & System Analyst.'
        }
      },
      text: [
        ['.detail-back', '← Back to Projects', '← Kembali ke Proyek'],
        ['.detail-label .badge', 'ERP-like Management System', 'Sistem Manajemen Mirip ERP'],
        ['.detail-role', '👤 Role: Fullstack Developer & System Analyst', '👤 Peran: Fullstack Developer & System Analyst'],
        ['.detail-role-row .badge-navy', 'Production', 'Production'],
        ['.sph-text', 'geotama/dashboard.png — Screenshot will appear here', 'geotama/dashboard.png — Screenshot akan tampil di sini'],
        ['.detail-cta h3', 'Interested in a Similar Project?', 'Tertarik dengan proyek serupa?'],
        ['.detail-cta p', 'I am open to discussing your business system needs.', 'Saya terbuka untuk diskusi tentang kebutuhan sistem bisnis Anda.']
      ],
      html: [
        ['.detail-cta .btn-primary', '✉ Contact Me', '✉ Hubungi Saya'],
        ['.detail-cta .btn-ghost', '← View Other Projects', '← Lihat Project Lain']
      ],
      listText: [
        ['.detail-section-title', ['📋 Project Overview', '❗ Problem', '✅ Solution', '👨‍💻 My Contribution', '🔄 System Flow', '🗄 Database & Architecture Highlight', '📈 Result & Impact', '🖼 Gallery Preview'], ['📋 Ikhtisar Proyek', '❗ Masalah', '✅ Solusi', '👨‍💻 Kontribusi Saya', '🔄 Alur Sistem', '🗄 Sorotan Database & Arsitektur', '📈 Hasil & Dampak', '🖼 Pratinjau Galeri']],
        ['.detail-grid > div:first-child .detail-section > .detail-text', ['Geotama System is a Laravel-based ERP-like management system built to help companies manage request, project, invoice, payment, and approval workflows in one integrated web platform.', 'Previously, business processes could be scattered across many manual documents, making request, project, invoice, and payment status tracking inefficient. There was no unified system connecting the flow from the initial request to final payment.', 'The system connects requests, projects, invoices, payments, and reporting in one role-based application. Each user receives access based on their role, and every status change is recorded in real time.', 'The database was designed around multi-module relationships: request tables connect to projects, projects connect to invoices, and invoices connect to payments. Every transaction includes status tracking and a history log for audit trails. Role-based access control (RBAC) is implemented at the Laravel middleware level to protect data.', 'The system successfully integrates the full business flow from request to payment in one platform. Approval processes that were previously manual can now be tracked in real time, and documents such as invoices can be generated directly as PDFs without additional tools.'], ['Geotama System adalah aplikasi ERP-like management system berbasis Laravel yang dibuat untuk membantu perusahaan mengelola alur permohonan, proyek, invoice, payment, dan approval workflow secara terintegrasi dalam satu platform berbasis web.', 'Sebelumnya proses bisnis masih berpotensi tersebar di banyak dokumen manual, sehingga pelacakan status permohonan, proyek, invoice, dan pembayaran menjadi kurang efisien. Tidak ada sistem terpadu yang menghubungkan alur dari awal permohonan hingga pembayaran akhir.', 'Sistem dibuat untuk menghubungkan alur dari permohonan hingga proyek, invoice, pembayaran, dan laporan dalam satu aplikasi berbasis role access. Setiap user mendapatkan akses sesuai peran masing-masing, dan setiap perubahan status tercatat secara real-time.', 'Database dirancang dengan mempertimbangkan relasi multi-modul: tabel permohonan berelasi ke proyek, proyek ke invoice, invoice ke payment. Setiap transaksi memiliki status tracking dan history log untuk audit trail. Role-based access control (RBAC) diimplementasikan di level middleware Laravel untuk keamanan data.', 'Sistem berhasil mengintegrasikan seluruh alur bisnis dari permohonan hingga pembayaran dalam satu platform. Proses approval yang sebelumnya manual kini dapat dilacak secara real-time, dan dokumen seperti invoice dapat digenerate langsung ke PDF tanpa perlu tools tambahan.']],
        ['.detail-grid > div:first-child .detail-section:nth-child(4) .detail-list li', ['Analyzed business requirements and mapped system flows', 'Designed the system flow from request to reporting', 'Designed databases and relationships across modules using ERD', 'Developed the Laravel backend (models, controllers, services)', 'Developed a responsive Blade/jQuery frontend', 'Built invoice, payment tracking, and approval workflow features', 'Implemented PDF export for documents', 'Deployed to a production VPS (Linux + Nginx)'], ['Menganalisis kebutuhan bisnis dan memetakan alur sistem', 'Mendesain system flow dari permohonan hingga report', 'Menyusun database dan relasi antar modul dengan ERD', 'Mengembangkan backend Laravel (model, controller, service)', 'Mengembangkan frontend Blade/jQuery yang responsif', 'Membuat fitur invoice, payment tracking, dan approval workflow', 'Mengimplementasikan PDF export untuk dokumen', 'Deployment ke VPS production (Linux + Nginx)']],
        ['.flow-step', ['Request', 'Approval', 'Project', 'Invoice', 'Payment', 'Report'], ['Permohonan', 'Approval', 'Proyek', 'Invoice', 'Payment', 'Report']],
        ['.detail-section:nth-child(8) .gallery-caption', ['Dashboard Overview', 'Invoice Module', 'System Flow', 'PDF Export', 'Login Page'], ['Ringkasan Dashboard', 'Modul Invoice', 'Alur Sistem', 'Export PDF', 'Halaman Login']],
        ['.sidebar-card-title', ['📋 Key Features', '🛠 Tech Stack', '👤 Role Detail'], ['📋 Fitur Utama', '🛠 Tech Stack', '👤 Detail Peran']],
        ['.sidebar-feature', ['Request management', 'Project management', 'Invoice management', 'Payment tracking', 'Role-based access control', 'PDF export', 'Approval workflow'], ['Manajemen permohonan', 'Manajemen proyek', 'Manajemen invoice', 'Pelacakan payment', 'Role-based access control', 'Export PDF', 'Workflow approval']]
      ]
    },
    gatratrust: {
      meta: {
        title: {
          en: 'Gatratrust System — Business Administration System | Ilham Nur',
          id: 'Gatratrust System — Business Administration System | Ilham Nur'
        },
        description: {
          en: 'Gatratrust System case study — a Laravel-based business administration system covering quotations, invoices, purchase orders, and approval workflows. Built by Ilham Nur.',
          id: 'Case study Gatratrust System — Business administration system berbasis Laravel mencakup quotation, invoice, purchase order, dan approval workflow. Oleh Ilham Nur.'
        },
        ogDescription: {
          en: 'Gatratrust System case study by Ilham Nur — Fullstack Developer & System Analyst.',
          id: 'Case study Gatratrust System oleh Ilham Nur — Fullstack Developer & System Analyst.'
        }
      },
      text: [
        ['.detail-back', '← Back to Projects', '← Kembali ke Proyek'],
        ['.detail-label .badge', 'Business Administration System', 'Sistem Administrasi Bisnis'],
        ['.detail-role', '👤 Role: Fullstack Developer & System Analyst', '👤 Peran: Fullstack Developer & System Analyst'],
        ['.detail-role-row .badge-navy', 'Production', 'Production'],
        ['.sph-text', 'gatra/dashboard-gatra.png — Screenshot will appear here', 'gatra/dashboard-gatra.png — Screenshot akan tampil di sini'],
        ['.detail-cta h3', 'Need a Business Administration System?', 'Butuh sistem administrasi bisnis?'],
        ['.detail-cta p', 'I can build a system tailored to your company workflow.', 'Saya bisa membangun sistem yang sesuai dengan alur kerja perusahaan Anda.']
      ],
      html: [
        ['.detail-cta .btn-primary', '✉ Contact Me', '✉ Hubungi Saya'],
        ['.detail-cta .btn-ghost', '← View Other Projects', '← Lihat Project Lain']
      ],
      listText: [
        ['.detail-section-title', ['📋 Project Overview', '❗ Problem', '✅ Solution', '👨‍💻 My Contribution', '🔄 System Flow', '🗄 Database & Architecture Highlight', '📈 Result & Impact', '🖼 Gallery Preview'], ['📋 Ikhtisar Proyek', '❗ Masalah', '✅ Solusi', '👨‍💻 Kontribusi Saya', '🔄 Alur Sistem', '🗄 Sorotan Database & Arsitektur', '📈 Hasil & Dampak', '🖼 Pratinjau Galeri']],
        ['.detail-grid > div:first-child .detail-section > .detail-text', ['Gatratrust System is a Laravel-based business administration application for managing quotations, invoices, purchase orders, and company operational documents. The system is designed to speed up administrative workflows and ensure every document follows a structured approval flow.', 'Business administration requires document flows that are consistent, structured, and easy to track so operations can run more efficiently. Without an integrated system, creating quotations, invoices, and purchase orders can lead to data inconsistencies and duplicated work.', 'The system helps teams input client data, create quotations, invoices, purchase orders, and print-ready documents through a clear approval flow. Each document status can be tracked, and the output is ready to send to clients.', 'The database was designed around relationships between client entities, quotation documents, invoices, and purchase orders. Every document has trackable versions and statuses. The approval system is modular, making it easy to configure for different document types. Document templates are stored in the system and can be regenerated at any time.', 'The quotation process, previously handled manually in spreadsheets, can now be completed in minutes with automatic calculations. The approval flow is transparent, every change can be clearly tracked, and document outputs are ready to print or send by email.'], ['Gatratrust System adalah aplikasi administrasi bisnis berbasis Laravel untuk mengelola quotation, invoice, purchase order, dan dokumen operasional perusahaan. Sistem ini dirancang untuk mempercepat alur kerja administrasi dan memastikan setiap dokumen memiliki alur persetujuan yang terstruktur.', 'Proses administrasi bisnis membutuhkan alur dokumen yang konsisten, terstruktur, dan mudah dilacak agar pekerjaan operasional lebih efisien. Tanpa sistem terpadu, pembuatan quotation, invoice, dan purchase order rawan terjadi inkonsistensi data dan duplikasi kerja.', 'Sistem dibuat untuk membantu proses input data klien, pembuatan quotation, invoice, purchase order, dan dokumen siap cetak dengan alur approval yang jelas. Setiap dokumen dapat ditrack statusnya, dan output berupa file yang siap dikirimkan kepada klien.', 'Database dirancang dengan mempertimbangkan relasi antara entitas klien, dokumen quotation, invoice, dan purchase order. Setiap dokumen memiliki versi dan status yang dapat dilacak. Sistem approval dirancang modular sehingga mudah dikonfigurasi untuk berbagai tipe dokumen. Template dokumen tersimpan di sistem dan dapat di-generate ulang kapan saja.', 'Proses pembuatan quotation yang sebelumnya manual menggunakan spreadsheet kini dapat dilakukan dalam hitungan menit dengan kalkulasi otomatis. Alur approval menjadi transparan dan setiap perubahan dapat dilacak dengan jelas. Output dokumen langsung siap cetak atau kirim via email.']],
        ['.detail-grid > div:first-child .detail-section:nth-child(4) .detail-list li', ['Analyzed client business requirements directly', 'Defined and designed administrative document flows', 'Designed databases and relationships across tables', 'Developed the quotation module with automatic calculations', 'Developed invoice and purchase order modules', 'Built a multi-level approval system', 'Created print-ready document output (PDF)'], ['Menganalisis kebutuhan bisnis klien secara langsung', 'Menentukan dan merancang flow dokumen administrasi', 'Mendesain database dan relasi antar tabel', 'Mengembangkan modul quotation dengan kalkulasi otomatis', 'Mengembangkan modul invoice dan purchase order', 'Membuat approval system multi-level', 'Membuat output dokumen siap cetak (PDF)']],
        ['.detail-section:nth-child(8) .gallery-caption', ['Dashboard', 'Quotation Form', 'Invoice List', 'Document Output', 'Login Page'], ['Dashboard', 'Form Quotation', 'Daftar Invoice', 'Output Dokumen', 'Halaman Login']],
        ['.sidebar-card-title', ['📋 Key Features', '🛠 Tech Stack', '👤 Role Detail'], ['📋 Fitur Utama', '🛠 Tech Stack', '👤 Detail Peran']],
        ['.sidebar-feature', ['Client data management', 'Quotation management', 'Invoice management', 'Purchase Order', 'Approval workflow', 'Document output / print'], ['Manajemen data klien', 'Manajemen quotation', 'Manajemen invoice', 'Purchase Order', 'Workflow approval', 'Output dokumen / print']]
      ]
    },
    ges: {
      meta: {
        title: {
          en: 'GES Accounting System — Integrated Accounting Module | Ilham Nur',
          id: 'GES Accounting System — Integrated Accounting Module | Ilham Nur'
        },
        description: {
          en: 'GES Accounting System case study — an integrated Laravel-based accounting module with Chart of Account, automatic journals, and financial reporting. Built by Ilham Nur.',
          id: 'Case study GES Accounting System — modul akuntansi terintegrasi berbasis Laravel dengan Chart of Account, jurnal otomatis, dan laporan keuangan. Oleh Ilham Nur.'
        },
        ogDescription: {
          en: 'GES Accounting System case study by Ilham Nur — Backend Developer at PT. Global Inovasi Amerta.',
          id: 'Case study GES Accounting System oleh Ilham Nur — Backend Developer di PT. Global Inovasi Amerta.'
        }
      },
      text: [
        ['.detail-back', '← Back to Projects', '← Kembali ke Proyek'],
        ['.detail-role', '👤 Role: Backend Developer', '👤 Peran: Backend Developer'],
        ['.sph-text', 'ges/chart-of-account.png — Screenshot will appear here', 'ges/chart-of-account.png — Screenshot akan tampil di sini'],
        ['.detail-cta h3', 'Need an Accounting Module for Your System?', 'Butuh modul accounting untuk sistem Anda?'],
        ['.detail-cta p', 'I have experience building integrated accounting systems with Laravel.', 'Saya berpengalaman membangun sistem akuntansi terintegrasi dengan Laravel.']
      ],
      html: [
        ['.detail-cta .btn-primary', '✉ Contact Me', '✉ Hubungi Saya'],
        ['.detail-cta .btn-ghost', '← View Other Projects', '← Lihat Project Lain']
      ],
      listText: [
        ['.detail-section-title', ['📋 Project Overview', '❗ Problem', '✅ Solution', '👨‍💻 My Contribution', '🔄 System Flow', '🗄 Database & Architecture Highlight', '📈 Result & Impact', '🖼 Gallery Preview'], ['📋 Ikhtisar Proyek', '❗ Masalah', '✅ Solusi', '👨‍💻 Kontribusi Saya', '🔄 Alur Sistem', '🗄 Sorotan Database & Arsitektur', '📈 Hasil & Dampak', '🖼 Pratinjau Galeri']],
        ['.detail-grid > div:first-child .detail-section > .detail-text', ['GES Accounting System is an integrated Laravel-based accounting module that automatically connects operational transactions with journals and financial reports. The system was built as part of a larger business platform at PT. Global Inovasi Amerta, replacing inefficient manual journal recording.', 'Operational transactions such as invoices, payments, debit notes, and credit notes need to be recorded consistently in journals without repetitive manual input. Manual processes are error-prone and cannot guarantee consistency between transaction data and generated financial reports.', 'The accounting module generates automatic journals from different transaction types and keeps financial data consistent in real time. Every transaction entered into the system automatically triggers journal entry creation based on configured accounting rules, without manual input from accounting staff.', 'The accounting module architecture was designed using double-entry bookkeeping principles. Every journal entry has balanced debit and credit pairs. The Chart of Account is designed hierarchically with account types (Asset, Liability, Equity, Revenue, Expense) that support automatic financial report generation. Queries were optimized using Eloquent eager loading and proper indexes to support reporting with large transaction datasets.', 'Journal recording, previously handled manually, now happens automatically whenever a new transaction is created. Financial data consistency improved significantly because there is no longer a gap between operational data and accounting data. The accounting team can focus on financial report analysis instead of manual data entry.'], ['GES Accounting System adalah modul akuntansi terintegrasi berbasis Laravel yang menghubungkan transaksi operasional dengan jurnal dan laporan keuangan secara otomatis. Sistem ini dibangun sebagai bagian dari platform bisnis yang lebih besar di PT. Global Inovasi Amerta, menggantikan pencatatan jurnal manual yang tidak efisien.', 'Transaksi operasional seperti invoice, payment, debit note, dan credit note perlu tercatat ke jurnal secara konsisten tanpa input manual berulang. Proses manual rawan kesalahan dan tidak menjamin konsistensi antara data transaksi dan laporan keuangan yang dihasilkan.', 'Modul accounting dibuat untuk menghasilkan jurnal otomatis dari berbagai jenis transaksi dan menjaga konsistensi data keuangan secara real-time. Setiap transaksi yang masuk ke sistem secara otomatis memicu pembuatan journal entry sesuai dengan aturan akuntansi yang telah dikonfigurasi, tanpa perlu input manual dari staf akuntansi.', 'Arsitektur modul akuntansi dirancang menggunakan prinsip double-entry bookkeeping. Setiap journal entry memiliki pasangan debit dan credit yang seimbang. Chart of Account didesain hierarkis dengan tipe akun (Asset, Liability, Equity, Revenue, Expense) yang mendukung pembuatan laporan keuangan otomatis. Query dioptimasi menggunakan Eloquent eager loading dan index yang tepat untuk mendukung pelaporan dengan data transaksi besar.', 'Proses pencatatan jurnal yang sebelumnya dilakukan manual kini terjadi secara otomatis setiap kali ada transaksi baru. Konsistensi data keuangan meningkat signifikan karena tidak ada lagi gap antara data operasional dan data akuntansi. Tim akuntansi dapat fokus pada analisis laporan keuangan daripada input data manual.']],
        ['.detail-grid > div:first-child .detail-section:nth-child(4) .detail-list li', ['Built a flexible Chart of Account (CoA) module', 'Created an automatic journal engine based on transaction types', 'Integrated invoice transactions into journal entries', 'Integrated payment transactions into journals in real time', 'Developed debit note and credit note modules', 'Built REST APIs for frontend consumption and integration with other systems', 'Optimized database queries for reporting performance', 'Collaborated with the UI/UX team and Project Manager'], ['Membangun modul Chart of Account (CoA) yang fleksibel', 'Membuat engine jurnal otomatis berdasarkan jenis transaksi', 'Mengintegrasikan transaksi invoice ke journal entry', 'Mengintegrasikan transaksi payment ke jurnal secara real-time', 'Mengembangkan modul debit note dan credit note', 'Membangun REST API untuk konsumsi frontend dan integrasi sistem lain', 'Melakukan optimasi query database untuk performa pelaporan', 'Berkolaborasi dengan tim UI/UX dan Project Manager']],
        ['.detail-section:nth-child(8) .gallery-caption', ['Chart of Account', 'General Journal', 'Invoice Journal', 'Financial Report', 'Login Page'], ['Chart of Account', 'General Journal', 'Jurnal Invoice', 'Laporan Keuangan', 'Halaman Login']],
        ['.sidebar-card-title', ['📋 Key Features', '🛠 Tech Stack', '🏢 Company', '👤 Role Detail'], ['📋 Fitur Utama', '🛠 Tech Stack', '🏢 Perusahaan', '👤 Detail Peran']],
        ['.sidebar-feature', ['Chart of Account', 'General journal', 'Automatic journal', 'Invoice journal', 'Payment journal', 'Debit note', 'Credit note', 'Financial report integration'], ['Chart of Account', 'General journal', 'Jurnal otomatis', 'Jurnal invoice', 'Jurnal payment', 'Debit note', 'Credit note', 'Integrasi laporan keuangan']]
      ]
    }
  };

  function getPageKey() {
    const fileName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (fileName.includes('geotama')) return 'geotama';
    if (fileName.includes('gatratrust')) return 'gatratrust';
    if (fileName.includes('ges-accounting')) return 'ges';
    return 'home';
  }

  function setNodeContent(node, value, mode) {
    if (!node || typeof value === 'undefined') return;
    if (mode === 'html') node.innerHTML = value;
    else node.textContent = value;
  }

  function applySimpleEntries(entries, lang, mode) {
    (entries || []).forEach(([selector, en, id]) => {
      document.querySelectorAll(selector).forEach(node => {
        setNodeContent(node, lang === 'id' ? id : en, mode);
      });
    });
  }

  function applyListEntries(entries, lang) {
    (entries || []).forEach(([selector, enValues, idValues]) => {
      const values = lang === 'id' ? idValues : enValues;
      document.querySelectorAll(selector).forEach((node, index) => {
        setNodeContent(node, values[index], 'text');
      });
    });
  }

  function applyAttrEntries(entries, lang) {
    (entries || []).forEach(([selector, attr, en, id]) => {
      document.querySelectorAll(selector).forEach(node => {
        node.setAttribute(attr, lang === 'id' ? id : en);
      });
    });
  }

  function applyMeta(meta, lang) {
    if (!meta) return;
    document.title = meta.title[lang];

    const description = document.querySelector('meta[name="description"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (description) description.setAttribute('content', meta.description[lang]);
    if (ogDescription) ogDescription.setAttribute('content', meta.ogDescription[lang]);
  }

  function applyEntries(entries, lang) {
    applySimpleEntries(entries.text, lang, 'text');
    applySimpleEntries(entries.html, lang, 'html');
    applyListEntries(entries.listText, lang);
    applyAttrEntries(entries.attr, lang);
  }

  function applyLanguage(lang) {
    const pageKey = getPageKey();
    const pageEntries = pageI18n[pageKey] || pageI18n.home;

    document.documentElement.lang = lang;
    document.body.dataset.language = lang;

    applyEntries(commonI18n, lang);
    applyEntries(pageEntries, lang);
    applyMeta(pageEntries.meta, lang);

    langButtons.forEach(button => {
      const isActive = button.dataset.langOption === lang;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function getSavedLanguage() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {
      // The switcher still works for the current page if storage is unavailable.
    }
  }

  function initLanguageSwitcher() {
    const savedLang = getSavedLanguage();
    const initialLang = savedLang === 'id' || savedLang === 'en' ? savedLang : 'en';

    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        const nextLang = button.dataset.langOption;
        if (nextLang !== 'id' && nextLang !== 'en') return;
        saveLanguage(nextLang);
        applyLanguage(nextLang);
      });
    });

    applyLanguage(initialLang);
  }

  function onScroll() {
    const y = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', y > 20);
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', y > 400);
    }

    if (!sections.length) return;

    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  initLanguageSwitcher();
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 68;
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const typingEl = document.querySelector('.hero-typing');
  if (typingEl) {
    const words = ['Fullstack Laravel Developer', 'System Analyst', 'ERP Builder', 'Backend Developer'];
    let wi = 0, ci = 0, deleting = false;
    function typeLoop() {
      const word = words[wi];
      typingEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
      if (deleting && ci < 0)            { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
      setTimeout(typeLoop, deleting ? 55 : 90);
    }
    typeLoop();
  }

  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }, 16);
  }
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.target), 1200);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

})();
