export function formatRupiah(amount) {
    if (!amount) return 'Rp 0';
    const number = parseInt(amount, 10);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  }