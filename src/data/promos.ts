import { PromoItem } from '../types';
import promoRicebowlImg from '../assets/images/promo_ricebowl_1788924056813.jpg';

export const DEMO_PROMOS: PromoItem[] = [
  {
    id: 'promo-01',
    title: 'BUY 2 GET 1 FREE',
    badge: 'PROMO SPESIAL',
    subtitle: 'Khusus Minggu Ini!',
    description: 'Beli 2 Ricebowl varian Ayam (Sambal Matah / Geprek / Teriyaki), GRATIS 1 Ricebowl Ayam Telur Asin atau 1 Porsi Kulit Krispi!',
    code: 'TIMOBUY2GET1',
    image: promoRicebowlImg,
    validUntil: '23:59 WIB Hari Ini',
    discountNote: 'Hemat hingga Rp 30.000',
    terms: [
      'Berlaku untuk pemesanan online & takeaway di seluruh outlet.',
      'Tidak dapat digabung dengan promo kupon lainnya.',
      'Satu transaksi maksimal 1 item gratis.',
      'Data promo ini merupakan konten DEMO simulasi.',
    ],
  },
  {
    id: 'promo-02',
    title: 'COMBO KENYANG SIANG',
    badge: 'FLASH DEAL',
    subtitle: 'Setiap Jam 11:00 - 14:00',
    description: '1 Ricebowl Sapi Yakiniku + 1 Es Lemon Tea Sereh Madu cuma Rp 40.000 (Harga normal Rp 48.000).',
    code: 'SIANGKENYANG',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    validUntil: 'Setiap Hari Kerja',
    discountNote: 'Potongan Rp 8.000',
    terms: [
      'Berlaku pada jam makan siang 11.00 - 14.00 WIB.',
      'Berlaku kelipatan hingga 3 porsi per pesanan.',
      'Data promo ini merupakan konten DEMO simulasi.',
    ],
  },
  {
    id: 'promo-03',
    title: 'HEMAT TANGGAL TUA 25%',
    badge: 'KODE VOUCHER',
    subtitle: 'Minimal Belanja Rp 60.000',
    description: 'Gunakan kode promo KOHTIMOHEMAT untuk diskon 25% semua menu ricebowl tanpa syarat ribet.',
    code: 'KOHTIMOHEMAT',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    validUntil: 'Akhir Bulan Ini',
    discountNote: 'Diskon Maksimal Rp 20.000',
    terms: [
      'Masukkan kode voucher pada saat checkout ringkasan pesanan.',
      'Berlaku untuk pelanggan baru maupun setia.',
      'Data promo ini merupakan konten DEMO simulasi.',
    ],
  },
];
