"use client";
import { useEffect, useRef } from "react";

const Webcam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const checkDevises = async () => {
    const devises = await navigator?.mediaDevices?.enumerateDevices();
    console.log({ devises })
  }
  const startCamera = async () => {
    if ("mediaDevices" in navigator && !!navigator?.mediaDevices.getUserMedia) {
      try {
        checkDevises();
        const constraints = {
          audio: false,
          video: true,
        };
        const stream = await navigator?.mediaDevices.getUserMedia(constraints);
        console.log({ stream });
        if (videoRef?.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.log({ error })
      }

    }
  }
  const captureImage = () => {
    if (videoRef.current && canvasRef.current && imageRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const image = imageRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageURL = canvas.toDataURL('image/png');
        // You can now use the imageURL (e.g., display it, download it, etc.)
        console.log(imageURL);
        image?.setAttribute('src', imageURL);
        canvas.toBlob(blog => {
          console.log({ blog });
          console.log({ blogUrl: window.URL.createObjectURL(blog as Blob) });
        })
      }
    }
  };
  useEffect(() => {
    //startCamera();

  }, [])

  return (
    <main>
      {/* <button type="button" onClick={startCamera}>Start Camera</button>
      <video ref={videoRef} autoPlay={false} controls src="" width={300}></video> */}
      <video ref={videoRef} autoPlay controls src="/Attack.on.Titan.S01E03.mkv" width={300}></video>
      <canvas ref={canvasRef} className="hidden" />
      <button onClick={captureImage}>Capture Image</button>
      <img ref={imageRef} src="" alt="" width={300} height={168.75} />
    </main>
  )
}
export default Webcam;