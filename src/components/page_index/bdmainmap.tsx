import {
	GetServerSideProps,
	GetStaticProps,
	GetStaticPropsContext,
} from "next";
import React, { useEffect, useRef, useState } from "react";

import { BDChatroom } from "@src/model/models";
import Head from "next/head";
import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import { renderToString } from "react-dom/server";
import styles from "./bdmainmap.module.scss";

interface Prop {
	className: string;
	chatrooms: BDChatroom[];
}

const geoLocateControl = new mapboxgl.GeolocateControl({
	positionOptions: {
		enableHighAccuracy: true,
	},
	trackUserLocation: true,
});

var pins: mapboxgl.Marker[] = [];

export default function BDMainMap({ className, chatrooms }: Prop) {
	const mapContainer = useRef(null);
	const map = useRef(null);

	const resetChatroomPins = () => {
		pins.forEach((pin) => {
			pin.remove();
		});
		pins = [];
	};

	const addChatroomPin = (map: mapboxgl.Map, chatroom: BDChatroom) => {
		var pinElement = document.createElement("div");
		pinElement.className = styles.chatroom_pin;
		if (chatroom.generator.profileImage === "https://boundary.or.kr/api/NULL") {
			pinElement.style.backgroundImage = `url(/default_user.png)`;
		} else {
			pinElement.style.backgroundImage = `url(${chatroom.generator.profileImage})`;
		}
		pinElement.style.backgroundSize = "cover";
		pinElement.style.backgroundPosition = "center";
		pinElement.style.backgroundRepeat = "no-repeat";
		pinElement.style.width = "50px";
		pinElement.style.height = "50px";

		var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<div class="${styles.chatroom_popup}">
				<div class="${styles.chatroom_popup_info}">
					<div class="${styles.chatroom_popup_title}">${chatroom.title}</div>
					<div class="${styles.chatroom_popup_generator}">by ${chatroom.generator.nickname}</div>
				</div>
				<div class="${styles.chatroom_popup_buttons}">
					<div class="${styles.chatroom_popup_button_enter}">
						<img onClick=next.router.push('/','/chatroom/${chatroom.id}'); src="/icon_enter.svg" />
					</div>
				</div>
			</div>`,
		);

		var newPin = new mapboxgl.Marker(pinElement)
			.setLngLat([chatroom.location.longitude, chatroom.location.latitude])
			.setPopup(popup)
			.addTo(map);
		pins.push(newPin);
	};

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			accessToken: `mapbox_api_key`,
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [-74.5, 40],
			zoom: 1,
		});
		map.current.addControl(geoLocateControl);
	}, []);

	useEffect(() => {
		geoLocateControl.trigger();
		resetChatroomPins();
		chatrooms.forEach((chatroom) => {
			addChatroomPin(map.current, chatroom);
		});
	}, [chatrooms]);

	return (
		<div ref={mapContainer} className={classNames(className, styles.map)}>
			<Head>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css"
					rel="stylesheet"
				/>
			</Head>
		</div>
	);
}
