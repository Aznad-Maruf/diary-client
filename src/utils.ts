export const formatDate = (dateString?: string): string => {
    if (!dateString) {
      return 'Invalid date';
    }
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
  
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };