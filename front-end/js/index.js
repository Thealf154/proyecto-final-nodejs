window.onload = init;

function init () {
  getData();
};

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

const renderData = empleados => {
  empleados.forEach(empleado => {
    const {id_empleado, nombre , apellidos, telefono, correo, direccion} = empleado;
    let tabla = document.querySelector("#datos");
    let fila = "<tr><td>" + nombre + "</td><td>" + apellidos + "</td><td>" + telefono + "</td><td>" + correo + "</td><td>" + direccion + "</td><td>";
    fila += "<button onclick= deleteEmpleado(" + id_empleado + ") class='btn light blue darken-4' style='margin-left: 4px'><i class='material-icons' >delete</i></button>";
    fila += "<button onclick= editEmpleado(" + id_empleado + ") class='btn light blue darken-4' style='margin-left: 4px'><i class='material-icons'>edit</i></button></td></tr>";
    tabla.innerHTML += fila;
  });
}

const refreshData = () => {
  window.location.href = "./index.html";
}

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
}

function addEmpleado () {


  const nombre = document.getElementsByTagName("input").nombre.value;
  const apellidos = document.getElementsByTagName("input").apellidos.value;
  const telefono = document.getElementsByTagName("input").telefono.value;
  const correo = document.getElementsByTagName("input").correo.value;
  const direccion = document.getElementsByTagName("input").direccion.value;

  axios
    .post("http://localhost:3000/empleados/", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      data: {
        nombre : nombre,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        direccion: direccion
      },
      body: data
    })
    .then(function (res) {
      setInterval(10000)
      refreshData();
    })
    .catch(function (err) {
      setTimeout(10000);
      console.log(err);
    });
}

const editEmpleado = id => {

}