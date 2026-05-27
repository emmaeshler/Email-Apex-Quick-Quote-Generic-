const AVATAR_COLORS = [
  '#A4262C', // red
  '#CA5010', // orange
  '#8764B8', // purple
  '#4F6BED', // blue
  '#0B6A0B', // green
  '#038387', // teal
  '#C239B3', // magenta
  '#69797E', // gray
  '#DA3B01', // rust
  '#005B70', // dark teal
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getAvatarColor(name: string, isSystem = false): string {
  if (isSystem) return '#69797E';
  return AVATAR_COLORS[hashName(name) % AVATAR_COLORS.length];
}

export function getInitials(name: string, isSystem: boolean): string {
  if (isSystem) return 'AQ';
  const parts = name.replace(/\(.*\)/, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
