import React, { useEffect, useRef } from "react";

import classNames from "classnames";
import styles from "./bdchatroommedia.module.scss";

export interface Props {
	className?: string;
	mediaStream: MediaStream;
	emailId: string;
	muted: boolean;
	profileImage: string;
	onClick(emailId: string, e: any): void;
}

export default function BDChatRoomMedia({
	className,
	mediaStream,
	emailId,
	profileImage,
	muted,
	onClick,
}: Props) {
	const viewRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		console.log("profileImage is ", profileImage);
		if (!viewRef.current) return;
		viewRef.current.srcObject = mediaStream ? mediaStream : null;
	}, [mediaStream]);

	// useEffect(() => {
	// 	function drawLoudness() {
	// 		requestAnimationFrame(drawLoudness);
	// 		const bufferLength = audioAnalyser.frequencyBinCount;
	// 		const dataArray = new Uint8Array(bufferLength);
	// 		audioAnalyser.getByteFrequencyData(dataArray);
	// 		const audioLevel =
	// 			dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
	// 		if (audioLevel > 50) {
	// 			viewRef.current.style.borderColor = "green";
	// 		} else {
	// 			if (viewRef.current) viewRef.current.style.borderColor = "transparent";
	// 		}
	// 	}
	// 	const audioContext = new AudioContext();
	// 	const audioAnalyser = new AnalyserNode(audioContext, { fftSize: 32 });
	// 	if (mediaStream) {
	// 		const audioSource = audioContext.createMediaStreamSource(mediaStream);
	// 		audioSource.connect(audioAnalyser);
	// 		audioSource.connect(audioContext.destination);
	// 		drawLoudness();
	// 	}
	// }, [mediaStream]);

	return (
		<div className={classNames(className, styles.container)}>
			<video
				className={styles.video}
				ref={viewRef}
				autoPlay
				playsInline
				muted={muted}
				poster={
					profileImage === "https://boundary.or.kr/api/NULL"
						? "/default_user.png"
						: profileImage
				}
				onClick={(e) => {
					onClick(emailId, e);
				}}
			/>
			<div className={styles.label}>{emailId ? emailId : "unknown"}</div>
		</div>
	);
}
