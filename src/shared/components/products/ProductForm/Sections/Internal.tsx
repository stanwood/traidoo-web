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
import { Tag } from "../../../../../api/queries/tags";
import ControlledTextInput from "../Fields/ControlledTextField";
import useStyles from "../styles";

export interface InternalProps {
  tags: Tag[];
}

const Internal: React.FC<InternalProps> = (props: InternalProps) => {
  const { tags } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { errors, control } = useFormContext();

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
        {t("internalOptional")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ControlledTextInput
            name="sellersProductIdentifier"
            label={t("internalProductId")}
            required={false}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            render={(props) => (
              <Autocomplete
                {...props}
                fullWidth
                multiple
                autoHighlight
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                options={tags}
                classes={autoCompleteClasses}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    {...params}
                    label={t("searchTerms")}
                    variant="outlined"
                    required
                    inputProps={inputProps(params)}
                    error={errors.tags ? true : false}
                    helperText={errors.tags ? errors.tags.message : ""}
                  />
                )}
                onChange={(_, data) => props.onChange(data)}
              />
            )}
            name="tags"
            control={control}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ControlledTextInput name="ean8" label={t("ean8")} required={false} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ControlledTextInput
            name="ean13"
            label={t("ean13")}
            required={false}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Internal;
