import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import React from "react";
import menuItems from "./menuItems";

const FilterMenu = ({ onFilterChange }: any) => {
  // TODO: add type
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    const { filterValue } = event.currentTarget.dataset;
    onFilterChange(filterValue);
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Filter products">
        <IconButton
          aria-label="filter list"
          aria-controls="filter-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem
            onClick={handleClose}
            data-filter-value={item.value}
            key={item.value}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FilterMenu;
