var signupForm = document.querySelector("form");
var signupName = document.querySelector("#signup__Name");
var signupEmail = document.querySelector("#signup__Email");
var signupPass = document.querySelector("#signup__Pass ");
var inputs = document.querySelectorAll("input");

var loginEmail = document.querySelector("#uEmail");
var loginPass = document.querySelector("#uPassword");

var signupBtn = document.querySelector("#signup__Btn");
var loginBtn = document.querySelector("#login__Btn");

var hidePass = document.querySelector(".hide");
var showPass = document.querySelector(".show");

var msg = document.querySelector(".msg-success");
var msgWelcome = document.querySelector(".msg-welcome");

var isValidName;
var isValidEmail;
var isValidPass;

var accounts;

var isEmailExist;

if (localStorage.account != null) {
  accounts = JSON.parse(localStorage.account);
} else {
  accounts = [];
}

var clearFields = function () {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].blur();
  }
};

var formValidation = function () {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (signupName.value !== "" && signupName.value.length <= 10) {
    document.querySelector(".error-name").classList.replace("d-flex", "d-none");
    isValidName = true;
  } else {
    document.querySelector(".error-name").classList.replace("d-none", "d-flex");
    isValidName = false;
  }
  if (emailRegex.test(signupEmail.value)) {
    document
      .querySelector(".error-email")
      .classList.replace("d-flex", "d-none");
    isValidEmail = true;
  } else {
    document
      .querySelector(".error-email")
      .classList.replace("d-none", "d-flex");
    isValidEmail = false;
  }
  if (passwordRegex.test(signupPass.value)) {
    document.querySelector(".error-pass").classList.replace("d-flex", "d-none");
    isValidPass = true;
  } else {
    document.querySelector(".error-pass").classList.replace("d-none", "d-flex");
    isValidPass = false;
  }
};

var saveData = function () {
  var account = {
    uName: signupName.value,
    uEmail: signupEmail.value,
    uPass: signupPass.value,
  };

  isEmailExist = false;

  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].uEmail === account.uEmail) {
      isEmailExist = true;
      break;
    }
  }
  if (!isEmailExist) {
    accounts.push(account);
    msg.textContent = "Account has been Successfully created";

    msg.classList.add("msg-right");
    msg.classList.replace("msg-error", "msg-right");

    localStorage.setItem("account", JSON.stringify(accounts));
    clearFields();
  } else {
    msg.textContent = "Email is already exist";
    msg.classList.add("msg-error");
    msg.classList.replace("msg-right", "msg-error");
  }
};

if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
    formValidation();
    if (isValidName && isValidEmail && isValidPass) {
      saveData();
    } else {
      e.preventDefault();
    }
  });
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", function () {
    if (msg) {
      msg.textContent = "";
    }
  });
}

if (hidePass && showPass) {
  hidePass.addEventListener("click", function () {
    hidePass.classList.add("d-none");
    showPass.classList.replace("d-none", "d-flex");
    if (signupPass) {
      signupPass.setAttribute("type", "text");
    } else if (loginPass) {
      loginPass.setAttribute("type", "text");
    }
  });
  showPass.addEventListener("click", function () {
    showPass.classList.replace("d-flex", "d-none");
    hidePass.classList.replace("d-none", "d-flex");
    if (signupPass) {
      signupPass.setAttribute("type", "password");
    } else if (loginPass) {
      loginPass.setAttribute("type", "password");
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    var state;
    for (var i = 0; i < accounts.length; i++) {
      if (
        loginEmail.value === accounts[i].uEmail &&
        loginPass.value === accounts[i].uPass
      ) {
        localStorage.setItem("loggedInUser", accounts[i].uName);
        msgWelcome.textContent = `Successed`;
        msgWelcome.classList.add("msg-right");
        msgWelcome.classList.replace("msg-error", "msg-right");
        clearFields();
        state = true;

        loginBtn.firstElementChild.setAttribute("href", "pages/welcom.html");

        break;
      } else {
        msgWelcome.textContent = `Wrong password or email`;
        msgWelcome.classList.add("msg-error");
        msgWelcome.classList.replace("msg-right", "msg-error");
        state = false;
      }
    }

    if (!state) {
      e.preventDefault();
    }
  });
}
