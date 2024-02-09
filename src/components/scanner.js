'use client'
import { useEffect, useRef, useState } from 'react';
import '@/scss/scanner.scss';
import Tesseract from 'tesseract.js';
import { parseData } from '@/utils/license-mapping';
import { BrowserPDF417Reader } from '@zxing/browser'


export default function LicenseScanner() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [imageSrc, setImageSrc] = useState(null);
    const [scanData, setScanData] = useState(null);
    const [licenseData, setLicenseData] = useState(null);
    
    const codeReader = new BrowserPDF417Reader();

    useEffect(() => {
        
        startWebcam();

    }, []);

    useEffect(() => {
        if(imageSrc) {
            decodePDF417FromImage();
        }
    }, [imageSrc]);
    
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch(error) {
            console.error(`Error accessing webcam: ${error}`, error)
        }

        return () => {
            const stream = videoRef.current.srcObject;

            if(stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    };

    function captureImage() {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');

        if(imageDataUrl) {
            setImageSrc(imageDataUrl);
        }
    }

   function handleFileChange(e) {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (event) => {
            setImageSrc(event.target.result);
          };
    
          reader.readAsDataURL(file);
        }
    };

    async function decodePDF417FromImage() {
        try {
            const resultImage = await codeReader.decodeFromImageUrl(imageSrc);
            const parsedData = parseData(resultImage.text);

            setScanData(resultImage.text)
            setLicenseData(parsedData);

        } catch (error) {
          console.error('Error decoding PDF417 barcode:', error.message);
        }
    };
    

    return (
        <div className="scanner">
            <div className="mediaWrapper">
                <video ref={videoRef} autoPlay playsInline />
            </div>
            <canvas ref={canvasRef}></canvas>
            <div className="options">
                <input type="file" onChange={handleFileChange} />
                <button onClick={captureImage}>Capture Image</button>
            </div>
            {imageSrc && (
                <img src={imageSrc} alt="PDF417 Image" />
            )}
            {licenseData && (
                <div>
                    {/* <p>{scanData}</p> */}
                    <p>Full Name: {licenseData['first_name']} {licenseData['last_name']}</p>
                    <p>Address: {licenseData['address_1']} {licenseData['address_2']}<br></br> {licenseData['city']}  {licenseData['state']} {licenseData['postal_code']}</p>
                    <p>EXP: {licenseData['License Expiration Date']}</p>
                    <p>ISS: {licenseData['License or ID Document Issue Date']}</p>
                </div>
            )}
        </div>
    )
}