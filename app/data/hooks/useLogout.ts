import { useContext } from "react";
import { AppContext } from "pages/_app";
import { useCookie } from "react-use";
import { AUTH_COOKIE_NAME } from "app/constants";

export const useLogout = () => {
  const context = useContext(AppContext)
  const [, setAuthToken] = useCookie(AUTH_COOKIE_NAME);

  return () => {
    setAuthToken("");
    context.setAuthToken("");
  }
}
