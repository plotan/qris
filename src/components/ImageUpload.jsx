import React from 'react';

export function ImageUpload({ onImageSelect }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Logo Image (Optional)
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="w-full p-2 border rounded-md"
      />
      <p className="mt-1 text-sm text-gray-500">
        Recommended: Square image, max 50x50 pixels
      </p>
    </div>
  );
}