import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TreeItem from "@material-ui/lab/TreeItem";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import { CategoryIcon } from "../CategoryIcon";
import { useTreeItemStyles } from "./Categories.styles";

const CategoryItems = ({ data }: any) => {
  const classes = useTreeItemStyles();
  const history = useHistory();

  const [query] = useQueryParams({
    category: StringParam,
  });

  const onCategorySelect = (categoryId: number) => {
    // TODO: Move to category page component
    // TODO: use setQuery from useQueryParams?
    history.push(`/products?category=${categoryId}`);
  };

  const renderLabel = (
    item: any // TODO: add type
  ) => (
    <Box
      display="flex"
      className={classes.labelRoot}
      onClick={(event: React.MouseEvent<any>) => {
        onCategorySelect(item.id);
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <CategoryIcon iconNumber={item.icon} className={classes.labelIcon} />
      <Typography variant="body2" className={classes.labelText}>
        {item.name}
      </Typography>
    </Box>
  );

  return (
    <div>
      {data.map((item: any) => {
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
            {item.children && <CategoryItems data={item.children} />}
          </TreeItem>
        );
      })}
    </div>
  );
};

export default CategoryItems;
