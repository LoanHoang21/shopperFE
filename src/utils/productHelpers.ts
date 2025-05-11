export const getMinPrice = (product: any): string => {
  if (!Array.isArray(product.variants) || product.variants.length === 0) {
    return `đ${product.price?.toLocaleString('vi-VN') ?? '---'}`;
  }

  const prices = product.variants.map((v: any) => v.price);
  const min = Math.min(...prices);

  return `đ${min.toLocaleString('vi-VN')}`;
};
export const getPriceRange = (product: any): string => {
  if (!Array.isArray(product.variants) || product.variants.length === 0) {
    return `đ${product.price?.toLocaleString('vi-VN') ?? '---'}`;
  }

  const prices = product.variants.map((v: any) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max
    ? `đ${min.toLocaleString('vi-VN')}`
    : `đ${min.toLocaleString('vi-VN')} - đ${max.toLocaleString('vi-VN')}`;
};
