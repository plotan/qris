import React from 'react';
import { clsx } from 'clsx';

export function NumPad({ value, onChange, className }) {
  const handleClick = (digit) => {
    if (digit === 'backspace') {
      onChange(value.slice(0, -1));
    } else if (digit === 'clear') {
      onChange('');
    } else {
      onChange(value + digit);
    }
  };

  const Button = ({ digit, className }) => (
    <button
      type="button"
      onClick={() => handleClick(digit)}
      className={clsx(
        "flex-1 p-4 text-xl font-semibold rounded-lg",
        "bg-gray-100 hover:bg-gray-200 active:bg-gray-300",
        "transition-colors duration-150",
        className
      )}
    >
      {digit === 'backspace' ? '⌫' : digit === 'clear' ? 'C' : digit}
    </button>
  );

  return (
    <div className={clsx("grid grid-cols-3 gap-2", className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <Button key={digit} digit={digit.toString()} />
      ))}
      <Button digit="clear" className="bg-red-100 hover:bg-red-200 active:bg-red-300" />
      <Button digit="0" />
      <Button digit="backspace" className="bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-300" />
    </div>
  );
}