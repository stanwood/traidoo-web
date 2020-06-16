import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { getCurrentUserRequest } from "../../api/queries/users/user";
import { UserContext } from "./context";
import { UserProviderProps, UserState } from "./interfaces";

const initialState: UserState = {
  id: undefined,
  groups: [],
};

const UserProvider = (props: UserProviderProps): ReactElement => {
  const [user, setUser] = useState<UserState>(initialState);

  const { refetch } = useQuery("/users/profile/me", getCurrentUserRequest, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const logout = useCallback(() => {
    setUser(initialState);
  }, []);

  const canBuy = useMemo((): boolean => {
    return user.id !== undefined && user.groups.includes("buyer");
  }, [user]);

  const isSeller = useMemo((): boolean => {
    return user.groups.includes("seller");
  }, [user]);

  const value = {
    user,
    logout,
    refetch,
    canBuy,
    isSeller,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
