window.onload = init;

function init() {
  getData();
}

const getData = () => {
  axios
    .get("http://localhost:3000/empleados", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .then(function (res) {
      console.log(res.data.message);
      renderData(res.data.message);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const renderData = (empleados) => {
  let cont = 1;
  empleados.forEach((empleado) => {
    const {
      id_empleado,
      nombre,
      apellidos,
      telefono,
      correo,
      direccion,
    } = empleado;
    let tabla = document.querySelector("#datos");
    let fila =
      "<tr><td>" +
      nombre +
      "</td><td>" +
      apellidos +
      "</td><td>" +
      telefono +
      "</td><td>" +
      correo +
      "</td><td>" +
      direccion +
      "</td><td>";
    fila +=
      "<button onclick= deleteEmpleado(" +
      id_empleado +
      ") class='btn light blue darken-4' style='margin-left: 4px'><i class='material-icons' >delete</i></button>";
    fila +=
      "<button onclick= editEmpleado(" +
      cont +
      "," +
      id_empleado +
      ") class='btn light blue darken-4' style='margin-left: 4px'><i class='material-icons'>edit</i></button></td></tr>";
    tabla.innerHTML += fila;
    cont++;
  });
};

const refreshData = () => {
  window.location.href = "./index.html";
};

const deleteEmpleado = (id) => {
  axios
    .delete("http://localhost:3000/empleados/" + id, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .then(function (res) {
      refreshData();
    })
    .catch(function (err) {
      console.log(err);
    });
};

function addEmpleado() {
  let nombre = document.getElementsByName("nombre")[0].value;
  let apellidos = document.getElementsByName("apellidos")[0].value;
  let telefono = document.getElementById("telefono").value;
  let correo = document.getElementById("correo").value;
  let direccion = document.getElementById("direccion").value;

  axios({
    url: "http://localhost:3000/empleados/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
    },
  })
    .then(function () {
      setInterval(10000);
      refreshData();
    })
    .catch(function (err) {
      setTimeout(10000);
      console.log(err);
    });
}

const editEmpleado = (id, id_empleado) => {
  //Valores del input
  console.log(id);
  let nombre = document.getElementsByName("nombre")[0];
  let apellidos = document.getElementsByName("apellidos")[0];
  let telefono = document.getElementById("telefono");
  let correo = document.getElementById("correo");
  let direccion = document.getElementById("direccion");

  let info = [nombre, apellidos, telefono, correo, direccion];

  let celdas = document.getElementsByTagName("tr")[id].cells;

  for (i = 0; i < 5; i++) {
    let texto = celdas.item(i).innerHTML;
    info[i].value = texto;
  }

  document.getElementById("botonMagico").style.display = "none";
  var newButton = document.createElement("button");
  newButton.innerHTML = "Edit";

  // 2. Append somewhere
  var card = document.getElementsByClassName("card-content")[0];
  card.appendChild(newButton);

  // 3. Add event handler
  newButton.addEventListener("click", function () {
    axios({
      url: "http://localhost:3000/empleados/" + id_empleado,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        nombre: nombre.value,
        apellidos: apellidos.value,
        telefono: telefono.value,
        correo: correo.value,
        direccion: direccion.value,
      },
    })
      .then(function () {
        setInterval(10000);
        refreshData();
      })
      .catch(function (err) {
        setTimeout(10000);
        console.log(err);
      });
  })
}
  /*button.onclick(() => {
   */
