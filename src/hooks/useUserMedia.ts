import React, { useEffect, useState } from "react";

const userMediaConfig = {
  audio: { echoCancellation: true, noiseSuppression: true },
  video: { facingMode: "user" }
};

export default function useUserMedia() {
  const [mediaStream, setMediaStream] = useState<MediaStream>(null);

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(userMediaConfig);
        setMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    }

    if (!mediaStream) {
      enableStream();
    } 
    // else {
    //   return () => {
    //     mediaStream.getTracks().forEach(track => {
    //       track.stop();
    //     });
    //   }
    // }
  }, [mediaStream]);

  return mediaStream;
}