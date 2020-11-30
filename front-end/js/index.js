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
    fila += "<button class='btn light blue darken-4' style='margin-left: 4px'><i class='material-icons'>edit</i></button></td></tr>";
    tabla.innerHTML += fila;
  });
}

const deleteEmpleado = (id) => {
  axios
    .delete("http://localhost:3000/empleados/" + id, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .then(function (res) {
      getData();
    })
    .catch(function (err) {
      console.log(err);
    });
}