import { useMediaQuery } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import theme from "../../theme";
import { DrawerContext } from "./context";
import { DrawerProviderProps } from "./interfaces";

const DrawerProvider = (props: DrawerProviderProps): ReactElement => {
  const location = useLocation();
  const isDrawerTemporary = useMediaQuery(theme.breakpoints.down("lg"));

  const [leftDrawer, setLeftDrawer] = useState<boolean>(false);
  const [rightDrawer, setRightDrawer] = useState<boolean>(false);

  const toggleLeftDrawer = () => {
    setRightDrawer(false);
    setLeftDrawer(!leftDrawer);
  };

  const toggleRightDrawer = () => {
    if (isDrawerTemporary) {
      setLeftDrawer(false);
      setRightDrawer(!rightDrawer);
    }
  };

  useEffect(() => {
    setLeftDrawer(false);
    setRightDrawer(false);
  }, [location, isDrawerTemporary]);

  const value = {
    leftDrawer,
    rightDrawer,
    isDrawerTemporary,
    toggleLeftDrawer,
    toggleRightDrawer,
  };

  return (
    <DrawerContext.Provider value={value}>
      {props.children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
