import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Context } from "../../core/context";
import CustomAppBar from "./AppBar";
import DrawerLeft from "./DrawerLeft";
import DrawerRight from "./DrawerRight";
import Props from "./Layout.interfaces";
import { useStyles } from "./Layout.styles";

const Layout = ({ children }: Props) => {
  const classes = useStyles();
  const AppContext = useContext(Context);
  const messages = AppContext.state.message;
  const { t } = useTranslation();

  const location = useLocation();
  const pagesWithCategories = ["/", "/products"];
  const hideCategories = !pagesWithCategories.includes(location.pathname);
  const [tabsList, setTabsList] = useState<{ name: string; link: string }[]>(
    []
  );

  useEffect(() => {
    const tabs: { [key: string]: { name: string; link: string }[] } = {
      profile: [
        {
          name: t("personal"),
          link: "/profile/personal",
        },
        {
          name: t("company"),
          link: "/profile/company",
        },
        {
          name: t("documents"),
          link: "/profile/documents",
        },
      ],
      seller: [
        {
          name: t("buy"),
          link: "/",
        },
        {
          name: t("sell"),
          link: "/seller/products",
        },
        {
          name: t("logistics"),
          link: "/seller/logistics",
        },
      ],
    };

    const getTabs = (user: any, pathname: string) => {
      if (!user?.id) {
        setTabsList([]);
      }

      if (pathname.startsWith("/profile")) {
        setTabsList(tabs.profile);
      } else if (
        user?.groups?.includes("seller") &&
        !pathname.startsWith("/profile")
      ) {
        setTabsList(tabs.seller);
      } else {
        setTabsList([]);
      }
    };

    getTabs(AppContext.state.user, location.pathname);
  }, [AppContext.state.user, location.pathname, t]);

  const closeMessage = () => {
    AppContext.dispatch({ type: "removeMessage" });
  };

  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const [openRightDrawer, setOpenRightDrawer] = React.useState(false);

  useEffect(() => {
    setOpenRightDrawer(false);
  }, []);

  const handleDrawerLeft = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };

  const handleDrawerRight = () => {
    setOpenRightDrawer(!openRightDrawer);
  };

  return (
    <div>
      <CustomAppBar
        handleDrawerLeft={handleDrawerLeft}
        handleDrawerRight={handleDrawerRight}
        hideCategories={hideCategories}
        tabs={tabsList}
      />
      {!hideCategories && (
        <DrawerLeft
          open={openLeftDrawer}
          toolbarClassName={
            tabsList.length > 0
              ? `${classes.toolbar} ${classes.toolbarWithTabs}`
              : classes.toolbar
          }
        />
      )}
      <main
        className={`${classes.content} ${
          hideCategories ? "" : classes.contentPadding
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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
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
