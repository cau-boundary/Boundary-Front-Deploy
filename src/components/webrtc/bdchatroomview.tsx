import { BDChatroom, BDUser } from "@src/model/models";
import React, { useCallback, useContext, useEffect, useState } from "react";

import BDChatroomMedia from "@src/components/webrtc/bdchatroommedia";
import Peer from "peerjs";
import { SocketContext } from "./mysocket";
import classNames from "classnames";
import config from "../../../config";
import { deleteChatroom } from "@src/model/api_chatroom";
import styles from "./bdchatroomview.module.scss";
import { useRouter } from "next/router";

interface Props {
	className?: string;
	chatroom?: BDChatroom;
	emailId?: string;
	profileImage?: string;
	getChatRooms(): void;
	onClick(emailId: string, e: any): void;
}

interface LocalMediaInfo {
	peerId: string;
	emailId: string;
	profileImage: string;
	stream: MediaStream;
}

export default function BDChatroomView({
	className,
	chatroom,
	emailId,
	profileImage,
	getChatRooms,
	onClick,
}: Props) {
	const router = useRouter();
	const socket = useContext(SocketContext);
	const peers = {};
	const [myPeer, setPeer] = useState<Peer>(null);
	const [myPeerID, setMyPeerID] = useState(null);
	const [localMediaInfo, setLocalMediaInfo] = useState<LocalMediaInfo>(null);
	const [remoteMediaInfos, setRemoteMediaInfos] = useState<LocalMediaInfo[]>(
		[],
	);

	const cleanUp = () => {
		if (myPeer) {
			myPeer.disconnect();
			myPeer.destroy();
		}
		setPeer(null);
		setMyPeerID(null);
	};

	const addRemoteStream = useCallback(
		(stream, peerId, emailId, profileImage) => {
			setRemoteMediaInfos((remoteMediaInfos) => {
				if (!stream || !peerId) return [...remoteMediaInfos];
				if (
					remoteMediaInfos.some(
						(remoteMediaInfo) => remoteMediaInfo.peerId === peerId,
					)
				)
					return [...remoteMediaInfos];
				return [
					...remoteMediaInfos,
					{
						peerId: peerId,
						emailId: emailId,
						stream: stream,
						profileImage: profileImage,
					},
				];
			});
		},
		[],
	);

	const removeRemoteStream = useCallback((peerId) => {
		setRemoteMediaInfos((remoteMediaInfos) => {
			let index = remoteMediaInfos.findIndex(
				(remote) => remote.peerId === peerId,
			);
			if (index < 0) return [...remoteMediaInfos];
			remoteMediaInfos.splice(index, 1);
			return [...remoteMediaInfos];
		});
	}, []);

	useEffect(() => {
		if (localMediaInfo) {
			import("peerjs")
				.then(({ default: Peer }) => {
					const peer = myPeer ? myPeer : new Peer(undefined, config.peerConfig);

					peer.on("open", (peerId) => {
						setPeer(peer);
						setMyPeerID(peer.id);
						socket.emit(
							"join-room",
							chatroom.id,
							peerId,
							emailId,
							profileImage,
						);
					});

					peer.on("call", (call) => {
						const { emailId, profileImage } = call.metadata;
						call.answer(localMediaInfo.stream);
						call.on("stream", (remoteStream) => {
							addRemoteStream(remoteStream, call.peer, emailId, profileImage);
						});

						call.on("close", () => {
							removeRemoteStream(call.peer);
						});

						call.on("error", (error) => {
							console.log(error);
							removeRemoteStream(call.peer);
						});
					});

					peer.on("disconnected", () => {
						console.log("Peer disconnected");
						cleanUp();
					});

					peer.on("close", () => {
						console.log("Peer closed remotetly");
						cleanUp();
					});

					peer.on("error", (error) => {
						console.log("peer error", error);
						cleanUp();
					});

					// caller section
					socket.on(
						"user-connected",
						(userId, othersEmail, othersProfileImage) => {
							//call.peer == userId
							console.log(
								"connected user has : ",
								userId,
								othersEmail,
								othersProfileImage,
							);
							if (peer.disconnected) {
								peer.connect(userId);
							} else {
								const call = peer.call(userId, localMediaInfo?.stream, {
									metadata: {
										emailId: localMediaInfo?.emailId,
										profileImage: localMediaInfo?.profileImage,
									},
								});
								peers[userId] = call;
								call.on("stream", (remoteStream) => {
									addRemoteStream(
										remoteStream,
										call.peer,
										othersEmail,
										othersProfileImage,
									);
									console.log("connected to" + call.peer);
								});
								call.on("disconnected", () => {
									console.log("disconnected");
								});
								call.on("close", () => {
									console.log("call closed");
									removeRemoteStream(call.peer);
									call.close();
								});
								call.on("error", (error) => {
									console.log("call error", error);
									removeRemoteStream(call.peer);
									call.close();
								});
							}
						},
					);
					socket.on("user-disconnected", (userId) => {
						console.log("user-disconnected to");
						removeRemoteStream(userId);
						if (peers[userId]) peers[userId].close();
					});
					socket.on("user-leave", (userId) => {
						console.log(userId);
						removeRemoteStream(userId);
						if (peers[userId]) peers[userId].close();
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
		return () => {
			cleanUp();
		};
	}, [localMediaInfo]);

	const getMyMediaStream = async () => {
		const myMedia = await navigator.mediaDevices.getUserMedia({
			video: false,
			audio: { sampleSize: 8, echoCancellation: true },
		});
		setLocalMediaInfo({
			peerId: "temp",
			emailId: emailId,
			stream: myMedia,
			profileImage: profileImage,
		});
	};

	useEffect(() => {
		getMyMediaStream();
	}, []);

	const onExitButtonClick = async (e) => {
		e.preventDefault();
		if (remoteMediaInfos.length === 0) {
			try {
				await deleteChatroom(chatroom.generator.email);
			} catch (error) {
				console.log(error);
			}
		}
		socket.emit("leave-room", myPeerID);
		getChatRooms();
		router.push("/", undefined, { shallow: true });
	};

	return (
		<div className={classNames(className, styles.container)}>
			<div className={styles.header}>
				<div className={styles.header_infos}>
					<div className={styles.header_infos_title}>{chatroom.title}</div>
					<div className={styles.header_infos_location}>
						{/* 흑석로, 중앙대학교(5m) */}
					</div>
				</div>
				<div className={styles.header_buttons}>
					<img onClick={onExitButtonClick} src="/icon_exit.svg" alt=""></img>
				</div>
			</div>
			<div className={styles.participants}>
				<BDChatroomMedia
					mediaStream={localMediaInfo?.stream}
					emailId={emailId}
					onClick={onClick}
					muted={true}
					profileImage={localMediaInfo?.profileImage}
				/>
				{remoteMediaInfos.map((remoteMediaInfo, index) => {
					return (
						<BDChatroomMedia
							key={index}
							mediaStream={remoteMediaInfo.stream}
							emailId={remoteMediaInfo.emailId}
							onClick={onClick}
							muted={false}
							profileImage={remoteMediaInfo.profileImage}
						/>
					);
				})}
			</div>
		</div>
	);
}
