const express = require("express");
const products = require("../data/products");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Beranda", preview: products.slice(0, 4), total: products.length });
});

router.get("/produk", (req, res) => {
  const { kategori = "", search = "" } = req.query;
  let hasil = products;
  if (kategori) hasil = hasil.filter((p) => p.category === kategori);
  if (search) hasil = hasil.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const kategoriList = [...new Set(products.map((p) => p.category))];
  res.render("produk", { title: "Produk", products: hasil, kategoriList, kategori, search });
});

router.get("/produk/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).render("produk-not-found", { title: "Produk tidak ditemukan", id: req.params.id });
  }
  res.render("detail", { title: product.name, product });
});

router.get("/tanya-ai", (req, res) => res.render("tanya-ai", { title: "Tanya AI" }));

module.exports = router;
const { requireLogin } = require("../middleware/auth");

router.get("/login", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("login", { title: "Login Admin", error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.user = { username };
    return res.redirect("/dashboard");
  }
  res.status(401).render("login", { title: "Login Admin", error: "Username atau password salah." });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});
