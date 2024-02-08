'use client'
import { useEffect, useRef, useState } from 'react';
import '@/scss/scanner.scss';
import Tesseract from 'tesseract.js';
import { parseData } from '@/utils/license-mapping';


export default function LicenseScanner() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [imageSrc, setImageSrc] = useState(null);
    const [scanData, setScanData] = useState(null);
    const [licenseData, setLicenseData] = useState(null);

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

    useEffect(() => {
        if(imageSrc) {
            // Tesseract.recognize(imageSrc, 'eng', {
            //     logger: (info) => console.log('logger', info)    
            // })
            // .then(result => {
            //     console.log('res', result);
            // })
            // .catch(error => {
            //     console.log('error', error)
            // })

            decodePDF417FromImage();

        }
    }, [imageSrc]);


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

        if(imageDataUrl) {
            setImageSrc(imageDataUrl);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (event) => {
            setImageSrc(event.target.result);
          };
    
          reader.readAsDataURL(file);
        }
    };

    const decodePDF417FromImage = async () => {
        try {
            const barcodeDetector = new BarcodeDetector({ formats: ['pdf417'] });
      
            const imageElement = new Image();
      
            // Load the image and wait for it to be fully loaded
            await new Promise((resolve, reject) => {
              imageElement.onload = resolve;
              imageElement.onerror = reject;
              imageElement.src = imageSrc;
            });

      
            const barcodes = await barcodeDetector.detect(imageElement);
            // console.log('barcodes', barcodes);
            if (barcodes.length > 0) {
                console.log('raw', barcodes[0].rawValue);
                const parsedData = parseData(barcodes[0].rawValue);
                setScanData(barcodes[0].rawValue)
                console.log('parsed', parsedData);
                setLicenseData(parsedData);
            
            } else {
              console.error('No PDF417 barcode found in the image.');
            }

        } catch (error) {
          console.error('Error decoding PDF417 barcode:', error.message);
        }
      };

    return (
        <div className="scanner">
            <div className="mediaWrapper">
                <video ref={videoRef} autoPlay playsInline />
                <canvas ref={canvasRef}></canvas>
            </div>
            <canvas ref={canvasRef}></canvas>
            <input type="file" onChange={handleFileChange} />
            <button onClick={captureImage}>Capture Image</button>
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