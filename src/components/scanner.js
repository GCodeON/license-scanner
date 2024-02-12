'use client'
import { useEffect, useRef, useState } from 'react';
import { BrowserPDF417Reader } from '@zxing/browser';
import { parseData } from '@/utils/license-mapping';
import Tesseract from 'tesseract.js';

import Camera from '@/components/camera';

import '@/scss/scanner.scss';

export default function LicenseScanner() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [scanData, setScanData] = useState(null);
    const [licenseData, setLicenseData] = useState(null);
    
    const codeReader = new BrowserPDF417Reader();

    useEffect(() => {
    }, []);

    useEffect(() => {
        if(imageSrc) {
            decodePDF417FromImage();
            OCR();
        }
    }, [imageSrc]);
    

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
            console.log('raw', resultImage);
            setScanData(resultImage.text)
            setLicenseData(parsedData);

        } catch (error) {
          console.error('Error decoding PDF417 barcode:', error.message);

          setErrorMessage('Error decoding PDF417 barcode');
          setLicenseData(null);
        }
    };
    
    function OCR() {
        Tesseract.recognize(imageSrc, 'eng', {
            logger: (info) => console.log('logger', info)    
        })
        .then(result => {
            console.log('res', result);
        })
        .catch(error => {
            console.log('error', error)
        })
    };

    function handleImageCapture(image) {
        console.log('handle image', image);
        setImageSrc(image);
    }


    return (
        <div className="scanner">
            <h1>License Scanner</h1>
            {!imageSrc && (
                <Camera onImageCapture={handleImageCapture}></Camera>
            )} 

            <div className={imageSrc ? 'results' : ''}>
                {imageSrc && (
                    <img src={imageSrc} alt="PDF417 Image" />
                )}
                {licenseData && errorMessage && (
                    <div className="info">
                        <p>Full Name: {licenseData['first_name']} {licenseData['last_name']}</p>
                        <p>Address: {licenseData['address_1']} {licenseData['address_2']}
                        <br></br> {licenseData['city']}  {licenseData['state']} {licenseData['postal_code']}</p>
                        <p>EXP: {licenseData['License Expiration Date']}</p>
                        <p>ISS: {licenseData['License or ID Document Issue Date']}</p>
                    </div>
                )}
                {errorMessage && !licenseData && (
                    <div className='info'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
            <input type="file" onChange={handleFileChange} />
        </div>
    )
}