// Navigasi Mobile Hamburger
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    const terbuka = !mobileMenu.classList.toggle("hidden");
    hamburgerBtn.setAttribute("aria-expanded", String(terbuka));
  });
}

// Fitur Chat AI
const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");

if (chatForm && chatBox) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.getElementById("pertanyaan");
    const teks = input.value.trim();
    if (!teks) return alert("Pertanyaan tidak boleh kosong.");

    tambahBubble(teks, "user");
    input.value = "";
    
    const loading = tambahBubble("Sedang mengetik...", "ai");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: teks }),
      });

      const data = await res.json();
      loading.querySelector("p").textContent = data.reply || "Terjadi kesalahan.";
    } catch (err) {
      loading.querySelector("p").textContent = "Gagal menghubungi server.";
    }
  });
}

// Helper untuk menambahkan bubble chat
function tambahBubble(teks, tipe) {
  const bubble = document.createElement("article");
  
  bubble.className = tipe === "user"
    ? "self-end max-w-[80%] bg-emerald-700 text-white rounded-2xl px-4 py-2"
    : "self-start max-w-[80%] bg-stone-100 rounded-2xl px-4 py-2";

  const p = document.createElement("p");
  p.className = "text-sm";
  p.textContent = teks;

  bubble.appendChild(p);
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  return bubble;
}