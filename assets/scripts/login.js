const loginBtn = document.querySelector(".login-btn");
const form = document.querySelector(".login-form");

loginBtn.addEventListener("click", (event) => {
  form.action = "../../index.html";
});
