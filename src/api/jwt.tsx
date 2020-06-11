import Cookies from "js-cookie";
import JwtDecode from "jwt-decode";

interface Token {
  exp: number;
}

const accessTokenName = "jwt-access-token";
const refreshTokenName = "jwt-refresh-token";

export const getRefreshToken = (): string | undefined =>
  Cookies.get(refreshTokenName);

export const storeRefreshToken = (refreshToken: string): void => {
  Cookies.set(refreshTokenName, refreshToken, {
    path: "/",
    secure: true,
    sameSite: "Lax",
  });
};

export const removeRefreshToken = (): void => {
  Cookies.remove(refreshTokenName);
};

export const getAccessToken = (): string | undefined =>
  Cookies.get(accessTokenName);

export const storeAccessToken = (accessToken: string): void => {
  Cookies.set(accessTokenName, accessToken, {
    path: "/",
    secure: true,
    sameSite: "Lax",
  });
};

export const removeAccessToken = (): void => {
  Cookies.remove(accessTokenName);
};

export const needRefreshToken = (): boolean => {
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
