export function formatDate(dateStr: string): string {
    // Create a Date object from the ISO string
  const date = new Date(dateStr);
  
  // Format the date using Intl.DateTimeFormat for localization
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}