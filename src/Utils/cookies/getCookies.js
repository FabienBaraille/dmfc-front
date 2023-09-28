export const getCookies = (key) => {
  const cookieValue = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return cookieValue ? cookieValue.pop() : "" ;
}