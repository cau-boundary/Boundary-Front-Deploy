import { BDChatroom, BDUser, Location } from "@src/model/models";
import {
	GetServerSideProps,
	GetStaticPropsResult,
	NextPageContext,
} from "next";
import React, { useEffect, useState } from "react";

import BDChatroomView from "@src/components/webrtc/bdchatroomview";
import BDDetailProfile from "@src/components/page_profile/BDDetailProfile";
import BDMainBottomBar from "@src/components/page_index/bdmainbottombar";
import BDMainCreateChatroom from "@src/components/page_index/bdmaincreatechatroom";
import BDMainMap from "@src/components/page_index/bdmainmap";
import BDMainProfile from "@src/components/page_index/bdmainprofile";
import BDSignin from "@src/components/page_signin/bdsignin";
import BDSignup from "@src/components/page_signup/bdsignup";
import Cookies from "universal-cookie";
import Head from "next/head";
import { getNearbyChatrooms } from "@src/model/api_chatroom";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { viewMyProfile } from "@src/model/api_user";

interface Prop {
	me?: BDUser;
}

export default function Main({ me }: Prop) {
	const router = useRouter();
	const [chatrooms, setChatrooms] = useState([]);
	const [isShowingProfilePage, setShowingProfilePage] =
		useState<boolean>(false);
	const [currentShowingProfile, setCurrentShowingProfile] = useState<string>(
		me?.email,
	);
	const [isInit, setInit] = useState<boolean>(false);
	const [currentLocation, setCurrentLocation] = useState<Location>(undefined);

	const getCurrentLocation = () => {
		// navigator.geolocation.getCurrentPosition을 비동기로 사용하기 위해 Promise로 감쌌음
		return new Promise<Location>((resolve, reject) => {
			if (!navigator.geolocation) {
				reject("위치정보 사용이 불가능한 브라우저입니다.");
			}
			var options = {
				enableHighAccuracy: true,
				maximumAge: 30000,
			};
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve(position.coords as Location);
				},
				reject,
				options,
			);
		});
	};

	const onShowingProfileButtonClick = (emailId, e) => {
		e.preventDefault();
		console.log("clicked profile's emailId is : ", emailId);
		console.log(e);
		setCurrentShowingProfile(emailId);
		setShowingProfilePage(!isShowingProfilePage);
	};

	const getChatrooms = async () => {
		try {
			const currentChatrooms = await getNearbyChatrooms(currentLocation);
			setChatrooms(currentChatrooms);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker
					.register("service-worker.js") // serviceWorker 파일 경로
					.then((reg) => {
						console.log("Service worker registered.", reg);
					})
					.catch((e) => console.log(e));
			});
		}
	}, []);

	useEffect(() => {
		console.log("main page useeffect called");
		const showChatrooms = async () => {
			try {
				if (router.asPath !== "/") {
					return;
				}
				const cookies = new Cookies();
				if (!cookies.get("token")) {
					router.push("/signin", undefined, { shallow: true });
					return;
				}
				const currentLocation = await getCurrentLocation();
				setCurrentLocation(currentLocation);
				const currentChatrooms = await getNearbyChatrooms(currentLocation);
				setChatrooms(currentChatrooms);
				setInit(true);
			} catch (error) {
				alert(error);
			}
		};
		showChatrooms();
	}, [router]);

	let currentChatroom = chatrooms.filter((chatroom) => {
		return chatroom.id == router.asPath.slice(10);
	});
	return (
		<div className={styles.container}>
			<Head>
				<title>인덱스</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<link rel="manifest" href="manifest.json" />
				<link
					href="/favicon-16x16.png"
					rel="icon"
					type="image/png"
					sizes="16x16"
				/>
				<link
					href="/favicon-32x32.png"
					rel="icon"
					type="image/png"
					sizes="32x32"
				/>
				<link rel="apple-touch-icon" href="/logo.png"></link>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<meta name="theme-color" content="#FFFFFF" />
			</Head>
			{router.asPath == "/chatroom" && (
				<BDMainCreateChatroom
					className={styles.createChatroom}
					location={currentLocation}
					getChatRooms={getChatrooms}
				/>
			)}
			{router.asPath.startsWith("/chatroom/") && (
				<BDChatroomView
					className={styles.currentchatroom}
					chatroom={currentChatroom[0]}
					emailId={me?.email}
					profileImage={me?.profileImage}
					getChatRooms={getChatrooms}
					onClick={onShowingProfileButtonClick}
				/>
			)}
			{router.asPath.startsWith("/signin") && (
				<BDSignin className={styles.signin} />
			)}
			{router.asPath.startsWith("/signup") && (
				<BDSignup className={styles.signup} />
			)}
			{isShowingProfilePage && (
				<BDDetailProfile
					className={styles.detailProfile}
					emailId={currentShowingProfile}
					onClick={onShowingProfileButtonClick}
				/>
			)}

			<BDMainProfile
				className={styles.profile}
				user={me}
				onClick={onShowingProfileButtonClick}
			/>
			<BDMainMap className={styles.map} chatrooms={chatrooms} />
			{isInit && (
				<BDMainBottomBar className={styles.bottombar} chatrooms={chatrooms} />
			)}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<Prop> = async (context) => {
	switch (context.resolvedUrl) {
		case "/signin":
		case "/signup":
			return {
				props: {
					me: {
						nickname: "Plesase Sign In",
						email: "",
						profileImage: "",
					},
				},
			};
		case "/":
			try {
				const me = await viewMyProfile(context.req.headers.cookie);
				return {
					props: {
						me: me,
					},
				};
			} catch (error) {
				context.res.setHeader("location", "/signin");
				context.res.statusCode = 302;
				return {
					props: {
						me: null,
					},
				};
			}
		default:
			throw Error(`처리되지 않은 url입니다:${context.resolvedUrl}`);
	}
};
