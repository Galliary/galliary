import { useContext } from "react";
import { AppContext } from "pages/_app";

export const useCurrentUser = () => {
  const { currentUser } = useContext(AppContext)
  return currentUser
}
