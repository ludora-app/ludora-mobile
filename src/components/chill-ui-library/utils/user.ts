export default function getUserInitials(user: { firstname: string; lastname?: string }) {
  if (!user?.firstname) return '';
  const firstInitial = user.firstname.charAt(0).toUpperCase();
  if (!user?.lastname) return firstInitial;
  const lastInitial = user.lastname.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}
