import { jwtDecode } from "jwt-decode";

export const hasExpiredToken = (token) => {
  /*
   token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjY5NTc2MjEsImV4cCI6MTcyNzA0NDAyMSwiZGF0YSI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifX0.Q2VuK57P-D8jddWud3RiKzFpOUG_RQrXeKC8_9DDzV0
   https://jwt.io/ 
   {
  "iat": 1726957621,
  "exp": 1727044021,
  "data": {
    "id": 1,
    "email": "admin@admin.com"
  }
}
   */
  const { exp } = jwtDecode(token);
  const currenData = new Date().getTime();
  if (exp <= currenData) {
    //si la fecha de expiration del token es menor que la fecha actual, entonces ya expiro
    return false;
  }
  return true; //no ha caducado
};
