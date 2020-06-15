import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "../../api/jwt";
import { CartContext } from "../../contexts/CartContext/context";
import { Context } from "../../core/context";

export const Logout: React.FC = () => {
  const history = useHistory();
  const context = useContext(Context);
  const { initialState } = useContext(CartContext);

  useEffect(() => {
    removeAccessToken();
    removeRefreshToken();
    initialState();
    context.dispatch({ type: "user", payload: null });
    history.push("/");
  });

  return null;
};
