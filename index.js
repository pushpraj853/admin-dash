console.log(window.localStorage.getItem("isLoggedIn"));

if (window.localStorage.getItem("isLoggedIn") == true) {
  window.location.href = "orders.html";
} else {
  function login() {
    if ($("#username").val() == $("#password").val()) {
      window.localStorage.setItem("isLoggedIn", true);
      alert("Login Successful");
      window.location.href = "orders.html";
    } else {
      alert("Please Enter valid Credentials");
    }
  }
}
