import React, { ReactEventHandler, useCallback, useRef } from 'react';

export default function useStream() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const setStream = useCallback(
        (stream) => {
            if (stream && videoRef.current && !videoRef.current.srcObject) {
                videoRef.current.srcObject = stream;
            }
        },
        [videoRef]
    )

    const handleCanPlay = () => {
        videoRef.current.play();
    }

    return [setStream, videoRef, handleCanPlay] as const;
};