// Logout Modal Functionality
const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

// Show modal when logout button is clicked
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logoutModal.classList.add("show");
});

// Hide modal when cancel button is clicked
cancelLogout.addEventListener("click", () => {
  logoutModal.classList.remove("show");
});

// Redirect to login page when confirm button is clicked
confirmLogout.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Close modal when clicking outside the modal content
logoutModal.addEventListener("click", (e) => {
  if (e.target === logoutModal) {
    logoutModal.classList.remove("show");
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && logoutModal.classList.contains("show")) {
    logoutModal.classList.remove("show");
  }
});
