import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useStyles from "../styles";

const imageInputProps = { accept: "image/*" };

interface ImageProps {
  productImage: string | undefined;
}

const Image: React.FC<ImageProps> = (props: ImageProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { productImage } = props;
  const { register, errors } = useFormContext();

  const [image, setImage] = useState<string>("");
  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
    },
    []
  );

  return (
    <Paper className={classes.paperFullHeight}>
      <Typography variant="h5" className={classes.title}>
        {t("image")}
      </Typography>
      <Grid container item spacing={3}>
        <Grid item xs={12} sm={6}>
          <img
            src={image || productImage}
            className={classes.imagePreview}
            alt="preview"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            className={classes.input}
            id="image"
            name="image"
            inputProps={imageInputProps}
            type="file"
            inputRef={register}
            onChange={handleImageChange}
          />
          <label htmlFor="image">
            <Button variant="outlined" size="large" component="span" fullWidth>
              {t("addImage")}
            </Button>
          </label>
          {errors.image && (
            <p className={classes.error}>{errors.image.message}</p>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Image;
