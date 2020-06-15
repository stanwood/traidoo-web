import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../core/context";
import CustomAppBar from "./AppBar";
import { CategoriesMenu, RoutesMenu } from "./DrawerLeft";
import DrawerRight from "./DrawerRight";
import Props from "./Layout.interfaces";
import { useStyles } from "./Layout.styles";
import { tabs } from "./tabs";

const snackbarAnchorOrigin: {
  horizontal: "center" | "left" | "right";
  vertical: "bottom" | "top";
} = {
  vertical: "bottom",
  horizontal: "right",
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  const AppContext = useContext(Context);
  const messages = AppContext.state.message;
  const [displayCartIcon, setDisplayCartIcon] = useState<boolean>(false);

  const location = useLocation();
  const pagesWithLeftMenu = [
    "/",
    "/products",
    "/seller/logistic/routes",
    "/seller/logistic/jobs",
  ];

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

  const displayLeftMenuButton = pagesWithLeftMenu.includes(location.pathname);
  const [tabsList, setTabsList] = useState<{ name: string; link: string }[]>(
    []
  );

  const getTabs = useCallback((user: any, pathname: string) => {
    if (!user?.id) {
      setTabsList([]);
    }

    if (pathname.startsWith("/profile")) {
      setTabsList(tabs.profile);
    } else if (pathname.startsWith("/history")) {
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
    getTabs(AppContext.state.user, location.pathname);
  }, [AppContext.state.user, location.pathname, getTabs]);

  const closeMessage = useCallback(() => {
    AppContext.dispatch({ type: "removeMessage" });
  }, []);

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
  }, [location.pathname, openLeftDrawer]);

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
      <Snackbar
        open={messages.open || AppContext.state.message.open}
        autoHideDuration={6000}
        onClose={closeMessage}
        message={messages.message || AppContext.state.message.message}
        anchorOrigin={snackbarAnchorOrigin}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={closeMessage}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Layout;
