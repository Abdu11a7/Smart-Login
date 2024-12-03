document.addEventListener("DOMContentLoaded", function () {
  var userName = localStorage.getItem("loggedInUser");

  if (userName) {
    document.querySelector(".user-name").textContent = userName;
  } else {
    window.location.href = "../index.html";
  }
});
