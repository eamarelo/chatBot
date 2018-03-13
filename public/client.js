const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080');

// On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
var pseudo = prompt('Quel est votre pseudo ?');

socket.emit('nouveau_client', pseudo);
document.title = pseudo + ' - ' + document.title;

// Quand on reçoit un message, on l'insère dans la page
socket.on('message', (data)=> {
  showMessage(data.pseudo, data.message);
});

/*
*display message to zone_chat id
*/
socket.on('nouveau_client', (pseudo)=> {
  let message = 'vient de se connecter';

  showMessage(pseudo, message);
});

/*
*display message to zone_chat id
*/
document.getElementById('formulaire_chat').onsubmit = ()=> {
  let message = document.getElementById('message').value;

  /*
*If message.value = /carrefour emit to server
*/

  if (document.querySelector('#message').value.indexOf('/carrefour') !== - 1) {
    let message = ' a demandé carrefour';

    showMessage(pseudo, message);

    const getLocation = ()=> {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        let message = ' NE PEUT PAS ACTIVER LA POSITION !!!!!';

        showMessage(pseudo, message);
      }
    };

    const showPosition = (position)=> {
      const positionGPS = [position.coords.latitude, position.coords.longitude];

      socket.emit('messageCarrefour', positionGPS);
    };

    getLocation();
  }

  /*
*If message.value = /uber emit to server
*/
  if (document.querySelector('#message').value.indexOf('/uber') !== - 1) {
    let message = ' a demandé uber';

    showMessage(pseudo, message);
    const getLocation = ()=> {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        let message = ' NE PEUT PAS ACTIVER LA POSITION !!!!!';

        showMessage(pseudo, message);
      }
    };

    const showPosition = (position)=> {
      const positionGPS = [position.coords.latitude, position.coords.longitude];

      socket.emit('uber', positionGPS);
    };

    getLocation();

    /*
*If message.value = /youtube emit to server
*/
  }
  if (document.querySelector('#message').value.indexOf('/youtube') !== - 1) {
    let message2 = ' a demandé youtube';

    showMessage(pseudo, message2);
    var keyWord = message.substr(9);

    socket.emit('msgYtb', keyWord);
  }

  /*
*If message.value = /meteo emit to server
*/
  if (document.querySelector('#message').value.indexOf('/meteo') !== - 1) {
    let message2 = ' a demandé la météo';

    showMessage(pseudo, message2);
    var city = message.substr(7);
    socket.emit('meteo', city);
  }

  /*
*If message.value = /ip emit to server
*/
  if (document.querySelector('#message').value.indexOf('/ip') !== - 1) {
    let message2 = ' a demandé son ip';

    showMessage(pseudo, message2);
    socket.emit('myIp', message2);
  }

  socket.emit('message', message); // Transmet le message aux autres
  showMessage(pseudo, message);
  message.value = '';
  return false;
};

/*
*Create template from carrefour data api
*/
socket.on('messageCarrefour', body => {
  var data = body;

  for (let k = 0; k < data.list.length; k ++) {
    const element = document.createElement('p');
    const textnode = document.createTextNode(pseudo + ':');
    const textnode2 = document.createTextNode('Nom : ' + data.list[k].name);
    const textnode3 = document.createTextNode('Adresse : ' + data.list[k].address);
    const paragraph = document.createElement('p');
    const paragraph2 = document.createElement('p');
    const paragraph3 = document.createElement('p');
    const iframeCarrefour = document.createElement('iframe');

    iframeCarrefour.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog'
			+ '&q=' + data.list[k].latitude + ',' + data.list[k].longitude);
    iframeCarrefour.setAttribute('width', '650');
    iframeCarrefour.setAttribute('height', '450');
    iframeCarrefour.setAttribute('frameborder', '0');
    element.setAttribute('id', 'container');
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

/*
*Create template from youtube data api
*/
socket.on('msgYtb', body => {
  var data = body;

  for (let j = 0; j < data.items.length; j ++) {
    const element = document.createElement('p');
    const textnode = document.createTextNode(pseudo + ':');
    const iframeYoutube = document.createElement('iframe');

    iframeYoutube.setAttribute('src', 'http://www.youtube.com/embed/' + data.items[j].id.videoId);
    iframeYoutube.setAttribute('width', '650');
    iframeYoutube.setAttribute('height', '450');
    iframeYoutube.setAttribute('frameborder', '0');
    element.setAttribute('id', 'container');
    element.appendChild(textnode);

    element.appendChild(iframeYoutube);
    document.querySelector('#zone_chat').appendChild(element);
  }
});

/*
*Create template from uber data api
*/
socket.on('uber', (body) => {
  var data = body;
  var destPosition = data[0];
  var priceUber = data[1];

  for (let j = 0; j < priceUber.length; j ++) {
    const element = document.createElement('p');
    const textnode = document.createTextNode(pseudo + ':');
    const textnode2 = document.createTextNode('Nom : ' + priceUber[j].display_name);
    const textnode3 = document.createTextNode('prix : ' + priceUber[j].estimate);
    const paragraph = document.createElement('p');
    const paragraph2 = document.createElement('p');
    const paragraph3 = document.createElement('p');
    const iframeCarrefour = document.createElement('iframe');

    iframeCarrefour.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog'
			+ '&q=' + destPosition[0].lat + ',' + destPosition[0].lng);
    iframeCarrefour.setAttribute('width', '650');
    iframeCarrefour.setAttribute('height', '450');
    iframeCarrefour.setAttribute('frameborder', '0');
    element.setAttribute('id', 'container');
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

/*
*Create template from openweathermap data api
*/
socket.on('meteo', (body) => {
  const element = document.createElement('p');
  const textnode = document.createTextNode(pseudo + ' a demandé la météo de :' + body.name + '. il y fait ' + body.main.temp + ' F°. L\'humidité est de: ' + body.main.humidity);

  element.setAttribute('id', 'container');
  element.appendChild(textnode);
  document.querySelector('#zone_chat').appendChild(element);
});

/*
*Create template from showIp data api
*/
socket.on('myIp', (body) => {
  let message = ' a demandé son ip: ' + body.ip;

  showMessage(pseudo, message);
});

function showMessage (pseudo, message) {
  const element = document.createElement('p');
  const textnode = document.createTextNode(pseudo + ': ' + message);

  element.setAttribute('id', 'container');
  element.appendChild(textnode);
  document.querySelector('#zone_chat').appendChild(element);
  document.getElementById('message').value = '';
}
