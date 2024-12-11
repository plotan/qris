import React from 'react';

export function MerchantInfo({ merchantInfo }) {
  if (!merchantInfo) return null;

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md">
      <h3 className="font-bold text-lg mb-2">Merchant Information</h3>
      <p><span className="font-semibold">Name:</span> {merchantInfo.merchantName}</p>
      <p><span className="font-semibold">NMID:</span> {merchantInfo.nmid}</p>
      <p><span className="font-semibold">ID:</span> {merchantInfo.id}</p>
      <p><span className="font-semibold">NNS:</span> {merchantInfo.nns}</p>
    </div>
  );
}