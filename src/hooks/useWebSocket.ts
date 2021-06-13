// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useCallback, useEffect, useState } from 'react';

// import socketIOClient from 'socket.io-client'

// export default function useWebSocket() {
//     const [socket, setSocket] = useState<WebSocket>(null);
//     const [connectedPeers, setConnectedPeers] = useState([]);
//     const socketURL = 'ws://localhost:3000';

//     const getPeers = () => {
//         return JSON.stringify({ type: 'peers' })
//     }

//     const getChatMessages = () => {
//         return JSON.stringify({ type: 'allMessages' })
//     }

//     const cleanUp = () => {
//         setConnectedPeers([]);
//     }

//     const connect = useCallback(
//         (peerId) => {
//             let data = JSON.stringify({
//                 type: 'connect',
//                 message: {
//                     peerId
//                 }
//             })
//             socket.send(data);
//         },
//         []
//     )

//     const disconnect = useCallback(
//         (peerId) => {
//             let data = JSON.stringify({
//                 type: 'disconnect',
//                 message: {
//                     peerId
//                 }
//             })
//             socket.send(data);
//         }
//         ,[]
//     )

//     useEffect(() => {
//         const ws = socket ? socket : new WebSocket(socketURL);

//         setSocket(ws);

//         ws.onopen = (event) => {
//             console.log('connected');
//             ws.send(getPeers());
//             ws.send(getChatMessages());
//         };

//         ws.onclose = (event) => {
//             console.log('disconnected');
//             cleanUp();
//         };

//         ws.onerror = (error) => {
//             console.log(error);
//         };

//         return () => {
//             ws.close();
//             cleanUp();
//         };
//     }, [])

//     return { socket, connectedPeers, connect, disconnect };
// };
import React from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('/');

export const SocketContext = React.createContext(socket);
