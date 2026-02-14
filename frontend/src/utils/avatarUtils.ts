export const getAvatarColor = (name: string): string => {
  const colors = [
    "#F44336", 
    "#E91E63", 
    "#9C27B0", 
    "#673AB7", 
    "#3F51B5", 
    "#2196F3", 
    "#03A9F4", 
    "#00BCD4", 
    "#009688", 
    "#4CAF50", 
    "#8BC34A", 
    "#CDDC39", 
    "#FFEB3B", 
    "#FFC107", 
    "#FF9800", 
    "#FF5722", 
    "#795548", 
    "#9E9E9E", 
    "#607D8B", 
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % colors.length);
  return colors[index];
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

















































