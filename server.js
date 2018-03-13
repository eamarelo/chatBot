const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const ent = require('ent');
const io = require('socket.io').listen(server);

const TheBotCarrefour = require('bot-carrefour');
const TheBotYoutube = require('bot-youtube');
const TheBotUber = require('bot-uber-by-echo');
const TheBotIp = require('bot-my-ip');

app.use('/', express.static(`${__dirname}/public`));
io.sockets.on('connection', (socket)=> {
  // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
  socket.on('nouveau_client', (pseudo)=> {
    pseudo = ent.encode(pseudo);
    socket.pseudo = pseudo;
    socket.broadcast.emit('nouveau_client', pseudo);
  });
  socket.on('message', (message)=> {
    message = ent.encode(message);
    socket.broadcast.emit('message', {'pseudo': socket.pseudo, 'message': message});
  });

  socket.on('messageCarrefour', (message)=> {
    const bot = new TheBotCarrefour(message[1], message[0]);

    bot.echo();
    socket.emit('messageCarrefour', bot.getJson());
  });

  socket.on('msgYtb', (keyword)=> {
    const bot = new TheBotYoutube(keyword);

    bot.echo();
    socket.emit('msgYtb', bot.getJson());
  });

  socket.on('uber', (message)=> {
    const bot = new TheBotUber(message[1], message[0]);

    bot.echo();
    socket.emit('uber', bot.getJson());
  });

  socket.on('myIp', ()=> {
    const bot = new TheBotIp();

    bot.echo();
    console.log(bot.getJson());
    socket.emit('myIp', bot.getJson());
  });
});
server.listen(8080);
