//Declare dependencies
const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const ent = require('ent');
const io = require('socket.io').listen(server);
const TheBotCarrefour = require('bot-carrefour');
const TheBotYoutube = require('bot-youtube');
const TheBotUber = require('bot-uber-by-echo');
const TheBotIp = require('bot-my-ip');
const TheBotMeteo = require('bot-meteo-by-echo');

//redirect http request to public folder
app.use('/', express.static(`${__dirname}/public`));
io.sockets.on('connection', (socket)=> {
// when someone submit a pseudo we send it to clients
  socket.on('nouveau_client', (pseudo)=> {
    pseudo = ent.encode(pseudo);
    socket.pseudo = pseudo;
    socket.broadcast.emit('nouveau_client', pseudo);
  });

  // when someone senda message we send it to clients
  socket.on('message', (message)=> {
    message = ent.encode(message);
    socket.broadcast.emit('message', {'pseudo': socket.pseudo, 'message': message});
  });

  //create a bot carrefour when clients send /carrefour
  socket.on('messageCarrefour', (message)=> {
    const bot = new TheBotCarrefour(message[1], message[0]);

    bot.echo();
    socket.emit('messageCarrefour', bot.getJson());
  });

  //create a bot youtube when clients send /youtube
  socket.on('msgYtb', (keyword)=> {
    const bot = new TheBotYoutube(keyword);

    bot.echo();
    socket.emit('msgYtb', bot.getJson());
  });

  //create a bot meteo when clients send /meteo
  socket.on('meteo', (city)=> {
    const bot = new TheBotMeteo(city);

    bot.echo();
    socket.emit('meteo', bot.getJson());
  });

  //create a bot uber when clients send /uber
  socket.on('uber', (message)=> {
    const bot = new TheBotUber(message[1], message[0]);

    bot.echo();
    socket.emit('uber', bot.getJson());
  });

  //create a bot ip when clients send /ip
  socket.on('myIp', ()=> {
    const bot = new TheBotIp();

    bot.echo();
    socket.emit('myIp', bot.getJson());
  });
});
server.listen(8080);
