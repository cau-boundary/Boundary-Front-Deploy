import React, { useCallback, useState } from "react";
import router, { useRouter } from "next/router";

import { Location } from "@src/model/models";
import classNames from "classnames";
import { createChatroom } from "@src/model/api_chatroom";
import styles from "./bdmaincreatechatroom.module.scss";

interface Prop {
	className?: string;
	location?: Location;
	getChatRooms(): void;
}

export default function BDMainCreateChatroom({
	className,
	location,
	getChatRooms,
}: Prop) {
	const [title, setTitle] = useState("");
	const [isBtnActivate, setBtnActivate] = useState<boolean>(false);
	const [myLocation, setMyLocation] = useState<Location>(location);

	const onChange = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	// const getMyLocation = useCallback(() => {
	// 	console.log("getCurrentLocation called");
	// 	// navigator.geolocation.getCurrentPosition을 비동기로 사용하기 위해 Promise로 감쌌음
	// 	return new Promise<Location>((resolve, reject) => {
	// 		if (!navigator.geolocation) {
	// 			console.log(1);
	// 			reject("위치정보 사용이 불가능한 브라우저입니다.");
	// 		}
	// 		navigator.geolocation.getCurrentPosition((position) => {
	// 			console.log(2);
	// 			resolve(position.coords as Location);
	// 		}, reject);
	// 	});
	// }, []);

	const tryCreateRoom = async (e) => {
		e.preventDefault();
		console.log(title, myLocation);
		let me;
		if (!isBtnActivate) return;
		else {
			setBtnActivate(false);
		}
		try {
			me = await createChatroom(title, myLocation);
		} catch (err) {
			console.log(e);
			alert("error occured back to main page");
			router.push("/", undefined, { shallow: true });
		}
		if (me) {
			getChatRooms();
			alert("successfully created");
			router.push("/", undefined, { shallow: true });
		}
	};

	// 입력 제한 코드
	const btnChangeColor = () => {
		title.length >= 4 ? setBtnActivate(true) : setBtnActivate(false);
	};

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.login_box)}>
				<h1>Create New ChatRoom</h1>
				<form>
					<label htmlFor="email">Room Title</label>
					<input
						type="id"
						name="title"
						placeholder="채팅방이름"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={title}
					/>
					<input
						className={classNames(
							`${styles.login_btn} ${
								isBtnActivate ? styles.onLoginBtn : styles.offLoginBtn
							}`,
						)}
						type="submit"
						value="Create"
						onClick={tryCreateRoom}
					/>
				</form>
			</div>
		</div>
	);
}
