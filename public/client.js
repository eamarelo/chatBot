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
            			socket.emit('messageCarrefour', positionGPS);
            		}
            		getLocation()

            	}

            	if (document.querySelector('#message').value.indexOf('/uber') !== - 1){
            		let message = " a demandé uber"
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
            			socket.emit('uber', positionGPS);
            		}
            		getLocation()

            	}

            	if (document.querySelector('#message').value.indexOf('/youtube') !== - 1){
            		let message2 = " a demandé youtube"
            		insereMessage(pseudo, message);
            		var keyWord = message.substr(9);
            		socket.emit('msgYtb', keyWord);
            	}

    socket.emit('message', message); // Transmet le message aux autres
    insereMessage(pseudo, message);
    message.value='';
    return false
}
socket.on('messageCarrefour', body => {
	var data = body;
	for(let k = 0; k < data.list.length; k++){
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

socket.on('msgYtb', body => {
	var data = body;
	for(let j = 0; j < data.items.length; j++){
		const element = document.createElement('p');
		const textnode = document.createTextNode(pseudo + ':');
		const iframeYoutube = document.createElement('iframe');

		iframeYoutube.setAttribute('src', "http://www.youtube.com/embed/" + data.items[j].id.videoId);
		iframeYoutube.setAttribute('width', '650');
		iframeYoutube.setAttribute('height', '450');
		iframeYoutube.setAttribute('frameborder', '0');
		element.appendChild(textnode);

		element.appendChild(iframeYoutube);
		document.querySelector('#zone_chat').appendChild(element);
	}
});

socket.on('uber', (body) => {
	console.log(body);
	var data = body;
	var destPosition = data[0];
	var priceUber = data[1];
	console.log('priceUber ', priceUber);

	for(let j = 0; j < priceUber.length; j++){
		const element = document.createElement('p');
		const textnode = document.createTextNode(pseudo + ':');
		const textnode2 = document.createTextNode('Nom : ' + priceUber[j].display_name); 
		const textnode3 = document.createTextNode('temps : ' + priceUber[j].duration + ' en secondes'); 
		const paragraph = document.createElement('p');
		const paragraph2 = document.createElement('p');
		const paragraph3 = document.createElement('p');
		const iframeCarrefour = document.createElement('iframe');

		iframeCarrefour.setAttribute('src', "https://www.google.com/maps/embed/v1/place?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog"+
			"&q=" + destPosition[0].lat + "," + destPosition[0].lng);
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