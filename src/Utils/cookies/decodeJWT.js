import jwt_decode from "jwt-decode";

export const decodeJWT = (token, key) => {
  const decode = jwt_decode(token);
  return decode[key];
}