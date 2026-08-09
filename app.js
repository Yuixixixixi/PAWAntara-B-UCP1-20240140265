require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");

// Import Middleware & Routes
const logger = require("./middleware/logger");
const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 2. Session Middleware (Harus dipasang sebelum variabel lokal & routes)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "rahasia",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 jam
  })
);

// 3. Request Parsers & Custom Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));

// 4. Global Locals Middleware (Mengakses req.session untuk tampilan EJS)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// 5. Routes Definition
app.use("/api", chatRoutes);
app.use("/api", apiRoutes);
app.use("/", pageRoutes);

// 6. 404 Handler (Harus ditempatkan setelah semua route)
app.use((req, res) => {
  res.status(404).render("404", { title: "Tidak ditemukan" });
});

// 7. Server Initialization
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});