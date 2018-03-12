const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080');
//var zoneChat = document.querySelector('#zone_chat');//var message = document.querySelector('#message').value;

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
getLocation();

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

    if (document.querySelector('#message').value.indexOf('/carrefour') !== - 1){
        let message = " a demandé carrefour"
        insereMessage(pseudo, message);
        function getLocation() {
            if (navigator.geolocation) {
            	navigator.geolocation.getCurrentPosition(showPosition);
            } 
            else { 
            	alert("Geolocation is not supported by this browser.")
            }
        }

        function showPosition(position) {
            const positionGPS=[position.coords.latitude,position.coords.longitude];
            console.log(positionGPS);
            socket.emit('messageCarrefour', positionGPS);
        }
    getLocation()

    }

    socket.emit('message', message); // Transmet le message aux autres
    insereMessage(pseudo, message);
    message.value='';
    return false
}
socket.on('messageCarrefour', body => {
	console.log("bodyy " ,  body);
	var data = body;
	for(let k = 0; k < data.list.length; k++){
		console.log('dataindex', data.list[k]);
		console.log('dataindex', data.list);
		console.log('console.log ' + data);
		const element = document.createElement('p');
		const textnode = document.createTextNode(pseudo + ':');
		const textnode2 = document.createTextNode('Nom : ' + data.list[k].name); 
		const textnode3 = document.createTextNode('Adresse : ' + data.list[k].address); 
		const paragraph = document.createElement('p');
		const paragraph2 = document.createElement('p');
		const paragraph3 = document.createElement('p');
		const iframeCarrefour = document.createElement('iframe');

		iframeCarrefour.setAttribute('src', "https://www.google.com/maps/embed/v1/place?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog"+
			"&q=" + data.list[k].latitude + "," + data.list[k].longitude);
		iframeCarrefour.setAttribute('width', '650');
		iframeCarrefour.setAttribute('height', '450');
		iframeCarrefour.setAttribute('frameborder', '0');
		element.appendChild(textnode);
		element.appendChild(paragraph2);
		element.appendChild(textnode2);
		element.appendChild(paragraph3);
		element.appendChild(textnode3);
		element.appendChild(paragraph);
		element.appendChild(iframeCarrefour);
		document.querySelector('#zone_chat').appendChild(element);
	}

});

function insereMessage(pseudo, message) {
	const element = document.createElement('p');
	const textnode = document.createTextNode(pseudo + ': ' + message);
	element.appendChild(textnode);
	document.querySelector('#zone_chat').appendChild(element);
	document.getElementById('message').value = "";
}