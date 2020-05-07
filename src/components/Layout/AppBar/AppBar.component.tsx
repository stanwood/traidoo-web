import {
  Badge,
  Divider,
  Hidden,
  LinearProgress,
  Tab,
  Tabs,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsFetching } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import Config from "../../../config";
import { Context } from "../../../core/context";
import Props, { LinkTabProps } from "./AppBar.interfaces";
import useStyles from "./AppBar.styles";
import {
  rightMenuAnonymousItems,
  rightMenuBuyerItems,
  rightMenuSellerItems,
} from "./menuItems";

const CustomAppBar = ({
  handleDrawerLeft,
  handleDrawerRight,
  hideCategories = false,
  tabs = [],
}: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const showLoadingIndicator = useIsFetching();
  const { t } = useTranslation();

  const context = useContext(Context);
  const user = context.state.user;

  const inputRef = React.useRef(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const [cartItemsQuantity, setCartItemsQuantity] = useState<number | null>(
    null
  );

  useEffect(() => {
    setCartItemsQuantity(Object.keys(context.state.cart.items).length);
  }, [context.state.cart.items]);

  const keyPressed = (event: any) => {
    if (event.key === "Enter") {
      history.push(`/products?search=${event.target.value}`);
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const a11yProps = (index: any) => {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`,
    };
  };

  const LinkTab = (props: LinkTabProps) => {
    return <Tab component={Link} to={props.link} {...props} />;
  };

  const renderRightMenu = () => {
    let items: any = [];

    if (user?.groups?.includes("seller")) {
      items = rightMenuSellerItems;
    } else if (user?.groups?.includes("buyer")) {
      items = rightMenuBuyerItems;
    } else {
      items = rightMenuAnonymousItems;
    }

    return (
      <Menu
        id="simple-menu"
        anchorEl={userMenuElement}
        keepMounted
        open={Boolean(userMenuElement)}
        onClose={handleUserMenuClose}
      >
        {items.map((itemsGroup: any, index: number, elements: any) => {
          const divider = elements[index + 1] ? <Divider /> : null;

          return (
            <div key={index}>
              {itemsGroup.map((item: any) => {
                return (
                  <MenuItem
                    onClick={handleUserMenuClose}
                    component={Link}
                    to={item.path}
                    key={item.path}
                  >
                    {item.name}
                  </MenuItem>
                );
              })}

              {divider}
            </div>
          );
        })}
      </Menu>
    );
  };

  const [
    userMenuElement,
    setUserMenuElement,
  ] = React.useState<null | HTMLElement>(null);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuElement(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuElement(null);
  };

  const findTabIndex = (currentPath: string) => {
    if (currentPath === "/") {
      return 0;
    }

    const index = tabs.findIndex(
      (item) => item.link !== "/" && currentPath.startsWith(item.link)
    );

    return index;
  };

  const renderTabs = () => {
    if (tabs.length > 0) {
      return (
        <Tabs
          variant="fullWidth"
          value={findTabIndex(currentPath)}
          aria-label="nav tabs"
        >
          {tabs.map(({ name, link }, index) => (
            <LinkTab
              label={name}
              link={link}
              key={link}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      );
    }

    return null;
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {!hideCategories && (
            <Hidden xlUp implementation="css">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open left drawer"
                onClick={handleDrawerLeft}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          )}
          <Typography
            className={classes.title}
            color="textPrimary"
            variant="h6"
            noWrap
            component={Link}
            to="/"
          >
            {Config.clientName}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={t("search")}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              inputRef={inputRef}
              onKeyPress={keyPressed}
            />
          </div>
          {user?.id && (
            <IconButton
              aria-label="shopping cart"
              edge="end"
              color="inherit"
              aria-controls="simple-menu"
              onClick={handleDrawerRight}
              className={classes.cartButton}
            >
              <Badge badgeContent={cartItemsQuantity} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          )}
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleUserMenuClick}
          >
            <AccountCircle />
          </IconButton>
          {renderRightMenu()}
        </Toolbar>
        {renderTabs()}
        {showLoadingIndicator > 0 && <LinearProgress />}
      </AppBar>
    </div>
  );
};

export default CustomAppBar;