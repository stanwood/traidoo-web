import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TreeItem from "@material-ui/lab/TreeItem";
import { Tree } from "array-to-tree";
import clsx from "clsx";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import { DrawerContext } from "../../contexts/DrawerContext/context";
import { Category } from "../../core/interfaces/categories";
import { CategoryItemsProps } from "./interfaces";
import { useCategoriesTreeItemStyles } from "./styles";

const CategoryItems: React.FC<CategoryItemsProps> = (
  props: CategoryItemsProps
) => {
  const classes = useCategoriesTreeItemStyles();
  const history = useHistory();
  const { toggleLeftDrawer } = useContext(DrawerContext);
  const { categories } = props;

  const [query] = useQueryParams({
    category: StringParam,
  });

  const onCategorySelect = (categoryId: number) => {
    // TODO: Move to category page component
    // TODO: use setQuery from useQueryParams?
    history.push(`/products?category=${categoryId}`);
  };

  const onCategoryClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    categoryId: number
  ) => {
    onCategorySelect(categoryId);
    toggleLeftDrawer();
    event.stopPropagation();
    event.preventDefault();
  };

  const renderLabel = (item: Tree<Category>) => (
    <Box
      display="flex"
      className={classes.labelRoot}
      onClick={(event) => onCategoryClick(event, item.id)}
    >
      <img
        src={item.icon.iconUrl}
        className={classes.labelIcon}
        alt={item.name}
      />
      <Typography variant="h6" className={classes.labelText}>
        {item.name}
      </Typography>
    </Box>
  );

  return (
    <div>
      {categories?.map((item) => {
        return (
          <TreeItem
            label={renderLabel(item)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                onCategorySelect(item.id);
                event.stopPropagation();
              }
            }}
            nodeId={item.id.toString()}
            key={item.id}
            classes={{
              root: classes.root,
              content: clsx(classes.content, {
                [classes.selected]: item.id.toString() === query.category,
              }),
              group: classes.group,
              label: classes.label,
            }}
          >
            {item.children && <CategoryItems categories={item.children} />}
          </TreeItem>
        );
      })}
    </div>
  );
};

export default CategoryItems;
