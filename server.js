const app = require('express')(),
express = require('express'),
server = require('http').createServer(app),
ent = require('ent'), 
io = require('socket.io').listen(server),
TheBotCarrefour = require('bot-carrefour');
TheBotYoutube = require('bot-youtube');
TheBotUber = require('bot-uber');

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

    socket.on('messageCarrefour', function (message) {
    	const bot = new TheBotCarrefour(message[1], message[0]);
    	
    	bot.echo();
    	socket.emit('messageCarrefour', bot.getJson());
    });	

    socket.on('msgYtb', function (keyword) {
    	const bot = new TheBotYoutube(keyword);
    	
    	bot.echo();
    	socket.emit('msgYtb', bot.getJson());
    });	

    socket.on('uber', function (message) {
    	console.log('position', message);
    	const bot = new TheBotUber(message[1], message[0]);
    	
    	bot.echo();
    	console.log('uber', bot.getJson());
    	socket.emit('uber', bot.getJson());
    });	
});
server.listen(8080);