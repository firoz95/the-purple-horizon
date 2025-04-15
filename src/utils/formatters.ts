
/**
 * Formats a number as Indian currency in either crore or full format
 * @param amount Number to format
 * @param format 'crore' to format as ₹X.XX Cr, 'full' for full comma separated format
 * @returns Formatted currency string
 */
export const formatIndianCurrency = (amount: number, format: 'crore' | 'full' = 'crore'): string => {
  if (format === 'crore') {
    // Format in crore (1 Cr = 10,000,000)
    const inCrore = amount / 10000000;
    return `₹${inCrore.toFixed(2)} Cr`;
  } else {
    // Format with Indian number system (commas at thousands, lakhs, crores)
    const numStr = amount.toString();
    let result = "";
    let count = 0;
    
    for (let i = numStr.length - 1; i >= 0; i--) {
      count++;
      result = numStr[i] + result;
      
      if (i !== 0) {
        if (count === 3 && numStr.length - i > 3) {
          result = "," + result;
        } else if (count === 2 && numStr.length - i > 5) {
          count = 0;
          result = "," + result;
        }
      }
    }
    
    return `₹${result}`;
  }
};

/**
 * Formats a percentage with a + sign for positive values
 * @param value Percentage value
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value.toFixed(decimals)}%`;
};
