'use client'
import { useEffect, useRef } from 'react';

export default function Webcam() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch(error) {
                console.error(`Error accessing webcam: ${error}`, error)
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

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        console.log('captured image:', imageDataUrl);
    }

    return (
        <>
            <video ref={videoRef} autoPlay playsInline />
            <button onClick={captureImage}>Capture Image</button>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}