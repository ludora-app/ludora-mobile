// Bright colors dark enough to keep the white initials readable
const AVATAR_BACKGROUND_CLASS_NAMES = [
  'bg-[#F15924]',
  'bg-[#E8890C]',
  'bg-[#E0457B]',
  'bg-[#8B5CF6]',
  'bg-[#3B82F6]',
  'bg-[#0EA5E9]',
  'bg-[#16A36A]',
  'bg-[#CE3728]',
] as const;

/** A background color for an avatar without photo, always the same for a given id. */
export const getAvatarBackgroundClassName = (id: string) => {
  const hash = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_BACKGROUND_CLASS_NAMES[hash % AVATAR_BACKGROUND_CLASS_NAMES.length];
};
