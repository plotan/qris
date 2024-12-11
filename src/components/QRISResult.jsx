import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { MerchantInfo } from './MerchantInfo';
import { formatRupiah } from '../utils/formatCurrency';
import { generateQRWithLogo } from '../utils/qrGenerator';

export default function QRISResult({ qrisData, merchantInfo, nominal, taxType, taxValue, includeTax, logoImage }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        if (logoImage) {
          const url = await generateQRWithLogo(qrisData, logoImage);
          setQrCodeUrl(url);
        } else {
          const url = await QRCode.toDataURL(qrisData, {
            width: 512,
            margin: 2,
            scale: 4
          });
          setQrCodeUrl(url);
        }
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQR();
  }, [qrisData, logoImage]);

  const calculateTotal = () => {
    const nominalAmount = parseInt(nominal, 10);
    if (!includeTax || !taxValue) return nominalAmount;

    const taxAmount = taxType === 'p' 
      ? (nominalAmount * parseInt(taxValue, 10)) / 100
      : parseInt(taxValue, 10);
    
    return nominalAmount + taxAmount;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <MerchantInfo merchantInfo={merchantInfo} />
      
      <div className="mb-6 text-center">
        <div className="text-lg mb-2">
          <span className="font-semibold">Amount:</span> {formatRupiah(nominal)}
        </div>
        {includeTax && (
          <div className="text-lg mb-2">
            <span className="font-semibold">Tax ({taxType === 'p' ? `${taxValue}%` : 'Fixed'}):</span>{' '}
            {formatRupiah(taxType === 'p' 
              ? (parseInt(nominal, 10) * parseInt(taxValue, 10)) / 100
              : taxValue
            )}
          </div>
        )}
        <div className="text-xl font-bold">
          <span>Total:</span> {formatRupiah(calculateTotal())}
        </div>
      </div>

      {qrCodeUrl && (
        <div className="flex flex-col items-center">
          <img
            src={qrCodeUrl}
            alt="Generated QR Code"
            className="w-full max-w-[400px] h-auto mb-6"
          />
          <a
            href={qrCodeUrl}
            download={`QRIS-${merchantInfo.merchantName}-${Date.now()}.png`}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors text-lg font-medium"
          >
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}