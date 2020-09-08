import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useIsFetching } from "react-query";
import { Link } from "react-router-dom";
import Config from "../../../config";
import { UserContext } from "../../../contexts/UserContext/context";
import history from "../../../core/history";
import BackButton from "./BackButton";
import CartButton from "./CartButton";
import DrawerButton from "./DrawerButton";
import TraidooMenu from "./Menu";
import TraidooAppBarTabs, { TabProps } from "./Tabs";

const useAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: `${theme.zIndex.modal + 1} !important` as any,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textDecoration: "none",
    },
    divider: {
      flexGrow: 1,
    },
    search: {
      position: "relative",
      marginRight: theme.spacing(5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

interface TraidooAppBarProps {
  cartButton: boolean;
  hamburgerButton?: boolean;
  backButton?: boolean;
  hamburgerButtonResponsive?: boolean;
  tabsItems?: TabProps[];
  activeTab?: number;
}

const TraidooAppBar: React.FC<TraidooAppBarProps> = (
  props: TraidooAppBarProps
) => {
  const classes = useAppBarStyles();
  const { t } = useTranslation();
  const {
    cartButton,
    hamburgerButton = false,
    backButton = false,
    tabsItems,
    activeTab,
    hamburgerButtonResponsive = true,
  } = props;
  const showLoadingIndicator = useIsFetching();
  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const keyPressed = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      history.push(`/products?search=${target.value}`);
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {hamburgerButton && (
          <DrawerButton
            styleName={classes.menuButton}
            responsive={hamburgerButtonResponsive}
          />
        )}

        {backButton && <BackButton styleName={classes.menuButton} />}

        <Typography
          color="textPrimary"
          variant="h6"
          noWrap
          className={classes.title}
          component={Link}
          to="/"
        >
          <Hidden smDown implementation="css">
            {Config.clientName}
          </Hidden>
        </Typography>
        <Box className={classes.divider} />
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
            onKeyPress={keyPressed}
          />
        </div>
        {cartButton && user.id && <CartButton styleName={classes.menuButton} />}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <TraidooMenu anchorEl={anchorEl} handleClose={handleClose} />
      </Toolbar>
      {tabsItems && activeTab !== undefined && activeTab >= 0 && (
        <TraidooAppBarTabs tabs={tabsItems} activeTab={activeTab} />
      )}
      {showLoadingIndicator > 0 && <LinearProgress />}
    </AppBar>
  );
};

export default TraidooAppBar;
