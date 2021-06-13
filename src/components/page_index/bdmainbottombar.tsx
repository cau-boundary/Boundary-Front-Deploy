import { BDChatroom, BDUser } from "@src/model/models";
import React, { useEffect, useState } from "react";

import BDMainBottomBarCell from "./bdmainbottombarcell";
import classNames from "classnames";
import styles from "./bdmainbottombar.module.scss";

interface Prop {
	className?: string;
	chatrooms?: BDChatroom[];
}

export default function BDMainBottomBar({ className, chatrooms }: Prop) {
	return (
		<div className={classNames(className, styles.bar)}>
			{chatrooms?.map((chatroom) => (
				<BDMainBottomBarCell
					className={styles.cell}
					chatroom={chatroom}
					key={chatroom.id}
				/>
			))}
		</div>
	);
}
