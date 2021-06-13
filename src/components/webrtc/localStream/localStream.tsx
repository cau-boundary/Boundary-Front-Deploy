import React, { useEffect } from "react";

import useStream from "@src/hooks/useStream";

export default function LocalStream({ userMedia, classStyle }) {
	const [setLocalStream, localVideoRef, handleCanPlayLocal] = useStream();

	useEffect(() => {
		if (userMedia) setLocalStream(userMedia);
	}, [setLocalStream, userMedia]);

	return (
		<div className={classStyle}>
			<video
				onContextMenu={(event) => event.preventDefault()}
				ref={localVideoRef}
				onCanPlay={handleCanPlayLocal}
				autoPlay
				playsInline
				muted
			/>
		</div>
	);
}
