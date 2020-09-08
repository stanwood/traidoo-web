import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { getAccessToken, getRefreshToken } from "../../api/jwt";
import { getCurrentUserRequest } from "../../api/queries/users/user";
import { UserContext } from "./context";
import { UserProviderProps, UserState } from "./interfaces";

const initialState: UserState = {
  id: undefined,
  groups: [],
  isCooperativeMember: false,
  isEmailVerified: false,
};

const UserProvider = (props: UserProviderProps): ReactElement => {
  const [user, setUser] = useState<UserState>(initialState);

  const { refetch, isIdle, isLoading } = useQuery(
    "/users/profile/me",
    getCurrentUserRequest,
    {
      enabled: false,
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );

  useEffect(() => {
    if (getAccessToken() || getRefreshToken()) {
      refetch();
    }
  }, [refetch]);

  const logout = useCallback(() => {
    setUser(initialState);
  }, []);

  const canBuy = useMemo((): boolean => {
    return (
      user.id !== undefined &&
      (user.groups.includes("buyer") || user.groups.includes("seller"))
    );
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
    isIdle,
    isLoading,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
