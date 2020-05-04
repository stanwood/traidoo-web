import React, { useContext } from "react";
import { Context } from "../../core/context";

const Home = () => {
  const context = useContext(Context);
  const user = context.state.user;

  return <>Hello {user?.id}!</>;
};

export default Home;
