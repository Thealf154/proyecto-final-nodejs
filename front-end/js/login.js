window.onload = init;

function init() {
  document
    .querySelector(".btn-secondary")
    .addEventListener("click", function () {
      window.location.href = "signin.html";
    });
  document.querySelector(".btn-primary").addEventListener("click", login);

  if(localStorage.getItem("token"))
    window.location.href = "index.html"
}

function login() {
  var mail = document.getElementById("input-mail").value;
  var password = document.getElementById("input-password").value;

  axios({
    method: "post",
    url: "http:localhost:3000/user/login",
    data: {
      user_email: mail,
      user_password: password,
    },
  })
    .then(function (res) {
      if (res.data.code === 200) {
        //This sets a cookie
        localStorage.setItem("token", res.data.message);
        window.location.href = "index.html"
      } else alert("Usuario incorrecto");
    })
    .catch(function (err) {
      console.log(err);
    });
}
