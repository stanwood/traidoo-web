import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "../../api/jwt";
import { CartContext } from "../../contexts/CartContext/context";
import { UserContext } from "../../contexts/UserContext/context";

export const Logout: React.FC = () => {
  const history = useHistory();
  const { logout } = useContext(UserContext);
  const { initialState } = useContext(CartContext);

  useEffect(() => {
    removeAccessToken();
    removeRefreshToken();
    initialState();
    logout();
    history.push("/");
  });

  return null;
};
