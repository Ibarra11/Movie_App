export const server =
  process.env.NODE_ENV === "production"
    ? "https://flix-ibarra11.vercel.app"
    : process.env.NEXT_PUBLIC_URL;
