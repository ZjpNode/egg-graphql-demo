export default async function upperCase({ resolve }) {
  const value = await resolve();
  return value.toString().toUpperCase();
}
