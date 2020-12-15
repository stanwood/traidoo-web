import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import { Img } from "react-image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useGridListImageItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    tile: { maxWidth: "100%" },
    image: {
      height: "auto",
      maxHeight: "78px",
      maxWidth: "100%",
    },
  })
);

interface GridListImageItemProps {
  imageItem: string;
}

const GridListImageItem = (props: GridListImageItemProps) => {
  const classes = useGridListImageItemStyles();
  const [imageUrl, numberOfColumns] = props.imageItem.split(";");

  return (
    <GridListTile
      key={imageUrl}
      cols={Number(numberOfColumns)}
      className={classes.tile}
    >
      <Img src={imageUrl} className={classes.image} />
    </GridListTile>
  );
};

export default GridListImageItem;
