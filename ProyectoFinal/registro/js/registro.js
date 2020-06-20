const db = firebase.auth();
const dbFire = firebase.firestore()






async function Registrar() {
    console.log("dss")


    var Nombre = document.getElementById('txtNombre').value;
    var Apellido = document.getElementById('txtApellido').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var latitude = ""
    var longitude = ""
    var userId = ""

    if (Nombre.trim() == "" || Apellido.trim() ==""){
        swal("Error", "Completa todos los campos", "error");
        return;
    }

    getLocation().then((res) => {
      
      
        latitude = res.coords.latitude
        longitude = res.coords.longitude

        db.createUserWithEmailAndPassword(email, password).then(function (res) {
            userId = res.user.uid
            dbFire.collection('users').doc(userId).set({
                Nombre: Nombre,
                Apellido: Apellido,
                Email: email,
                Latitude: latitude,
                Longitude: longitude
            }).then(() => {
                console.log("Cuenta Creada")
                swal("Exito", "Has creado una cuenta nueva", "success");
                window.location.href="../principal/principal.html";
            }).catch((err)=>{

                console.log(err);
            })

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal("Error", errorMessage, "error");
        });

    });










}



function getLocation() {

    if (navigator.geolocation) {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })


    }
}

