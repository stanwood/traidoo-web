import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme } from "@material-ui/core/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import arrayToTree from "array-to-tree";
import { Category } from "../../../../../core/interfaces/categories";
import { useTranslation } from "react-i18next";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";

const LISTBOX_PADDING = 8;

const convert = (tree: arrayToTree.Tree<Category>[], categoryIndex: number) => {
  return tree.reduce(
    (
      acc: { category: arrayToTree.Tree<Category>; index: number }[],
      category
    ) => {
      acc.push({ category: category, index: categoryIndex });
      if (category.children && category.children.length > 0)
        acc = acc.concat(convert(category.children, categoryIndex + 1));
      return acc;
    },
    []
  );
};

const renderRow = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef<HTMLDivElement>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: React.ReactNode) => {
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listbox: {
      boxSizing: "border-box",
      "& ul": {
        padding: 0,
        margin: 0,
        "& li": {
          "&[aria-disabled='true']": {
            backgroundColor: theme.palette.grey[200],
            fontWeight: theme.typography.fontWeightBold,
            opacity: "revert",
          },
        },
      },
    },
    image: {
      height: "1em",
      width: "auto",
      marginRight: theme.spacing(1),
    },
  })
);

interface VirtualizeProps {
  categories: arrayToTree.Tree<Category>[] | undefined;
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
}

const AutocompleteVirtualized = (props: VirtualizeProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { categories, control, errors } = props;

  const inputProps = React.useCallback(
    (params: AutocompleteRenderInputParams) => {
      return {
        ...params.inputProps,
        autoComplete: "new-password",
      };
    },
    []
  );

  return (
    <Controller
      render={(props) => (
        <Autocomplete
          {...props}
          disableListWrap
          classes={classes}
          ListboxComponent={
            ListboxComponent as React.ComponentType<
              React.HTMLAttributes<HTMLElement>
            >
          }
          getOptionDisabled={(option) => !!option.category.children}
          options={categories ? convert(categories, 0) : []}
          getOptionLabel={(option) =>
            option.hasOwnProperty("index") ? option.category.name : option.name
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("category")}
              variant="outlined"
              required
              fullWidth
              inputProps={inputProps(params)}
              error={errors.category ? true : false}
              helperText={errors.category ? errors.category.message : ""}
            />
          )}
          renderOption={(option) => (
            <React.Fragment>
              <img
                className={classes.image}
                src={option.category.icon.iconUrl}
                style={{ paddingLeft: option.index * 25 }}
              />
              <span>{option.category.name}</span>
            </React.Fragment>
          )}
          onChange={(_, data) => props.onChange(data.category)}
        />
      )}
      name="category"
      control={control}
    />
  );
};

export default AutocompleteVirtualized;
