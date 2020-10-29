import Grid from "@material-ui/core/Grid";
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

const Categories: React.FC = () => {
  const classes = useCategoriesStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { categories } = useContext(CategoriesContext);

  const [query] = useQueryParams({
    category: StringParam,
  });

  const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
    setExpanded(nodes);
  };

  useEffect(() => {
    if (categories && categories.length > 0 && query.category) {
      setExpanded(
        findCategoryTreeById(
          categories,
          query.category ? query.category : undefined
        )
      );
    }
  }, [categories, query.category]);

  if (categories && categories.length < 1) {
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
        <CategoryItems categories={categories} />
      </TreeView>
      {Config.sponsorLogo && (
        <Img src={Config.sponsorLogo} className={classes.image} />
      )}
    </Grid>
  );
};

export default Categories;
