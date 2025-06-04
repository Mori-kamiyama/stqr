"use client";

import { Camera, UploadCloud, Zap } from 'lucide-react'; // Icons for visual cues

export default function ScanQRPage() {
  // Mock function for starting scan - in a real app, this would interact with a QR library
  const handleStartScan = () => {
    console.log("Attempting to start QR scan...");
    // Logic to activate camera and QR scanner would go here
    alert("QR Scanning not implemented yet. Imagine the camera feed starting now!");
  };

  // Mock function for uploading QR image
  const handleUploadImage = () => {
    console.log("Attempting to upload QR image...");
    // Logic for file input and processing would go here
    alert("QR Code image upload not implemented yet.");
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Scan QR Code</h1>

      <div className="w-full bg-white p-8 rounded-lg shadow-xl mb-8">
        {/* Conceptual Camera View Section */}
        <div
          className="aspect-square w-full max-w-md mx-auto bg-gray-900 rounded-lg flex flex-col items-center justify-center mb-6 shadow-inner overflow-hidden"
          aria-label="QR Code scanner camera feed placeholder"
        >
          <Camera size={64} className="text-gray-500 mb-4" />
          <p className="text-gray-400 text-lg font-medium">Camera feed will appear here.</p>
          <div className="absolute w-3/4 h-3/4 border-4 border-dashed border-gray-400 opacity-50 rounded-md"></div>
        </div>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Position the QR code clearly within the frame for a quick scan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartScan}
            className="flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <Zap size={20} className="mr-2" />
            Start Scan
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
