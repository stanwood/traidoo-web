import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ControlledTextInput from "../Fields/ControlledTextField";
import useStyles from "../styles";
import AutocompleteVirtualized from "../Fields/AutocompleteVirtualized";
import { Tree } from "array-to-tree";
import { Category } from "../../../../../core/interfaces/categories";

interface GeneralProps {
  categories: Tree<Category>[];
}

const General = (props: GeneralProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, errors } = useFormContext();
  const { categories } = props;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        {t("general")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ControlledTextInput name="name" label={t("productTitle")} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AutocompleteVirtualized
            categories={categories}
            errors={errors}
            control={control}
          />
        </Grid>

        <Grid item xs={12}>
          <ControlledTextInput
            name="description"
            label={t("description")}
            multiline={true}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default General;
