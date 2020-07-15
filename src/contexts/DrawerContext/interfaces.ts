import { ReactChild } from "react";

export interface DrawerStateContext {
  leftDrawer: boolean;
  rightDrawer: boolean;
  isDrawerTemporary: boolean;
  toggleLeftDrawer: () => void;
  toggleRightDrawer: () => void;
}

export interface DrawerProviderProps {
  children: ReactChild;
}
