export const getCookieConfig = () => {
  return {
    maxAge: 183 * 24 * 60 * 60 * 1000, // 6 months
    httpOnly: true, // HTTP only flag
    secure: true, // Set to true if your application is using HTTPS
    sameSite: "None", // Allow cross-site requests
    partitioned: true,
    // domain: process.env.COOKIE_DOMAIN,
  };
};
