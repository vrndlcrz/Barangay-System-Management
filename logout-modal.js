// Logout Modal Functionality
const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

// Show modal when logout button is clicked
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling up

    // Hide preloader if it's showing
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }

    logoutModal.classList.add("show");
  });
}

// Hide modal when cancel button is clicked
if (cancelLogout) {
  cancelLogout.addEventListener("click", () => {
    logoutModal.classList.remove("show");

    // Make sure preloader is hidden
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  });
}

// Redirect to login page when confirm button is clicked
if (confirmLogout) {
  confirmLogout.addEventListener("click", () => {
    // Show preloader before redirecting
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.remove("hidden");
    }

    window.location.href = "index.html";
  });
}

// Close modal when clicking outside the modal content
if (logoutModal) {
  logoutModal.addEventListener("click", (e) => {
    if (e.target === logoutModal) {
      logoutModal.classList.remove("show");

      // Make sure preloader is hidden
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("hidden");
      }
    }
  });
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    logoutModal &&
    logoutModal.classList.contains("show")
  ) {
    logoutModal.classList.remove("show");

    // Make sure preloader is hidden
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  }
});
