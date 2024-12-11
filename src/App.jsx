import React, { useState } from 'react';
import QRISForm from './components/QRISForm';
import { makeString } from './utils/qrisGenerator';
import { dataQris } from './utils/qrisHelpers';

function App() {
  const [error, setError] = useState('');

  const handleGenerate = (formData) => {
    try {
      const { qrisInput, nominal, includeTax, taxType, taxValue } = formData;
      
      // Get merchant info from input QRIS
      const merchantInfo = dataQris(qrisInput);

      const qrisData = makeString(qrisInput, {
        nominal: nominal.toString(),
        taxtype: includeTax ? taxType : undefined,
        fee: includeTax ? taxValue.toString() : undefined
      });
      
      setError('');
      return { qrisData, merchantInfo };
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">QRIS Generator</h1>
      <div className="max-w-2xl mx-auto">
        <QRISForm onGenerate={handleGenerate} />
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;