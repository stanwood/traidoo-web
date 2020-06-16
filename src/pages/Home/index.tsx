import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext/context";

const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  return <>Hello {user?.id}!</>;
};

export default Home;
