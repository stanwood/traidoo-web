import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Tree } from "array-to-tree";
import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import { Category } from "../../core/interfaces/categories";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ReactComponent as ProductsListIcon } from "../../images/categories/productsList.svg";

const useRenderLabelStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
      width: "24px",
      height: "24px",
      opacity: 0.3,
    },
    labelText: {
      flexGrow: 1,
    },
  })
);

interface RenderLabelProps {
  item: Tree<Category>;
  onClick: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => void;
}

const RenderLabel = (props: RenderLabelProps) => {
  const { item, onClick } = props;
  const classes = useRenderLabelStyles();

  return (
    <Box
      display="flex"
      className={classes.labelRoot}
      onClick={(event) => onClick(event, item.id)}
    >
      {item.ordering === -1 ? (
        <SvgIcon
          component={ProductsListIcon}
          viewBox="0 0 50 50"
          className={classes.labelIcon}
        />
      ) : (
        <img
          src={item.icon.iconUrl}
          className={classes.labelIcon}
          alt={item.name}
        />
      )}
      <Typography variant="h6" className={classes.labelText}>
        {item.name}
      </Typography>
    </Box>
  );
};

export default RenderLabel;
