'use client'
import { useEffect, useRef } from 'react';

export default function Webcam() {
    const videoRef = useRef(null);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch(error) {
                console.error('Error accessing webcam:', error)
            }
        };

        startWebcam();

        return () => {
            const stream = videoRef.current.srcObject;

            if(stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };

    }, []);

    return (
        <>
            <video ref={videoRef} autoPlay playsInline />
        </>
    )
}