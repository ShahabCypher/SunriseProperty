export const getImageSrc = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${import.meta.env.VITE_API_URL}${url}`;
};
