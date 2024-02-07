export const LS_TOKEN_KEY = "hex-auth-token"

// I DO IT BECAUSE I DON'T CARE ABOUT SECURITY!! THIS IS PROOF OF CONCEPT!!
// Salt is static to generate same hash for same input each time
// I just want to avoid sending password in a query params
export const BCRYPT_SALT = "$2a$04$rJv/4U8sRCl7XLWyJcKBf."