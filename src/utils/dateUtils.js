import { format } from 'date-fns'

// Function to format date
export function formatDate(dateString) {
  try {
    const date = new Date(dateString)
    return format(date, 'PPp')
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid date'
  }
}

// Function to convert local date to UTC format for API requests
// This ensures that when a user selects "2024-01-19", the API receives the correct date
export function formatDateForAPI(dateString) {
  if (!dateString) return '';
  
  try {
    // Create date at midnight UTC to avoid timezone issues
    // This prevents "2024-01-19" from becoming "2024-01-18" due to timezone conversion
    const date = new Date(dateString + 'T00:00:00.000Z');
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date for API:', error);
    return dateString; // Fallback to original string
  }
}

// Function to get current date in local timezone for date inputs
export function getCurrentLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
