import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "../../api/jwt";
import { Context } from "../../core/context";

export const Logout: React.FC = () => {
  const history = useHistory();
  const context = useContext(Context);

  useEffect(() => {
    removeAccessToken();
    removeRefreshToken();
    context.dispatch({ type: "user", payload: null });
    history.push("/");
  });

  return null;
};
