import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Skeleton from "@material-ui/lab/Skeleton";
import TreeView from "@material-ui/lab/TreeView";
import React, { useContext, useEffect } from "react";
import { Img } from "react-image";
import { StringParam, useQueryParams } from "use-query-params";
import Config from "../../config";
import { CategoriesContext } from "../../contexts/CategoryContext/context";
import CategoryItems from "./CategoryItems";
import { useCategoriesStyles } from "./styles";
import { findCategoryTreeById } from "./uitls";

const Categories = () => {
  const classes = useCategoriesStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { categoriesWithMainPageLink } = useContext(CategoriesContext);

  const [query] = useQueryParams({
    category: StringParam,
  });

  const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
    setExpanded(nodes);
  };

  useEffect(() => {
    if (
      categoriesWithMainPageLink &&
      categoriesWithMainPageLink.length > 0 &&
      query.category
    ) {
      setExpanded(
        findCategoryTreeById(
          categoriesWithMainPageLink,
          query.category ? query.category : undefined
        )
      );
    }
  }, [categoriesWithMainPageLink, query.category]);

  if (categoriesWithMainPageLink && categoriesWithMainPageLink.length < 1) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <Grid container direction="row" className={classes.root}>
      <TreeView
        defaultCollapseIcon={<ArrowDropUpIcon />}
        defaultExpandIcon={<ArrowDropDownIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        expanded={expanded}
        onNodeToggle={handleChange}
        className={classes.treeView}
      >
        <CategoryItems categories={categoriesWithMainPageLink} />
      </TreeView>
      <Box className={classes.logos}>
        {Config.sponsorLogo &&
          Config.sponsorLogo
            .split(",")
            .map((logo) => <Img src={logo} className={classes.image} />)}
      </Box>
    </Grid>
  );
};

export default Categories;
