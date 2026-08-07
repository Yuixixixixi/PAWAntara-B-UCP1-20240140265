const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);                                  // middleware custom
app.use(express.static(path.join(__dirname, "public"))); // static assets

app.use("/api", apiRoutes);
app.use("/", pageRoutes);

app.use((req, res) => res.status(404).render("404", { title: "Tidak ditemukan" }));

app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
