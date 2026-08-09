const formTambah = document.getElementById("formTambah");
const pesanForm = document.getElementById("pesanForm");

if (formTambah) {
  formTambah.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(formTambah).entries());
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      pesanForm.textContent = data.message;
      pesanForm.className = "mt-2 text-sm text-emerald-700";
      setTimeout(() => location.reload(), 600);
    } else {
      pesanForm.textContent = (data.errors || [data.message]).join(", ");
      pesanForm.className = "mt-2 text-sm text-red-600";
    }
  });
}

document.querySelectorAll(".btnHapus").forEach((btn) => {
  btn.addEventListener("click", async () => {
    if (!confirm("Hapus produk ini?")) return;
    const res = await fetch(`/api/products/${btn.dataset.id}`, { method: "DELETE" });
    if (res.ok) btn.closest("tr").remove();
    else alert("Gagal menghapus produk.");
  });
});
