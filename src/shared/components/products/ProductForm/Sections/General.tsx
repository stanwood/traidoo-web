import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import React, { useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Category } from "../../../../../core/interfaces/categories";
import ControlledTextInput from "../Fields/ControlledTextField";
import useStyles from "../styles";

interface GeneralProps {
  categories: Category[];
}

const General: React.FC<GeneralProps> = (props: GeneralProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, errors } = useFormContext();
  const { categories } = props;

  const autoCompleteClasses = useMemo(
    () => ({
      option: classes.option,
    }),
    [classes.option]
  );

  const inputProps = useCallback((params: AutocompleteRenderInputParams) => {
    return {
      ...params.inputProps,
      autoComplete: "new-password",
    };
  }, []);

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
          <Controller
            name="category"
            control={control}
            onChange={useCallback(([, data]) => data, [])}
            as={
              <Autocomplete
                fullWidth
                options={categories}
                classes={autoCompleteClasses}
                getOptionLabel={useCallback(
                  (category: Category) => category.name,
                  []
                )}
                renderInput={useCallback(
                  (params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      label={t("category")}
                      variant="outlined"
                      required
                      inputProps={inputProps(params)}
                      error={errors.category ? true : false}
                      helperText={
                        errors.category ? errors.category.message : ""
                      }
                    />
                  ),
                  [t, errors.category, inputProps]
                )}
              />
            }
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
