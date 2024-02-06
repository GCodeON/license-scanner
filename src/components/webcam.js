'use client'
import { useEffect, useRef } from 'react';
import '@/scss/webcam.scss';

export default function Webcam() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {

        startWebcam();

        return () => {
            const stream = videoRef.current.srcObject;

            if(stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };

    }, []);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch(error) {
            console.error(`Error accessing webcam: ${error}`, error)
        }
    };

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
        <div className="webcam">
            <div className="mediaWrapper">
                <video ref={videoRef} autoPlay playsInline />
                <canvas ref={canvasRef}></canvas>
            </div>
            <canvas ref={canvasRef}></canvas>
            <button onClick={captureImage}>Capture Image</button>
        </div>
    )
}