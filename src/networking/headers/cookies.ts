export const genSecAuthCookieHeaderBase = (token: string) =>
  `token=${token}; path=/api; SameSite=Strict; Secure; HttpOnly`;

export const genSecAuthCookieHeader = (token: string, expiresAt: string) =>
  `${genSecAuthCookieHeaderBase(token)}; Expires=${expiresAt}`;

export const expireSecAuthCookie = (token: string) => {
  return `${genSecAuthCookieHeaderBase(token)}; Max-Age=0`;
};

export const extractCookie = (cookieHeader: string, key: string) =>
  cookieHeader.match(new RegExp(`${key}=(\\w+)`))?.[1];