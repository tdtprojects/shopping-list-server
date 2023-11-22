export const getCookieConfig = () => ({
  maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  httpOnly: true, // HTTP only flag
  secure: true, // Set to true if your application is using HTTPS
  sameSite: "None", // Allow cross-site requests
  partitioned: true,
});
