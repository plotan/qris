import React from 'react';

export function NumericInput({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
        required
        min="0"
      />
    </div>
  );
}