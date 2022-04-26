import { useContext } from "react";
import { AppContext } from "pages/_app";
import { useCookie } from "react-use";
import { AUTH_COOKIE_NAME } from "app/constants";

export const useAuthCookie = () => {
  const context = useContext(AppContext)
  const [, _setAuthToken] = useCookie(AUTH_COOKIE_NAME);

  const setAuthToken = (newToken: string) => {
    _setAuthToken(newToken);
    context.setAuthToken(newToken);
  }

  return [context.authToken, setAuthToken] as const
}
