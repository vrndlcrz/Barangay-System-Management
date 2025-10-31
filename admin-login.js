const loginForm = document.getElementById("login-form");
const devForm = document.getElementById("developer-form");
const talkDev = document.getElementById("talkDeveloper");
const backBtn = document.getElementById("backToLogin");

talkDev.onclick = () => {
  loginForm.classList.remove("show");
  setTimeout(() => {
    loginForm.style.display = "none";
    devForm.style.display = "block";
    setTimeout(() => {
      devForm.classList.add("show");
    }, 10);
  }, 300);
};

backBtn.onclick = () => {
  devForm.classList.remove("show");
  setTimeout(() => {
    devForm.style.display = "none";
    loginForm.style.display = "block";
    setTimeout(() => {
      loginForm.classList.add("show");
    }, 10);
  }, 300);
};
