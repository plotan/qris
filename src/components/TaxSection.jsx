import React from 'react';
import { NumericInput } from './NumericInput';

export function TaxSection({ includeTax, taxType, taxValue, onChange }) {
  return (
    <>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="includeTax"
            checked={includeTax}
            onChange={onChange}
            className="mr-2"
          />
          <span className="text-gray-700 text-sm font-bold">Include Tax</span>
        </label>
      </div>

      {includeTax && (
        <div className="mb-4 pl-6">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tax Type
            </label>
            <select
              name="taxType"
              value={taxType}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="p">Percentage (%)</option>
              <option value="r">Fixed Amount (Rp)</option>
            </select>
          </div>

          <NumericInput
            label={`Tax Value (${taxType === 'p' ? '%' : 'Rp'})`}
            name="taxValue"
            value={taxValue}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
}