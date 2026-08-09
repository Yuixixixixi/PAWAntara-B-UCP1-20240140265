const express = require("express");
const products = require("../data/products");
const { requireApiAuth } = require("../middleware/auth");

const router = express.Router();

// validasi sederhana
function validasiProduk(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push("name wajib diisi");
  if (!body.category || !body.category.trim()) errors.push("category wajib diisi");
  if (body.price === undefined || isNaN(Number(body.price)) || Number(body.price) <= 0) errors.push("price harus angka > 0");
  if (body.stock === undefined || isNaN(Number(body.stock)) || Number(body.stock) < 0) errors.push("stock harus angka >= 0");
  return errors;
}

// READ semua (publik) + filter ?kategori= &search=
router.get("/products", (req, res) => {
  const { kategori = "", search = "" } = req.query;
  let data = products;
  if (kategori) data = data.filter((p) => p.category.toLowerCase() === kategori.toLowerCase());
  if (search) data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json({ status: "success", message: "Data produk berhasil diambil", total: data.length, data });
});

// READ satu (publik)
router.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  res.json({ status: "success", message: "Detail produk", data: product });
});

// CREATE (butuh login)
router.post("/products", requireApiAuth, (req, res) => {
  const errors = validasiProduk(req.body);
  if (errors.length) return res.status(400).json({ status: "error", message: "Validasi gagal", errors });

  const baru = {
    id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name: req.body.name.trim(),
    category: req.body.category.trim(),
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    unit: req.body.unit || "pcs",
    image: req.body.image || "/img/beras.svg",
    description: req.body.description || "-",
  };
  products.push(baru);
  res.status(201).json({ status: "success", message: "Produk berhasil ditambahkan", data: baru });
});

// UPDATE (butuh login)
router.put("/products/:id", requireApiAuth, (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });

  const errors = validasiProduk(req.body);
  if (errors.length) return res.status(400).json({ status: "error", message: "Validasi gagal", errors });

  products[index] = {
    ...products[index],
    name: req.body.name.trim(),
    category: req.body.category.trim(),
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    unit: req.body.unit || products[index].unit,
    description: req.body.description || products[index].description,
  };
  res.json({ status: "success", message: "Produk berhasil diperbarui", data: products[index] });
});

// DELETE (butuh login)
router.delete("/products/:id", requireApiAuth, (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  const [dihapus] = products.splice(index, 1);
  res.json({ status: "success", message: "Produk berhasil dihapus", data: dihapus });
});

module.exports = router;
