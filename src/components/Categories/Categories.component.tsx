import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Skeleton from "@material-ui/lab/Skeleton";
import TreeView from "@material-ui/lab/TreeView";
import React, { useContext, useEffect } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { Context } from "../../core/context";
import { useStyles } from "./Categories.styles";
import CategoryItems from "./CategoryItems.component";
import { findCategoryTreeById } from "./uitls";

export default function Categories() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const [query] = useQueryParams({
    category: StringParam,
  });

  const context = useContext(Context);
  const categories = context.state.categories;

  const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
    setExpanded(nodes);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setExpanded(
        findCategoryTreeById(
          categories,
          query.category ? query.category : undefined
        )
      );
    }
  }, [categories, query.category]);

  if (categories.length < 1) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      <CategoryItems data={categories} />
    </TreeView>
  );
}
