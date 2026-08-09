const express = require("express");
const products = require("../data/products");

const router = express.Router();

const faq = [
  { kata: ["jam", "buka", "tutup", "operasional"], jawab: "Toko buka setiap hari 07.00-20.00 WIB." },
  { kata: ["ongkir", "antar", "kirim", "delivery"], jawab: "Gratis antar untuk radius 3 km, di luar itu Rp5.000/km." },
  { kata: ["bayar", "pembayaran", "qris", "transfer"], jawab: "Pembayaran bisa tunai, transfer bank, dan QRIS." },
  { kata: ["alamat", "lokasi", "dimana"], jawab: "Toko Sembako Ariesta ada di Jl. Melati No. 12, Bantul, Yogyakarta." },
];

router.post("/chat", (req, res) => {
  const pesan = (req.body.message || "").toString().trim();
  if (!pesan) return res.status(400).json({ status: "error", message: "message wajib diisi" });

  const teks = pesan.toLowerCase();

  // 1) cek pertanyaan stok/harga produk
  const cocok = products.find((p) => teks.includes(p.name.toLowerCase().split(" ")[0]));
  if (cocok && (teks.includes("stok") || teks.includes("harga") || teks.includes("ada"))) {
    const info = cocok.stock > 0
      ? `${cocok.name} tersedia ${cocok.stock} ${cocok.unit}, harga Rp${cocok.price.toLocaleString("id-ID")}.`
      : `${cocok.name} sedang habis, silakan cek lagi besok.`;
    return res.json({ status: "success", reply: info, source: "produk" });
  }

  // 2) cek FAQ
  const item = faq.find((f) => f.kata.some((k) => teks.includes(k)));
  if (item) return res.json({ status: "success", reply: item.jawab, source: "faq" });

  // 3) fallback
  res.json({
    status: "success",
    reply: "Maaf, saya belum paham. Coba tanya soal jam buka, ongkir, pembayaran, atau stok produk tertentu.",
    source: "fallback",
  });
});

module.exports = router;
