export const QUERY_KEY = {
  GET_ADDRESS_PLACE: (id: string) => ['getPlaces', id],
  GOOGLE_SIGN_IN: 'googleSignIn',
  GOOGLE_SIGN_OUT: 'googleSignOut',
  PASSWORD_RESET: '/auth-b2c/password-reset',
  SEARCH_PLACES: (query: string) => ['searchPlaces', query],
  SEND_CONTACT_MESSAGE: 'sendContactMessage',
};
