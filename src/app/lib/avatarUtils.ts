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

const AVATAR_IMAGES: Record<string, string> = {
  'Jawinder Schahal': '/avatars/men/jawinder.jpg',
  'Dave Morrison': '/avatars/men/mobile-02.jpg',
  'Steve Landers': '/avatars/men/mobile-03.jpg',
  'Gary Tillman': '/avatars/men/mobile-07.jpg',
  'Mike Hernandez': '/avatars/men/mobile-02.jpg',
  'Herman': '/avatars/men/mobile-03.jpg',
  'Karen Walsh': '/avatars/women/mobile-01.jpg',
  'Lisa Torres': '/avatars/women/Random_female_face_1.jpg',
  'Morgan': '/avatars/women/THCiUmVZcgxHodGCK3EyYo.jpg',
  'Morgan (Forwarded)': '/avatars/women/THCiUmVZcgxHodGCK3EyYo.jpg',
};

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getAvatarImage(name: string, isSystem = false): string | null {
  if (isSystem) return null;
  return AVATAR_IMAGES[name] ?? null;
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
