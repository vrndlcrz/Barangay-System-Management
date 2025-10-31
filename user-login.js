const scrollArrow = document.getElementById("scrollArrow");

scrollArrow.addEventListener("click", function () {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
});

// Hide arrow on large screens
function toggleArrow() {
  if (window.innerWidth >= 1024) {
    scrollArrow.style.display = "none";
  } else {
    scrollArrow.style.display = "flex";
  }
}

window.addEventListener("resize", toggleArrow);
toggleArrow();

// forgot password
const forgotBtn = document.getElementById("forgotPasswordBtn");
const forgotModal = document.getElementById("forgotModal");
const closeForgotModal = document.getElementById("closeForgotModal");

forgotBtn.addEventListener("click", () => {
  forgotModal.classList.add("show");
});

closeForgotModal.addEventListener("click", () => {
  forgotModal.classList.remove("show");
});

window.addEventListener("click", (e) => {
  if (e.target === forgotModal) {
    forgotModal.classList.remove("show");
  }
});

// Back to Login
backToLogin.addEventListener("click", () => {
  developerForm.style.display = "none";
  formContainer.style.display = "block";
});
