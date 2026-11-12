/** Suggestions featured in a row before the prepared session takes their place ("Pas pour moi"). */
export const HOME_MAX_SUGGESTIONS = 3;

/** Recommended sessions fetched once: the suggestions and the "Pour toi" badges. */
export const HOME_RECOMMENDED_LIMIT = 20;

/** Upcoming sessions of the player fetched once: the next match and the "Tu es inscrit" badges. */
export const HOME_MY_UPCOMING_LIMIT = 20;

export const HOME_SESSIONS_LIMIT = 10;

/** Distance of the sessions list, in km, then once the player widens the area. */
export const HOME_SESSIONS_DEFAULT_DISTANCE_KM = 10;
export const HOME_SESSIONS_WIDE_DISTANCE_KM = 20;

/**
 * Minutes in the background after which the home screen takes a new "now" (prepared session, start of the list).
 * Shorter returns keep the same date: a new one makes new queries.
 */
export const HOME_DATE_REFRESH_MINUTES = 30;

/** Avatars shown in the compatible players hint, the others are counted. */
export const HOME_COMPATIBLE_PLAYERS_AVATARS = 2;
