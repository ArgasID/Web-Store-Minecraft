document.addEventListener("DOMContentLoaded", () => {
  const resultMessage = document.getElementById("result-message");
  const displayName = document.getElementById("display-name");
  const profilePic = document.getElementById("profile-pic");
  const profileUsername = document.getElementById("profile-username");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const logoutBtn = document.getElementById("logout-btn");
  const profileDropdown = document.getElementById("profile-dropdown");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "../login.html";
    return;
  }

  displayName.textContent = username;
  const cleanName = username.startsWith('.') ? username.slice(1) : username;

  profilePic.src = username.startsWith('.')
    ? "https://mc-heads.net/avatar/Steve/100"
    : `https://mc-heads.net/avatar/${cleanName}/100`;
  profileUsername.textContent = cleanName;

  profileDropdown.addEventListener("click", () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  });

  menuToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    window.location.href = "../login.html";
  });

  document.querySelectorAll(".buy-rank-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const rank = button.closest(".rank-card").dataset.rank;
      try {
        const res = await fetch("/buy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-username": username
          },
          body: JSON.stringify({ username, rank })
        });

        const data = await res.json();
        resultMessage.textContent = data.message;
        resultMessage.style.color = res.ok ? "green" : "red";
      } catch {
        resultMessage.textContent = "Gagal mengirim permintaan.";
        resultMessage.style.color = "red";
      }
    });
  });

  // Popup fitur deskripsi
  const infoButtons = document.querySelectorAll(".info-button");
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const closePopup = document.getElementById("close-popup");

  infoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      popupText.textContent = btn.dataset.info;
      popup.style.display = "flex";
    });
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });
});