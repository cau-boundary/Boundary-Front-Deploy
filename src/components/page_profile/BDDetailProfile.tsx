import React, { useCallback, useEffect, useState } from "react";

import BDProfileError from "@src/components/page_profile/BDProfileError";
import BDProfileHeader from "@src/components/page_profile/BDProfileHeader";
import BDProfileMain from "@src/components/page_profile/BDProfileMain";
import classNames from "classnames";
import styles from "./BDDetailProfile.module.scss";
import { viewProfile } from "@src/model/api_user";

interface IProfilePageProps {
	className?: string;
	emailId?: string;
	onClick(emailId: string, e: any): void;
}

export default function BDProfilePage(props: IProfilePageProps) {
	const { className, emailId, onClick } = props;
	const [profileInfo, setProfileInfo] = useState({
		email: "",
		nickname: "",
		profileImage: "",
	});
	const [isUserExist, setUserExist] = useState<boolean>(undefined);

	const getProfileData = useCallback(async (emailId) => {
		let data;
		try {
			data = await viewProfile(emailId);
		} catch (e) {
			setUserExist(false);
			return;
		}
		const { email, nickname, profileImage } = data;
		setProfileInfo({
			email: email,
			nickname: nickname,
			profileImage: profileImage,
		});
		setUserExist(true);
	}, []);

	useEffect(() => {
		getProfileData(emailId);
	}, []);

	const onBtnClick = () => {
		console.log("somethign");
	};

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.ProfilePage)}>
				<div className={styles.titlebar}>
					<div className={styles.buttons}>
						<div
							className={styles.close}
							onClick={(e) => {
								onClick(emailId, e);
							}}
						>
							<button className={styles.closebutton}>
								<span className={styles.header_span}>
									<strong>x</strong>
								</span>
							</button>
						</div>
						{/* <div className={styles.minimize}>
							<a className={styles.minimizebutton} href="#">
								<span>
									<strong>&ndash;</strong>
								</span>
							</a>
						</div>
						<div className={styles.zoom}>
							<a className={styles.zoombutton} href="#">
								<span>
									<strong>+</strong>
								</span>
							</a>
						</div> */}
					</div>
					{profileInfo.nickname + "'s profile"}
				</div>
				{isUserExist === undefined && <></>}
				{isUserExist === true && (
					<>
						<BDProfileHeader userInfo={profileInfo} />
						{/* <BDProfileMain /> */}
					</>
				)}
				{isUserExist === false && (
					<>
						<BDProfileError />
					</>
				)}
			</div>
		</div>
	);
}
