import React, { useState } from 'react';
import { NumPad } from './NumPad';
import { TaxSection } from './TaxSection';
import { Modal } from './Modal';
import QRISResult from './QRISResult';
import { formatRupiah } from '../utils/formatCurrency';

function QRISForm({ onGenerate }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    qrisInput: '',
    nominal: '',
    includeTax: false,
    taxType: 'p',
    taxValue: '0'
  });
  const [showResult, setShowResult] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      const result = onGenerate(formData);
      if (result) {
        setGeneratedData({
          ...result,
          nominal: formData.nominal,
          taxType: formData.taxType,
          taxValue: formData.taxValue,
          includeTax: formData.includeTax
        });
        setShowResult(true);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNominalChange = (value) => {
    setFormData(prev => ({
      ...prev,
      nominal: value
    }));
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {step === 1 ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              QRIS Code
            </label>
            <textarea
              name="qrisInput"
              value={formData.qrisInput}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
              placeholder="Paste your QRIS code here..."
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nominal Amount
              </label>
              <input
                type="text"
                name="nominal"
                value={formatRupiah(formData.nominal)}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50"
                required
              />
              <NumPad
                value={formData.nominal}
                onChange={handleNominalChange}
                className="mt-2"
              />
            </div>

            <TaxSection
              includeTax={formData.includeTax}
              taxType={formData.taxType}
              taxValue={formData.taxValue}
              onChange={handleChange}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Generate QRIS
              </button>
            </div>
          </>
        )}
      </form>

      <Modal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        className="max-w-2xl"
      >
        {generatedData && (
          <QRISResult
            qrisData={generatedData.qrisData}
            merchantInfo={generatedData.merchantInfo}
            nominal={generatedData.nominal}
            taxType={generatedData.taxType}
            taxValue={generatedData.taxValue}
            includeTax={generatedData.includeTax}
          />
        )}
      </Modal>
    </>
  );
}

export default QRISForm;