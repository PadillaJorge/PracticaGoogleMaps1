const db = firebase.auth();

const dbFire = firebase.firestore()
var database = firebase.database();
var nombre = ""
var marcadores = []

database.ref('users').on('value', function (snap) {
    document.getElementById('chatArea').value = ""
    snap.forEach(element => {

        document.getElementById('chatArea').value += ` ${element.val().Nombre}: ${element.val().Mensaje}\n`
        document.getElementById('chatArea').scrollTop = document.getElementById('chatArea').scrollHeight;
    });
})


function markers() {
    return new Promise((resolve, reject) => {
        dbFire.collection('users').get().then((res) => {
            res.forEach(element => {
                this.marcadores.push({
                    Nombre: element.data().Nombre,
                    Apellido: element.data().Apellido,
                    Longitude: element.data().Longitude,
                    Latitude: element.data().Latitude,
                });
                resolve(this.marcadores);
            });
        })
    })
}


document.getElementById('txtMensaje').addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        enviarMensaje()
    }
});



function cerrarSesion() {
    db.signOut().then(() => {
        window.location.href = "../login/login.html";
    })
}

db.onAuthStateChanged(u => {


    if (u) {
        console.log(u.uid)
        var refthis = this


        dbFire.collection('users').doc(u.uid).get().then((res) => {

            document.getElementById('infoNombre').innerText = ` Bienvenido ${res.data().Nombre} ${res.data().Apellido}`
            refthis.nombre = `${res.data().Nombre} ${res.data().Apellido}`

        })

    }
    else {
        window.location.href = "../login/login.html";
    }

})

function enviarMensaje() {
    console.log(this.marcadores)

    if (document.getElementById('txtMensaje').value.trim() == "") {
        return
    } else {
        document.getElementById('chatArea').value = ""
        database.ref('users').push({ Nombre: this.nombre, Mensaje: document.getElementById('txtMensaje').value })
        document.getElementById('txtMensaje').value = ""
    }
}

function iniciaMapa() {
  
    markers().then(res=>{

        var coordenadas = { lat: 23.634501, lng: -102.552784 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 5, center: coordenadas });
        res.forEach(element => {
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.Latitude +','+ element.Longitude+'&sensor=true&key=AIzaSyDjasiw3ifZOx0p0V7Hp_HHJvSwFObZeeI')
            .then(function (response) {
             console.log(response.data.plus_code.compound_code);
             info = new google.maps.InfoWindow;
             ;
             info.setPosition({
                 lat: element.Latitude,
                 lng: element.Longitude
             });
             info.setContent(`<p>${element.Nombre} ${element.Apellido}</p> <br><p>${response.data.plus_code.compound_code.substring(7,response.data.plus_code.compound_code.length)}</p>  `);
             info.open(map);
            })
            console.log(element)

                
        
        });
        
    })
    // configurar las coordenadas
  
}