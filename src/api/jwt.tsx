import Cookies from "js-cookie";
import JwtDecode from "jwt-decode";

interface Token {
  exp: number;
}

const accessTokenName = "jwt-access-token";
const refreshTokenName = "jwt-refresh-token";

export const getRefreshToken = (): string | undefined =>
  Cookies.get(refreshTokenName);

export const storeRefreshToken = (refreshToken: string) => {
  Cookies.set(refreshTokenName, refreshToken, { path: "/" });
};

export const removeRefreshToken = (): void => {
  Cookies.remove(refreshTokenName);
};

export const getAccessToken = (): string | undefined =>
  Cookies.get(accessTokenName);

export const storeAccessToken = (accessToken: string) => {
  Cookies.set(accessTokenName, accessToken, { path: "/" });
};

export const removeAccessToken = (): void => {
  Cookies.remove(accessTokenName);
};

export const needRefreshToken = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return true;
  }

  try {
    const decodedToken = JwtDecode<Token>(accessToken);
    const accessExpiration: number = new Date(decodedToken.exp).getTime();
    return Date.now() >= accessExpiration * 1000;
  } catch (error) {
    return true;
  }
};
