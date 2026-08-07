const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    const terbuka = !mobileMenu.classList.toggle("hidden");
    hamburgerBtn.setAttribute("aria-expanded", String(terbuka));
  });
}

const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("pertanyaan");
    const teks = input.value.trim();
    if (!teks) return alert("Pertanyaan tidak boleh kosong.");
    tambahBubble(teks, "user");
    tambahBubble("Terima kasih! Balasan otomatis aktif di Sprint 2.", "ai");
    input.value = "";
  });
}

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
}
