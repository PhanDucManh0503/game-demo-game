const AUTH_COOKIE_CONFIG = {
  maxAge: 6000000 * 60 * 24,
  httpOnly: false,
  // secure: process.env.NEXT_PUBLIC_MODE_ENV !== 'development',
  secure: false,
  sameSite: 'lax' as 'lax',
};

export { AUTH_COOKIE_CONFIG };
