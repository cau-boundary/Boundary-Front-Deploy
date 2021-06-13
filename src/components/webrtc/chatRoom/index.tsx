import React, { useEffect, useState } from "react";

import BDChatroomMedia from "@src/components/webrtc/bdchatroommedia";
import Link from "next/link";
import classNames from "classnames";
import styles from "@src/components/webrtc/chatRoom/index.module.scss";

export default function ChatRoom({
	className,
	chatroom,
	myPeerId,
	peersOnlineCount,
	myStream,
	// messages,
	// sendMessage,
	remoteStreams,
	disconnect,
}) {
	// const [showChat, setShowChat] = useState(false);
	// const [unreadCount, setUnreadCount] = useState(0);
	// const [lastMessageCount, setLastMessageCount] = useState(0);

	// useEffect(() => {
	// 	if (!showChat) {
	// 		setUnreadCount(messages.length - lastMessageCount);
	// 	}
	// }, [messages]);

	// const openChat = () => {
	// 	setShowChat(!showChat);
	// 	setLastMessageCount(messages.length);
	// 	setUnreadCount(0);
	// };

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
					<Link href="/">
						<img src="/icon_exit.svg" alt="" />
					</Link>
					<img src="/icon_exit.svg" alt="" />
				</div>
			</div>
			{/* <div className={styles.participants}>
				<BDChatroomMedia mediaStream={myStream} />
				{remoteStreams.map((mediaStream, index) => {
					return (
						<BDChatroomMedia key={index} mediaStream={mediaStream.stream} />
					);
				})}
			</div> */}
			{/* <RemoteStream remoteStreams={remoteStreams} />
			<LocalStream userMedia={myStream} classStyle={"my-video-live"} /> */}
			{/* {showChat && (
				<Chat
					myPeerId={myPeerId}
					messages={messages}
					sendMessage={sendMessage}
					close={() => setShowChat(false)}
				/>
			)} */}
			{/* <div className="footer">
				<div className="button-show-chat" onClick={() => openChat()}>
					<span className="chat-messeger-count">
						{unreadCount > 0 ? unreadCount : ""}
					</span>
				</div>
				<CallButton disconnect={disconnect} />
			</div> */}
		</div>
	);
}
