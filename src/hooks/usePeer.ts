import React, { useCallback, useContext, useEffect, useState } from "react";

import { SocketContext } from "./useWebSocket";
import { getRandomId } from "../../public/js/util";

const audioOnlyConfig = { audio: true, video: false };
const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
    video: { facingMode: "user" }
};

const config = { 'iceServers': [{ 'urls': ['stun:stun.l.google.com:19302'] }] };

const localConfig = {
    host: "localhost",
	port: 3000,
	path: "/media-chat",
    // secure: true,
    config,
	debug: 3,
};

export default function usePeer(addRemoteStream, removeRemoteStream, roomId) {
    const peers = {}
    const socket = useContext(SocketContext);
    const [myPeer, setPeer] = useState(null);
    const [myPeerID, setMyPeerID] = useState(null);

    const cleanUp = useCallback(
        ()=>{
            if (myPeer) {
                myPeer.disconnect();
                myPeer.destroy();
            }
            setPeer(null);
            setMyPeerID(null);
        },[]
    )

    useEffect(() => {
        import('peerjs').then(({default:Peer}) => {
            const peer = myPeer ? myPeer : new Peer(String(getRandomId()), localConfig);

            peer.on('open', (id) => {
                setPeer(peer);
                setMyPeerID(peer.id);
                socket.emit("join-room", roomId, id);
            })

            peer.on('call', (call) => {
                console.log('receiving call from ' + call.peer)

                navigator.mediaDevices.getUserMedia(userMediaConfig)
                    .then((stream) => {
                        // Answer the call with an A/V stream.
                        call.answer(stream);

                        // Play the remote stream
                        call.on('stream', (remoteStream) => {
                            addRemoteStream(remoteStream, call.peer);
                        });

                        call.on('close', () => {
                            console.log("The call has ended");
                            removeRemoteStream(call.peer);
                        });

                        call.on('error', (error) => {
                            console.log(error);
                            removeRemoteStream(call.peer);
                        });

                        socket.on("user-connected", (userId) => {
                            const call = myPeer.call(userId, stream);
                            // add other users media stream
                            call.on("stream", (remoteStream) => {
                                addRemoteStream(remoteStream, call.peer);
                            });
                            peers[userId] = call;
                        });
                        socket.on("user-disconnected", (userId) => {
                            if (peers[userId]) peers[userId].close();
                        });
                    }).catch(error => { console.log(error); });
            });

            peer.on('disconnected', () => {
                console.log("Peer desconnected");
                cleanUp()
            });

            peer.on('close', () => {
                console.log("Peer closed remotetly");
                cleanUp()
            });

            peer.on('error', (error) => {
                console.log("peer error", error);
                cleanUp()
            });

        }).catch(error => { console.log(error) });

        return () => {
            cleanUp()
        }
    }, [])

    return [myPeer, myPeerID] as const;
}



