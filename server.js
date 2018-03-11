const app = require('express')(),
express = require('express'),
server = require('http').createServer(app),
ent = require('ent'), 
io = require('socket.io').listen(server);

app.use('/', express.static(`${__dirname}/public`));

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
    	pseudo = ent.encode(pseudo);
    	socket.pseudo = pseudo;
    	socket.broadcast.emit('nouveau_client', pseudo);
    });
     socket.on('message', function (message) {
     message = ent.encode(message);
     socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
   });
     	
});
server.listen(8080);