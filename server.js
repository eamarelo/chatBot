const app = require('express')(),
express = require('express'),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

app.use('/', express.static(`${__dirname}/public`));
server.listen(8080);