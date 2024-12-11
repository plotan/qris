import QRCode from 'qrcode';

export async function generateQRWithLogo(qrisData, logoImage) {
  // Generate QR code canvas
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, qrisData, {
    width: 512,
    margin: 4,
    scale: 4,
    errorCorrectionLevel: 'H' // Use high error correction for logo space
  });

  // Create a new canvas for the combined image
  const finalCanvas = document.createElement('canvas');
  const ctx = finalCanvas.getContext('2d');
  finalCanvas.width = canvas.width;
  finalCanvas.height = canvas.height;

  // Draw the QR code
  ctx.drawImage(canvas, 0, 0);

  // Load and draw the logo
  const logo = new Image();
  await new Promise((resolve, reject) => {
    logo.onload = resolve;
    logo.onerror = reject;
    logo.src = logoImage;
  });

  // Calculate logo size and position (center)
  const logoSize = canvas.width * 0.2; // Logo will be 20% of QR code size
  const logoX = (canvas.width - logoSize) / 2;
  const logoY = (canvas.height - logoSize) / 2;

  // Create circular clip for logo
  ctx.save();
  ctx.beginPath();
  ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
  ctx.clip();

  // Draw white background for logo
  ctx.fillStyle = 'white';
  ctx.fillRect(logoX, logoY, logoSize, logoSize);

  // Draw the logo
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
  ctx.restore();

  // Return as data URL
  return finalCanvas.toDataURL('image/png');
}