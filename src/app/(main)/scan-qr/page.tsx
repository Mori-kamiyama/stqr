"use client";

import { Camera, UploadCloud, Zap } from 'lucide-react';
import { useLinks } from '@/contexts/LinkContext';
import { useRef, useState, useEffect } from 'react';

export default function ScanQRPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addLink } = useLinks();

  useEffect(() => {
    if (!scanning) return;
    let stream: MediaStream;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          requestAnimationFrame(scan);
        }
      } catch (err) {
        console.error(err);
        setError('Unable to access camera');
        setScanning(false);
      }
    };

    const detector = 'BarcodeDetector' in window
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).BarcodeDetector({ formats: ['qr_code'] })
      : null;

    const scan = async () => {
      if (!scanning || !detector || !videoRef.current || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      try {
        const barcodes = await detector.detect(canvas);
        if (barcodes.length > 0) {
          const value = barcodes[0].rawValue;
          setResult(value);
          setScanning(false);
          stop();
          if (/^https?:\/\//.test(value)) {
            addLink({
              id: Date.now().toString(),
              title: value,
              link: value,
              tags: [],
              dueDate: undefined
            });
          }
          return;
        }
      } catch (e) {
        console.error(e);
      }
      requestAnimationFrame(scan);
    };

    const stop = () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };

    start();
    return stop;
  }, [scanning, addLink]);

  const handleStartScan = () => {
    setResult(null);
    setError(null);
    setScanning(true);
  };

  const handleUploadImage = () => {
    alert('QR Code image upload not implemented yet.');
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Scan QR Code</h1>

      <div className="w-full bg-white p-8 rounded-lg shadow-xl mb-8">
        <div
          className="aspect-square w-full max-w-md mx-auto bg-gray-900 rounded-lg flex flex-col items-center justify-center mb-6 shadow-inner overflow-hidden relative"
        >
          {scanning ? (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
            </>
          ) : (
            <>
              <Camera size={64} className="text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg font-medium">Camera feed will appear here.</p>
            </>
          )}
          <div className="absolute w-3/4 h-3/4 border-4 border-dashed border-gray-400 opacity-50 rounded-md pointer-events-none"></div>
        </div>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {result && (
          <p className="text-center text-green-600 font-semibold mb-2 break-all">
            Detected: {result}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartScan}
            className="flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            disabled={scanning}
          >
            <Zap size={20} className="mr-2" />
            {scanning ? 'Scanning...' : 'Start Scan'}
          </button>
          <button
            onClick={handleUploadImage}
            className="flex items-center justify-center w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-gray-300"
          >
            <UploadCloud size={20} className="mr-2" />
            Upload QR Image
          </button>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">How it works:</h2>
        <p className="text-gray-600">
          Once a QR code is scanned, the contained link or data will be processed.
          You might be redirected, or the information will be used to populate a new link entry.
        </p>
      </div>
    </div>
  );
}
