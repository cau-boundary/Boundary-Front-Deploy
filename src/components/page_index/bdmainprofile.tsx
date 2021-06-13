import React, { useEffect, useState } from "react";

import { BDUser } from "@src/model/models";
import Link from "next/link";
import classNames from "classnames";
import styles from "./bdmainprofile.module.scss";
import { useRouter } from "next/router";

interface Prop {
	className?: string;
	user?: BDUser;
	onClick(emailId: string, e: any): void;
}

export default function BDMainProfile({ className, user, onClick }: Prop) {
	const router = useRouter();

	// {profileImage === "https://boundary.or.kr/api/NULL" ? (
	// 	<img src="/default_user.png" alt="" />
	// ) : (
	// 	<img src={profileImage} alt="" />
	// )}

	return (
		<div className={classNames(className, styles.profile)}>
			<div className={styles.image}>
				<img
					src={
						user?.profileImage === "https://boundary.or.kr/api/NULL"
							? "/default_user.png"
							: user?.profileImage
					}
					alt=""
					onClick={(e) => onClick(user.email, e)}
				/>
			</div>
			<div className={styles.infos}>
				<div className={styles.info_name}>{user?.nickname}</div>
				<div className={styles.info_email}>{user?.email}</div>
			</div>
			<div className={styles.buttons}>
				<Link href="/" as={{ pathname: `/chatroom` }}>
					<div className={styles.buttons_createroom}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18.474"
							height="18.474"
							viewBox="0 0 18.474 18.474"
						>
							<line
								id="선_4"
								data-name="선 4"
								x2="15.474"
								transform="translate(1.5 9.237)"
								fill="none"
								stroke="#707070"
								strokeLinecap="round"
								strokeWidth="3"
							/>
							<line
								id="선_5"
								data-name="선 5"
								x2="15.474"
								transform="translate(9.237 1.5) rotate(90)"
								fill="none"
								stroke="#707070"
								strokeLinecap="round"
								strokeWidth="3"
							/>
						</svg>
					</div>
				</Link>
			</div>
		</div>
	);
}
