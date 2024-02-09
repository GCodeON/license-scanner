'use client'
import { useEffect, useRef, useState } from 'react';

const Camera = ({onImageCapture}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [cameraLabels, setCameraLabels] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  useEffect(() => {
    const initCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log('devices', videoTracks);
        const videoTracks = devices.filter(device => device.kind === 'videoinput');
        console.log('video tracks', videoTracks);
        const labels = videoTracks.map(track => track.label);
        console.log('labels', labels);

        setCameraLabels(labels);

        if (labels.length > 0) {
          const initialStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: videoTracks[0].deviceId } } });
          console.log('initial stream', initialStream);
          setStream(initialStream);
          setSelectedCamera(labels[0]);

          if (videoRef.current) {
            videoRef.current.srcObject = initialStream;
          }
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const switchCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoTracks = devices.filter(device => device.kind === 'videoinput');
      console.log('device list', videoTracks);
      const selectedTrack = videoTracks.find(track => track.label === selectedCamera);

      if (selectedTrack) {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: selectedTrack.deviceId } } });

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }

        setStream(newStream);
      } else {
        console.warn('Selected camera not found.');
      }
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
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
        onImageCapture(imageDataUrl);
    }
  }

  return (
    <div>
        {cameraLabels && (
            <>
                <label>
                    Select Camera:
                    <select value={selectedCamera} onChange={handleCameraChange}>
                    {cameraLabels.map(label => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                    </select>
                </label>
                <button onClick={switchCamera}>Switch Camera</button>
            </>
        )}

      <button onClick={captureImage}>Capture Image</button>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Camera;
