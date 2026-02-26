import { useMemo } from 'react';

import { useUserMe } from '@/queries/user-me.query';

const GOOGLE_IMAGE_DOMAIN = 'googleusercontent.com';
const LUDORA_DEFAULT_AVATAR_PATH = '/default-avatar';

/**
 * Indique si l'avatar du user provient de Google (connexion Google).
 * Les photos de profil Google sont servies depuis *googleusercontent.com (ex: lh3.googleusercontent.com).
 */
function isGoogleProfileImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  return url.includes(GOOGLE_IMAGE_DOMAIN);
}

/**
 * Indique si l'avatar est l'image par défaut Ludora (ex: .../default-avatars/ludo-8.png).
 */
function isDefaultLudoraProfileImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  return url.includes(LUDORA_DEFAULT_AVATAR_PATH);
}

export function useOnBoardingUserImageSource() {
  const { userMe } = useUserMe();
  const rawImageUrl = userMe?.imageUrl;

  return useMemo(() => {
    const isDefaultLudora = isDefaultLudoraProfileImageUrl(rawImageUrl);
    return {
      imageUrl: isDefaultLudora ? null : (rawImageUrl ?? null),
      isDefaultLudora,
      isGoogle: isGoogleProfileImageUrl(rawImageUrl),
    };
  }, [rawImageUrl]);
}
