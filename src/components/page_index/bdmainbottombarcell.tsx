import { BDChatroom, BDUser } from "@src/model/models";
import React, { useEffect, useState } from "react";

import { checkChatroom } from "@src/model/api_chatroom";
import classNames from "classnames";
import styles from "./bdmainbottombarcell.module.scss";
import { useRouter } from "next/router";

interface Prop {
	className?: string;
	chatroom?: BDChatroom;
}

export default function BDMainBottomBarCell({ className, chatroom }: Prop) {
	var router = useRouter();
	const onImageError = (e) => {
		console.log(e.target.src);
		e.target.src = "/default_user.png";
	};
	const onChatroomClick = async () => {
		try {
			await checkChatroom(chatroom.generator.email);
			router.push("/", `/chatroom/${chatroom.id}`);
		} catch {
			alert("이미 폭파된 방입니다🥲 페이지를 다시 로딩합니다.");
			router.reload();
		}
	};
	return (
		<div className={classNames(className)} onClick={onChatroomClick}>
			<div className={styles.cell}>
				<div className={styles.image}>
					<img
						src={chatroom.generator.profileImage}
						onError={onImageError}
						alt=""
					/>
				</div>
				<div className={styles.infos}>
					<div className={styles.info_title}>{chatroom.title}</div>
				</div>
				<div className={styles.location}> &gt;</div>
			</div>
			<hr className={styles.divline}></hr>
		</div>
	);
}
