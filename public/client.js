const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080');
//var zoneChat = document.querySelector('#zone_chat');
//var message = document.querySelector('#message');

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		alert("Geolocation is not supported by this browser.")
	}
}

function showPosition(position) {
console.log(position);
    const positionGPS=[position.coords.latitude,position.coords.longitude];
}
getLocation()

            // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('nouveau_client', pseudo);
document.title = pseudo + ' - ' + document.title;

            // Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
 insereMessage(data.pseudo, data.message);
}) 

socket.on('nouveau_client', function(pseudo) {
    let message = "vient de se connecter";
    insereMessage(pseudo, message);
})

            
            // Ajoute un message dans la page
document.getElementById('formulaire_chat').onsubmit = function () {
    let message = document.getElementById('message').value;
    socket.emit('message', message); // Transmet le message aux autres
    insereMessage(pseudo, message);
    message.value='';
    return false
}

function insereMessage(pseudo, message) {
    const element = document.createElement('p');
    const textnode = document.createTextNode(pseudo + ': ' + message);
    element.appendChild(textnode);
    document.querySelector('#zone_chat').appendChild(element);
    document.getElementById('message').value = "";
}