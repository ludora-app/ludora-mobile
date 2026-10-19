export const VERIFY_CODE_LENGTH = 6;
// The code input keeps empty boxes as spaces, so completeness is checked on digits, not on length
export const VERIFY_CODE_REGEX = new RegExp(`^\\d{${VERIFY_CODE_LENGTH}}$`);
