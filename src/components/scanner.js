'use client'
// components/PDF417Scanner.js
import { useEffect, useRef } from 'react';
import { PDF417Reader, BarcodeFormat } from '@zxing/library';

const PDF417Scanner = ({ base64Image, onDetected }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const pdf417Reader = new PDF417Reader();

    const decodePDF417 = async () => {
      try {
        const result = await pdf417Reader.decodeFromImageElement(imageRef.current);

        if (result && result.text && result.format === BarcodeFormat.PDF_417 && onDetected) {
          onDetected(result.text);
        }
      } catch (error) {
        console.error('Error decoding PDF417 barcode:', error);
      }
    };

    if (base64Image) {
      imageRef.current.src = `${base64Image}`;
      decodePDF417();
    }
  }, [base64Image, onDetected]);

  return <img ref={imageRef} alt="PDF417 Barcode" style={{ display: 'none' }} />;
};

export default PDF417Scanner;
