const PeerServer = require('peer').PeerServer;

const server = PeerServer({
    port: 3000,
    path: '/media-chat',
});
