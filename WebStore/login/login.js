document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const loginError = document.getElementById("login-error");
  const usernameInput = document.getElementById("username-input");
  const platformSelect = document.getElementById("platform-select");
  const skinPreview = document.getElementById("skin-preview");

  // Sembunyikan skin preview di awal
  skinPreview.style.display = "none";

  // Fungsi untuk update skin preview
  const updateSkinPreview = () => {
    const usernameRaw = usernameInput.value.trim();
    const platform = platformSelect.value;

    if (!usernameRaw) {
      skinPreview.style.display = "none";
      skinPreview.src = "";
      return;
    }

    const finalUsername = platform === "bedrock" ? "Steve" : usernameRaw;

    skinPreview.src = `https://mc-heads.net/avatar/${finalUsername}/100`;
    skinPreview.style.display = "block";
  };

  // Deteksi perubahan input username & platform
  usernameInput.addEventListener("input", updateSkinPreview);
  platformSelect.addEventListener("change", updateSkinPreview);

  loginBtn.addEventListener("click", async () => {
    const usernameRaw = usernameInput.value.trim();
    const platform = platformSelect.value;
    const finalUsername = platform === "bedrock" ? `.${usernameRaw}` : usernameRaw;

    if (!usernameRaw) {
      loginError.textContent = "Username tidak boleh kosong.";
      return;
    }

    try {
      const res = await fetch("/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: finalUsername })
      });

      const data = await res.json();
      if (res.ok && data.exists) {
        localStorage.setItem("username", finalUsername);
        window.location.href = "/home/home.html";
      } else {
        loginError.textContent = "Username tidak ditemukan.";
      }
    } catch (err) {
      loginError.textContent = "Gagal menghubungi server.";
    }
  });
});