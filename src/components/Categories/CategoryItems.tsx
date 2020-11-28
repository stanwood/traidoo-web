import TreeItem from "@material-ui/lab/TreeItem";
import clsx from "clsx";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import { DrawerContext } from "../../contexts/DrawerContext/context";
import { CategoryItemsProps } from "./interfaces";
import RenderLabel from "./Label";
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

  return (
    <div>
      {categories?.map((item) => {
        return (
          <TreeItem
            label={
              <RenderLabel
                item={item}
                onClick={(event) =>
                  item.ordering === -1
                    ? history.push("/")
                    : onCategoryClick(event, item.id)
                }
              />
            }
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
