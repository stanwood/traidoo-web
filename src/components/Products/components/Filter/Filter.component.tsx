import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import menuItems from "./menuItems";
import useProductFilterStyles from "./styles";

const FilterMenu = ({ onFilterChange, selected }: any) => {
  const classes = useProductFilterStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onFilterChange(event.target.value as string);
  };

  return (
    <Select
      value={selected || "all"}
      onChange={handleChange}
      classes={{ select: classes.select }}
      disableUnderline
    >
      {menuItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FilterMenu;
