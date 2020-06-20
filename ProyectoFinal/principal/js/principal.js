const db = firebase.auth();
const dbFire = firebase.firestore()
var database = firebase.database();
var nombre = ""

database.ref('users').on('value', function(snap){
    document.getElementById('chatArea').value =""
    snap.forEach(element => {
        console.log(element.val())
        document.getElementById('chatArea').value += ` ${element.val().Nombre}: ${element.val().Mensaje}\n`
        document.getElementById('chatArea').scrollTop = document.getElementById('chatArea').scrollHeight;
    });
})




function cerrarSesion(){
db.signOut().then(()=>{
    window.location.href="../login/login.html";
})
}

db.onAuthStateChanged(u => {

    if(u){
        console.log(u.uid)
        var refthis = this
       
    
        dbFire.collection('users').doc(u.uid).get().then((res) => {
            console.log(res.data())
            document.getElementById('infoNombre').innerText = ` Bienvenido ${res.data().Nombre} ${res.data().Apellido}`
            refthis.nombre = `${res.data().Nombre} ${res.data().Apellido}`
    
        })

    }
    else{
        window.location.href="../login/login.html";
    }
  
})

function enviarMensaje(){
    
    if(document.getElementById('txtMensaje').value.trim()==""){
       return
    }else{
        
        
        
        document.getElementById('chatArea').value = ""
        database.ref('users').push({Nombre: this.nombre, Mensaje: document.getElementById('txtMensaje').value})
        document.getElementById('txtMensaje').value=""
        

    }
   
   

}

function iniciaMapa() {
    // configurar las coordenadas
    var coordenadas = { lat: 21.1236, lng: -101.68 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 13, center: coordenadas });
}