import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { productProperties } from "../../constants";
import useStyles from "../styles";

const Properties: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Paper className={classes.paperFullHeight}>
      <Typography variant="h5" className={classes.title}>
        {t("properties")}
      </Typography>
      <Grid container item spacing={3}>
        {productProperties.map((item) => (
          <Grid item xs={12} sm={6} key={item.name}>
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  as={Checkbox}
                  color="primary"
                  name={item.name}
                />
              }
              label={item.label}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Properties;
