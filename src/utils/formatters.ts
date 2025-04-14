
/**
 * Formats a number to Indian currency format (with lakhs and crores)
 * @param value - The number to format
 * @param displayAsCrore - Whether to display the value in crores (e.g., ₹1.25 Cr)
 * @param decimals - Number of decimal places to show
 * @returns Formatted currency string
 */
export const formatIndianCurrency = (
  value: number,
  displayAsCrore = true,
  decimals = 2
): string => {
  if (displayAsCrore) {
    // Convert to crores for display
    return `₹${(value / 10000000).toFixed(decimals)} Cr`;
  }
  
  // Format with Indian number system (commas at thousands, lakhs, crores)
  const numStr = value.toString();
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
};

/**
 * Converts a date string to an Indian formatted date string (DD/MM/YYYY)
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatIndianDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
