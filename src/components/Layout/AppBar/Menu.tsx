import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext/context";
import { getRightMenuItems, TraidooMenuItem } from "./menuItems";

const useTraidooMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      zIndex: `${theme.zIndex.modal + 1} !important` as any,
    },
  })
);

interface TraidooMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const TraidooMenu: React.FC<TraidooMenuProps> = (props: TraidooMenuProps) => {
  const { anchorEl, handleClose } = props;
  const { user } = useContext(UserContext);
  const classes = useTraidooMenuStyles();

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={classes.menu}
    >
      {getRightMenuItems(user).map(
        (
          itemsGroup: TraidooMenuItem[],
          index: number,
          elements: TraidooMenuItem[][]
        ) => {
          const divider = elements[index + 1] ? <Divider /> : null;

          return (
            <div key={index}>
              {itemsGroup.map((item: TraidooMenuItem) => (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={item.path}
                  key={item.path}
                >
                  {item.name}
                </MenuItem>
              ))}

              {divider}
            </div>
          );
        }
      )}
    </Menu>
  );
};

export default TraidooMenu;
