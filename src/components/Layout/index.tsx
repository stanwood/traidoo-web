import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/context";
import CustomAppBar from "./AppBar";
import { CategoriesDrawer, RoutesDrawer } from "./DrawerLeft";
import DrawerRight from "./DrawerRight";
import { LayoutProps } from "./interfaces";
import { useLayoutStyles } from "./styles";
import { tabs } from "./tabs";

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const classes = useLayoutStyles();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [displayCartIcon, setDisplayCartIcon] = useState<boolean>(false);

  const canDisplayCartDrawer = useMemo(() => {
    return !!user.id && ["/", "/products"].includes(location.pathname);
  }, [user.id, location.pathname]);

  const displayLeftMenuButton = useMemo(() => {
    if (location.pathname === "/" || location.pathname === "/products") {
      return true;
    } else if (location.pathname.startsWith("/seller/logistic")) {
      return true;
    } else {
      return false;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.startsWith("/products")
    ) {
      setDisplayCartIcon(true);
    } else {
      setDisplayCartIcon(false);
    }
  }, [location.pathname]);

  const [tabsList, setTabsList] = useState<{ name: string; link: string }[]>(
    []
  );

  const getTabs = useCallback((user: any, pathname: string) => {
    if (!user?.id) {
      setTabsList([]);
    }

    if (pathname.startsWith("/profile")) {
      setTabsList(tabs.profile);
    } else if (
      pathname.startsWith("/history") &&
      user?.groups?.includes("seller")
    ) {
      setTabsList(tabs.history);
    } else if (
      user?.groups?.includes("seller") &&
      !pathname.startsWith("/profile")
    ) {
      setTabsList(tabs.seller);
    } else {
      setTabsList([]);
    }
  }, []);

  useEffect(() => {
    getTabs(user, location.pathname);
  }, [user, location.pathname, getTabs]);

  const leftMenu = useMemo(() => {
    if (["/", "/products"].includes(location.pathname)) {
      return (
        <CategoriesDrawer
          toolbarClassName={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
      );
    } else if (location.pathname.startsWith("/seller/logistic")) {
      return (
        <RoutesDrawer
          toolbarClassName={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
      );
    }
    return null;
  }, [
    location.pathname,
    classes.toolbar,
    classes.toolbarWithTabs,
    tabsList.length,
  ]);

  return (
    <div className={classes.root}>
      <CustomAppBar
        displayLeftMenuButton={displayLeftMenuButton}
        displayCartIcon={displayCartIcon}
        tabs={tabsList}
      />
      {leftMenu}
      <main className={classes.content}>
        <div
          className={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
        {children}
      </main>
      {canDisplayCartDrawer && (
        <DrawerRight
          toolbarClassName={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
      )}
    </div>
  );
};

export default Layout;
