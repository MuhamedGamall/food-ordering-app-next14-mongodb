export default function formatDate(dateString: string,  ) {
  const date = new Date(dateString);
 
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  return date.toLocaleString('UTC', options);
}
