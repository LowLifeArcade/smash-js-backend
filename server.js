const express = require('express');
const WebSocket = require('ws');
const { Router } = require('express');
// const ws = require('');
app = express();
router = Router();

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    let clients = [];
    clients.push(ws);
    console.log('new client conncted');

    for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        const clientId = Math.random() * 10
        
        client.send(['connected', clientId]);

        client.on('message', function incoming(message) {
            console.log('%s ', message);
            client.send('got your msg ' + message);
        });
    }
    console.log('number of clients',clients.length)
});

app.get('/', (req, res) => {
    res.json({ msg: 'es' });
});

server.listen('8000', () => console.log('App listening on port 8000'));
