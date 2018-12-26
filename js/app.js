firebase.initializeApp({
  apiKey: "AIzaSyC0JpWUxAceSl8G0WtC_OHehWDWcpruHMA",
  authDomain: "firestore-fb27b.firebaseapp.com",
  projectId: "firestore-fb27b"
});

//Inicializar Cloud Firestore de Firebase
var db = firebase.firestore();

//CREATE (Crear Documentos)
function guardar(){
	var nombre   = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var fecha 	 = document.getElementById('fecha').value;

	db.collection("Usuarios").add({
	    nombre: nombre,
	    apellido: apellido,
	    fecha: fecha
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    LimpiarCajasDeTextos();
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});	
}

//READ (Leer Documentos)
var tabla = document.getElementById('tabla');
db.collection("Usuarios").onSnapshot((querySnapshot) => {
	tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
		<tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().fecha}</td>
        <td><button type="button" class="btn btn-danger" onclick="Eliminar('${doc.id}')">Eliminar</button></td>
        <td><button type="button" class="btn btn-warning" onclick="Actualizar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().fecha}')">Editar</button></td>
        </tr>
        `
    });
});

//DELETE (Borrar Documentos)
function Eliminar(id){
	db.collection("Usuarios").doc(id).delete().then(function() {
    	console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});	
}

//UPDATE (Actualizar Documentos)
function Actualizar(id, nombre, apellido, fecha){
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellido').value = apellido;
	document.getElementById('fecha').value = fecha;

	var boton = document.getElementById('boton');
	boton.innerHTML = 'Actualizar';

	boton.onclick = function(){
		var docRef = db.collection("Usuarios").doc(id);
		//var washingtonRef= db.collection('Usuarios').doc(id);
		var nombre	 = document.getElementById('nombre').value;
		var apellido = document.getElementById('apellido').value;
		var fecha	 = document.getElementById('fecha').value;

		return docRef.update({
		    nombre: nombre,
		    apellido: apellido,
		    fecha: fecha
		})
		.then(function() {
		    console.log("Document successfully updated!");
		    boton.innerHTML = 'Guardar';
		    LimpiarCajasDeTextos();
		})
		.catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating document: ", error);
		});	
	}
}

function LimpiarCajasDeTextos(){
	document.getElementById('nombre').value = '';
	document.getElementById('apellido').value = '';
	document.getElementById('fecha').value = '';
}


