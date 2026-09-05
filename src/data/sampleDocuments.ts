import { DocumentFile } from "../types";

export const initialDocuments: DocumentFile[] = [
  {
    id: "doc-1",
    title: "Rencana Strategis & Roadmap Produk 2026.docx",
    lastModified: Date.now() - 1000 * 60 * 12,
    wordCount: 420,
    characterCount: 2980,
    pinned: true,
    markdown: `# Rencana Strategis & Roadmap Produk 2026

## Ringkasan Eksekutif
Dokumen ini merinci arah strategis dan sasaran pengembangan platform digital terintegrasi untuk kuartal mendatang. Fokus utama berpusat pada kecepatan performa, kemudahan antarmuka pengguna, dan integrasi fitur analitik mendalam.

> "Kesederhanaan yang dipadukan dengan keandalan tinggi adalah esensi dari pengalaman pengguna profesional."

## Matriks Target Kuartal
Berikut adalah alokasi inisiatif utama dan metrik keberhasilan:

| Kuartal | Inisiatif Utama | Metrik Target | Status |
| :--- | :--- | :--- | :--- |
| **Q1 2026** | Restrukturisasi Arsitektur Frontend | Akselerasi render < 50ms | Selesai |
| **Q2 2026** | Sistem Kolaborasi & Sub-menu Bertingkat | Uji Coba Beta Internal | Aktif |
| **Q3 2026** | Otomasi Ekspor Dokumen & AI Formatting | Kepuasan Pengguna 98% | Terjadwal |

## Daftar Tugas Prioritas
- [x] Evaluasi performa render canvas dokumen
- [x] Implementasi 8 kategori menu navigasi dan sub-menu
- [ ] Integrasi asisten AI untuk tata bahasa dan penyuntingan cerdas
- [ ] Pengujian pencetakan format PDF A4 standar industri`,
    content: `<h1>Rencana Strategis &amp; Roadmap Produk 2026</h1>
<p>Dokumen ini merinci arah strategis dan sasaran pengembangan platform digital terintegrasi untuk kuartal mendatang. Fokus utama berpusat pada kecepatan performa, kemudahan antarmuka pengguna, dan integrasi fitur analitik mendalam.</p>

<div class="callout-box callout-info">
  <div>
    <strong>Sorotan Strategis:</strong> Seluruh modul editor dirancang dengan prinsip desktop-grade, memberikan kontrol penuh hingga ke sub-menu terkecil untuk efisiensi produktivitas maksimal.
  </div>
</div>

<blockquote>
  "Kesederhanaan yang dipadukan dengan keandalan tinggi adalah esensi dari pengalaman pengguna profesional."
</blockquote>

<h2>1. Matriks Target Kuartal</h2>
<p>Tabel berikut menyajikan alokasi inisiatif kuartalan berserta tolok ukur kesuksesan yang harus dipenuhi:</p>

<table>
  <thead>
    <tr>
      <th>Kuartal</th>
      <th>Inisiatif Utama</th>
      <th>Metrik Target</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Q1 2026</strong></td>
      <td>Restrukturisasi Arsitektur Dokumen</td>
      <td>Akselerasi render &lt; 50ms</td>
      <td><span style="color: #15803d; font-weight: 600;">Selesai</span></td>
    </tr>
    <tr>
      <td><strong>Q2 2026</strong></td>
      <td>Sistem Menu Bertingkat &amp; Sub-menu Lengkap</td>
      <td>Akurasi Menu 100%</td>
      <td><span style="color: #2563eb; font-weight: 600;">Aktif</span></td>
    </tr>
    <tr>
      <td><strong>Q3 2026</strong></td>
      <td>Otomasi Ekspor PDF &amp; Konversi Format</td>
      <td>Presisi Format A4/Letter</td>
      <td><span style="color: #d97706; font-weight: 600;">Terjadwal</span></td>
    </tr>
  </tbody>
</table>

<div class="callout-box callout-success">
  <div>
    <strong>Pencapaian:</strong> Arsitektur visual modular kini mendukung pergantian cepat antara Tampilan Halaman (Page View) dan Tampilan Kontinu (Continuous Canvas).
  </div>
</div>

<h2>2. Daftar Tugas Prioritas</h2>
<ul style="list-style-type: none; padding-left: 0.5rem;">
  <li><label><input type="checkbox" checked="" style="margin-right: 8px;" /> Evaluasi performa render canvas dokumen</label></li>
  <li><label><input type="checkbox" checked="" style="margin-right: 8px;" /> Implementasi 8 kategori menu navigasi dan sub-menu</label></li>
  <li><label><input type="checkbox" style="margin-right: 8px;" /> Integrasi asisten AI untuk tata bahasa dan penyuntingan cerdas</label></li>
  <li><label><input type="checkbox" style="margin-right: 8px;" /> Pengujian pencetakan format PDF A4 standar industri</label></li>
</ul>

<h2>3. Cuplikan Konfigurasi Teknis</h2>
<p>Format penyimpanan terstruktur memungkinkan serialisasi cepat dokumen:</p>

<pre><code>// Konfigurasi Dokumen Profesional
const documentConfig = {
  paperSize: "A4",
  orientation: "portrait",
  autoSaveInterval: 1500, // ms
  features: ["cascading-submenus", "markdown-split", "smart-ai-assist"]
};</code></pre>
`
  },
  {
    id: "doc-2",
    title: "Catatan Riset & Dokumentasi Teknis.md",
    lastModified: Date.now() - 1000 * 60 * 180,
    wordCount: 195,
    characterCount: 1350,
    markdown: `# Catatan Riset & Dokumentasi Teknis

## Gambaran Umum
Arsitektur editor berbasis konten interaktif dengan dukungan multiformat.

### Spesifikasi Inti:
1. Dukungan rendering visual WYSIWYG
2. Sinkronisasi dua arah dengan Markdown
3. Ekspor instan ke PDF, Markdown, HTML, dan Plain Text`,
    content: `<h1>Catatan Riset &amp; Dokumentasi Teknis</h1>
<p>Arsitektur editor ini dirancang untuk menggabungkan kemudahan editor teks modern dengan kedalaman kontrol dokumen formal ala pengolah kata desktop.</p>

<div class="callout-box callout-note">
  <div>
    <strong>Catatan Teknis:</strong> Sistem mendeteksi otomatis struktur heading (H1, H2, H3) untuk membuat daftar isi (Outline) secara real-time di bilah samping.
  </div>
</div>

<h2>Spesifikasi Fungsional</h2>
<ul>
  <li><strong>Formatting Teks Lengkap:</strong> Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Warna Teks, dan Stabilo.</li>
  <li><strong>Manajemen Tabel Dinamis:</strong> Tambah/hapus baris dan kolom dengan satu klik.</li>
  <li><strong>Sub-menu Berlapis:</strong> Tersedia menu Berkas, Sunting, Tampilan, Sisipkan, Format, Alat, Tabel, dan Bantuan.</li>
</ul>`
  }
];
