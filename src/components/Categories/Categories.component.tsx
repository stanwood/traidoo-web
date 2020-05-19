import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Skeleton from "@material-ui/lab/Skeleton";
import TreeView from "@material-ui/lab/TreeView";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { StringParam, useQueryParams } from "use-query-params";
import { getCategoriesRequest } from "../../api/queries/categories";
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

  const { data: categories, status } = useQuery(
    ["/categories", false],
    getCategoriesRequest,
    {
      onSuccess: (data: any) => {
        context.dispatch({ type: "categories", payload: data });
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
    setExpanded(nodes);
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      setExpanded(
        findCategoryTreeById(
          categories,
          query.category ? query.category : undefined
        )
      );
    }
  }, [categories, query.category]);

  if (status === "loading") {
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
