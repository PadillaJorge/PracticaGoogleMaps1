const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');
const datosdelacuenta = document.querySelector('.datosdelacuenta');

const configuraMenu = (user) => {
    if (user) {


        db.collection('usuarios').doc(user.uid).get().then(doc => {
            const html = `
               <p>Nombre: ${ doc.data().nombre}</p>
               <p>Correo: ${ user.email}</p>
               <p>Teléfono: ${ doc.data().telefono}</p>
               <p>Dirección: ${ doc.data().direccion}</p>
           `;
            datosdelacuenta.innerHTML = html;
        });

        listaloggedin.forEach(item => item.style.display = 'block');
        listaloggedout.forEach(item => item.style.display = 'none');
    }
    else {
        datosdelacuenta.innerHTML = '';
        listaloggedin.forEach(item => item.style.display = 'none');
        listaloggedout.forEach(item => item.style.display = 'block');
    }
}

const listadeplatillos = document.getElementById('listadeplatillos');

const obtienePlatillos = (data) => {


    if (data.length) {

        let html = '';

        data.forEach(doc => {
            const platillo = doc.data();
            console.log(platillo);
            const columna = `<div class="col-12 col-md-4">
             <div class="card" style="width: 18rem;">
             <img class="card-img-top" src="imagenes/${platillo.imagen}" alt="Card image cap">
             <div class="card-body">
             <h5 class="card-title">${platillo.nombre}</h5>
            <p class="card-text">$${platillo.precio}.00 pesos</p>
            <button class="btn btn-primary">Pagar Ahora</button>
            </div>
            </div>
            </div>`;

            html += columna;

        });

        listadeplatillos.innerHTML = html;

    }
    else {
        listadeplatillos.innerHTML =
            '<div class="container-fluid  bg-white w-50 p-5  my-5">'
            + '<div class="row d-flex justify-content-center">'
            + '<div class="col-12 d-flex justify-content-center">'
            + '<h1>Inicie sesión o registrese para ver los platillo disponibles</h1>'
            + '</div>'
            + '</div>'
            + '</div>';
    }




};


