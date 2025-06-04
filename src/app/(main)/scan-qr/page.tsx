"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { useLinks } from '@/contexts/LinkContext';

const QrReader = dynamic(async () => {
  const mod = await import('react-qr-reader');
  // module might have named export QrReader or default
  return mod.QrReader || mod.default;
}, { ssr: false });

export default function ScanQRPage() {
  const { addLink } = useLinks();
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleResult = (result: any, error: any) => {
    if (result?.text) {
      const text = result.text as string;
      setScanResult(text);
      addLink(text);
    }
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Scan QR Code</h1>

      <div className="w-full bg-white p-8 rounded-lg shadow-xl mb-8">
        <div className="aspect-square w-full max-w-md mx-auto mb-6">
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={handleResult}
            containerStyle={{ width: '100%', height: '100%' }}
          />
        </div>
        {scanResult && (
          <p className="text-center text-green-700 mb-4 break-all">
            Scanned Link: {scanResult}
          </p>
        )}
        <p className="text-center text-gray-600 mb-6 text-sm">
          Point your camera at a QR code.
        </p>
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
