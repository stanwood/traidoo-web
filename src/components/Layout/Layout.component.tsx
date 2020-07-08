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
import { CategoriesMenu, RoutesMenu } from "./DrawerLeft";
import DrawerRight from "./DrawerRight";
import Props from "./Layout.interfaces";
import { useStyles } from "./Layout.styles";
import { tabs } from "./tabs";

const Layout: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [displayCartIcon, setDisplayCartIcon] = useState<boolean>(false);

  const location = useLocation();

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

  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const [openRightDrawer, setOpenRightDrawer] = React.useState(false);

  const leftMenu = useMemo(() => {
    if (["/", "/products"].includes(location.pathname)) {
      return (
        <CategoriesMenu
          open={openLeftDrawer}
          toolbarClassName={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
      );
    } else if (location.pathname.startsWith("/seller/logistic")) {
      return <RoutesMenu open={openLeftDrawer} />;
    }
    return null;
  }, [
    location.pathname,
    openLeftDrawer,
    classes.toolbar,
    classes.toolbarWithTabs,
    tabsList.length,
  ]);

  const handleDrawerLeft = useCallback(() => {
    setOpenLeftDrawer(!openLeftDrawer);
  }, [openLeftDrawer]);

  const handleDrawerRight = useCallback(() => {
    setOpenRightDrawer(!openRightDrawer);
  }, [openRightDrawer]);

  useEffect(() => {
    setOpenRightDrawer(false);
  }, [location.pathname]);

  return (
    <div>
      <CustomAppBar
        handleDrawerLeft={handleDrawerLeft}
        handleDrawerRight={handleDrawerRight}
        displayLeftMenuButton={displayLeftMenuButton}
        displayCartIcon={displayCartIcon}
        tabs={tabsList}
      />
      {leftMenu}
      <main
        className={`${classes.content} ${
          displayLeftMenuButton ? classes.contentPadding : ""
        }`}
      >
        <div
          className={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
        {children}
      </main>
      <DrawerRight
        open={openRightDrawer}
        toolbarClassName={
          tabsList.length > 0
            ? `${classes.toolbar} ${classes.toolbarWithTabs}`
            : classes.toolbar
        }
      />
    </div>
  );
};

export default Layout;
