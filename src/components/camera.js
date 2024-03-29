'use client'
import { useEffect, useRef, useState } from 'react';

const Camera = ({onImageCapture}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState(null);
  const [videoInputs, setVideoInputs] = useState(null);
  const [cameraLabels, setCameraLabels] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    if(selectedCamera) {
        switchCamera();
    }
  }, [selectedCamera]);

  const initCamera = async () => {
    try {
        const initialStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(initialStream);

        if(initialStream) {
            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoTracks = allDevices.filter(device => device.kind === 'videoinput');
            console.log('video tracks', videoTracks);
            setDevices(allDevices);
            setVideoInputs(videoTracks);

            if (videoRef.current) {
                videoRef.current.srcObject = initialStream;
      
                const labels = videoTracks.map(track => track.label);
                console.log('labels', labels);
                setCameraLabels(labels);
                setSelectedCamera(labels[0]);
              }
        }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
};

  const switchCamera = async () => {
    try {

      const selectedTrack = videoInputs.find(track => track.label === selectedCamera);

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
    <div className="camera">
        {!stream && ( 
            <button onClick={initCamera}>Start Camera</button>
        )}
        {cameraLabels && (
            <div className="top options">
                <label>
                    Select Camera:
                    <br></br>
                    <select value={selectedCamera} onChange={handleCameraChange}>
                    {cameraLabels.map(label => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                    </select>
                </label>
                <button onClick={captureImage}>Capture Image</button>
            </div>
        )}

        {stream && ( 
            <>
                <video ref={videoRef} autoPlay playsInline />
                <canvas ref={canvasRef}></canvas>
            </>
        )} 
    </div>
  );
};

export default Camera;
