function login() {
  if ($("#username").val() == $("#password").val()) {
    alert("Login Successful");
    window.location.href = "orders.html";
  } else {
    alert("Please Enter valid Credentials");
  }
}
