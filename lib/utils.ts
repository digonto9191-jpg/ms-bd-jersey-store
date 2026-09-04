// Utility functions

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
  }).format(price);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const parseJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
};

export const stringifyJSON = (data: any): string => {
  return JSON.stringify(data);
};
