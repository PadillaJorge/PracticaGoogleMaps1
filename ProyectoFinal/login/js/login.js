
const db = firebase.auth();
const dbFire = firebase.firestore()


db.onAuthStateChanged( u =>{
    console.log(u.uid)
    if(u){
        window.location.href="../principal/principal.html";
    }
    dbFire.collection('users').doc(u.uid).get().then((res)=>{
        console.log(res.data())
    })
})




function login(){
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

console.log(email, password)


    console.log(db);
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(res){
        if(res){
            window.location.href="../principal/principal.html";
        }
    }).
    catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
      
}