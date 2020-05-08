import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Product from "../../../core/types/product";
import useStyles from "./styles";

const ProductForm = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  setValue,
  clearError,
  categories,
  containers,
  regions,
  tags,
  defaultValues,
  buttonName,
}: {
  onSubmit: Function;
  handleSubmit: Function;
  register: any;
  errors: any;
  setValue: Function;
  clearError: Function;
  categories: any;
  containers: any;
  regions: any;
  tags: any;
  defaultValues?: Product | undefined;
  buttonName: any;
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const units: Record<string, string> = {
    kg: t("kg"),
    g: t("g"),
    l: t("l"),
    ml: t("ml"),
    piece: t("piece"),
    glass: t("glass"),
    net: t("net"),
    bundle: t("bundle"),
    bottle: t("bottle"),
  };

  const deliveryMapping: Record<string, number> = {
    centralLogistic: 0,
    seller: 1,
    buyer: 2,
  };
  const [delivery, setDelivery] = useState<{ [key: string]: boolean }>({
    centralLogistic: false,
    seller: false,
    buyer: false,
  });
  const vat = [0, 7, 10.7, 19];

  const [selectedVat, setSelectedVat] = useState<number | undefined>(vat[2]);
  const [unitValue, setUnitValue] = useState<string | unknown>(
    Object.keys(units)[0]
  );
  const [image, setImage] = useState<string | undefined>("");
  const [regionsList, setRegionsList] = useState<number[]>([]);

  const vatInputLabel = useRef<HTMLLabelElement>(null);
  const [vatLabelWidth, setVatLabelWidth] = useState(0);

  useEffect(() => {
    setVatLabelWidth(
      vatInputLabel.current ? vatInputLabel.current!.offsetWidth : 0
    );
  }, [selectedVat]);

  useEffect(() => {
    setValue("categoryId", defaultValues?.category.id);
    setValue(
      "vat",
      defaultValues?.vat !== undefined ? defaultValues.vat : selectedVat
    );
    setValue("unit", defaultValues?.unit || unitValue);
    setValue("containerTypeId", defaultValues?.containerType.id);
    setRegionsList(defaultValues?.regions.map((region) => region.id) || []);

    let deliveryOptions: { [key: string]: boolean } = {};
    defaultValues?.deliveryOptions?.map((deliveryOption) => {
      switch (deliveryOption.id) {
        case 0:
          deliveryOptions["centralLogistic"] = true;
          break;
        case 1:
          deliveryOptions["seller"] = true;
          break;
        case 2:
          deliveryOptions["buyer"] = true;
          break;
      }
    });

    setDelivery(deliveryOptions);
    const integers = Object.entries(deliveryOptions)
      .filter((v) => v[1])
      .map((v) => (v[1] ? deliveryMapping[v[0]] : null));
    setValue("deliveryOptionsIds", integers);
  }, [defaultValues]);

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = { ...delivery, [event.target.name]: event.target.checked };
    const integers = Object.entries(value)
      .filter((v) => v[1])
      .map((v) => (v[1] ? deliveryMapping[v[0]] : null));
    setDelivery({ ...delivery, [event.target.name]: event.target.checked });
    clearError("deliveryOptionsIds");
    setValue("deliveryOptionsIds", integers);
  };

  const handleTagsChange = (value: any) => {
    clearError("tags");
    setValue(
      "tags",
      value.map((val: any) => val.id)
    );
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.name);
    let newRegionsList = [];

    if (regionsList.includes(value)) {
      newRegionsList = regionsList.filter(
        (regionId: number) => regionId !== value
      );
    } else {
      newRegionsList = [...regionsList, value];
    }

    setRegionsList(newRegionsList);
    clearError("regions");
    setValue("regions", newRegionsList);
  };

  const handleUnitChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setUnitValue(event.target.value);
    clearError("unit");
    setValue("unit", event.target.value);
  };

  const handleVatChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setSelectedVat(Number(event.target.value));
    clearError("vat");
    setValue("vat", Number(event.target.value));
  };

  const handleImageChange = (event: any) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleCategoryChange = (value: any) => {
    clearError("categoryId");
    setValue("categoryId", value?.id);
  };

  const handleContainerChange = (value: any) => {
    clearError("containerTypeId");
    setValue("containerTypeId", value.id);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {t("general")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label={t("productTitle")}
              name="name"
              inputRef={register}
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : ""}
              defaultValue={defaultValues?.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={categories.sort((a: any, b: any) =>
                a.name > b.name ? 1 : -1
              )}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              onChange={(event: object, value: any, reason: string) =>
                handleCategoryChange(value)
              }
              getOptionLabel={(category: any) => category.name}
              renderOption={(option) => (
                <React.Fragment>{option.name}</React.Fragment>
              )}
              defaultValue={defaultValues?.category}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("category")}
                  variant="outlined"
                  id="categoryId"
                  name="categoryId"
                  required
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={errors.categoryId ? true : false}
                  helperText={
                    errors.categoryId ? errors.categoryId.message : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              required
              fullWidth
              name="description"
              label={t("description")}
              id="description"
              inputRef={register}
              error={errors.description ? true : false}
              helperText={errors.description ? errors.description.message : ""}
              defaultValue={defaultValues?.description}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3} className={classes.imageContainer}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperFullHeight}>
            <Typography variant="h5" className={classes.title}>
              {t("image")}
            </Typography>
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <img
                  src={image || defaultValues?.image}
                  alt=""
                  className={classes.imagePreview}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  className={classes.input}
                  id="image"
                  name="image"
                  inputProps={{ accept: "image/*" }}
                  type="file"
                  inputRef={register}
                  onChange={handleImageChange}
                />
                <label htmlFor="image">
                  <Button
                    variant="outlined"
                    size="large"
                    component="span"
                    fullWidth
                  >
                    {t("addImage")}
                  </Button>
                </label>
                {errors.image && (
                  <p className={classes.error}>{errors.image.message}</p>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperFullHeight}>
            <Typography variant="h5" className={classes.title}>
              {t("properties")}
            </Typography>
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="isOrganic"
                      name="isOrganic"
                      defaultChecked={defaultValues?.isOrganic}
                    />
                  }
                  label={t("organic")}
                  id="isOrganic"
                  name="isOrganic"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="isGrazingAnimal"
                      name="isGrazingAnimal"
                      defaultChecked={defaultValues?.isGrazingAnimal}
                    />
                  }
                  label={t("grasing")}
                  id="isGrazingAnimal"
                  name="isGrazingAnimal"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="isVegan"
                      name="isVegan"
                      defaultChecked={defaultValues?.isVegan}
                    />
                  }
                  label={t("vegan")}
                  id="isVegan"
                  name="isVegan"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="isGlutenFree"
                      name="isGlutenFree"
                      defaultChecked={defaultValues?.isGlutenFree}
                    />
                  }
                  label={t("glutenFree")}
                  id="isGlutenFree"
                  name="isGlutenFree"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="isGmoFree"
                      name="isGmoFree"
                      defaultChecked={defaultValues?.isGmoFree}
                    />
                  }
                  label={t("gmoFree")}
                  id="isGmoFree"
                  name="isGmoFree"
                  inputRef={register}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {t("pricing")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              id="price"
              label={t("price")}
              name="price"
              inputRef={register}
              error={errors.price ? true : false}
              helperText={errors.price ? errors.price.message : ""}
              defaultValue={defaultValues?.price}
              InputProps={{
                endAdornment: (
                  <Select
                    required
                    id="unit"
                    name="unit"
                    value={unitValue || ""}
                    className={classes.endAdornment}
                    onChange={handleUnitChange}
                    defaultValue={defaultValues?.unit}
                  >
                    {Object.entries(units).map(([key, name]) => {
                      return (
                        <MenuItem value={key} key={key}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              required
              error={errors.vat ? true : false}
            >
              <InputLabel ref={vatInputLabel} id="vatLabelId">
                {t("vat")}
              </InputLabel>
              <Select
                labelId="vatLabelId"
                defaultValue={
                  defaultValues?.vat !== undefined
                    ? defaultValues.vat
                    : selectedVat
                }
                id="vat"
                name="vat"
                variant="outlined"
                labelWidth={vatLabelWidth}
                onChange={handleVatChange}
              >
                {vat.map((v: number) => {
                  return (
                    <MenuItem value={v} key={v}>
                      {v}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errors.vat ? errors.vat.message : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="amount"
              type="number"
              label={t("unitsPerLot")}
              name="amount"
              inputRef={register}
              error={errors.amount ? true : false}
              helperText={errors.amount ? errors.amount.message : ""}
              defaultValue={defaultValues?.amount}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {t("delivery")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="containerTypeId"
              fullWidth
              options={containers}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={(container: any) => container.sizeClass}
              onChange={(event: object, value: any, reason: string) =>
                handleContainerChange(value)
              }
              renderOption={(option) => (
                <React.Fragment>
                  <img src={option.image} alt="" />
                  {option.sizeClass}
                </React.Fragment>
              )}
              defaultValue={defaultValues?.containerType}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("containerType")}
                  variant="outlined"
                  id="containerTypeId"
                  name="containerTypeId"
                  required
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  error={errors.containerTypeId ? true : false}
                  helperText={
                    errors.containerTypeId ? errors.containerTypeId.message : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {delivery.seller && (
              <TextField
                variant="outlined"
                required={delivery.seller}
                fullWidth
                id="deliveryCharge"
                type="number"
                label={t("price")}
                name="deliveryCharge"
                inputRef={register}
                error={errors.deliveryCharge ? true : false}
                helperText={
                  errors.deliveryCharge ? errors.deliveryCharge.message : ""
                }
                defaultValue={defaultValues?.deliveryCharge}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={delivery.centralLogistic || false}
                    onChange={handleDeliveryChange}
                    name="centralLogistic"
                  />
                }
                label={t("byCentralLogistic")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={delivery.seller || false}
                    onChange={handleDeliveryChange}
                    name="seller"
                  />
                }
                label={t("bySeller")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={delivery.buyer || false}
                    onChange={handleDeliveryChange}
                    name="buyer"
                  />
                }
                label={t("byBuyer")}
              />
            </FormGroup>
            <FormHelperText className={classes.error}>
              {errors.deliveryOptionsIds
                ? errors.deliveryOptionsIds.message
                : ""}
            </FormHelperText>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {t("availability")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormGroup row>
              {regions.map((region: any) => (
                <FormControlLabel
                  key={region.id}
                  control={
                    <Checkbox
                      checked={
                        regionsList?.find(
                          (regionId: number) => regionId === region.id
                        )
                          ? true
                          : false
                      }
                      onChange={handleRegionChange}
                      name={region.id.toString()}
                    />
                  }
                  label={region.name}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {t("internalOptional")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="sellersProductIdentifier"
              label={t("internalProductId")}
              name="sellersProductIdentifier"
              inputRef={register}
              error={errors.sellersProductIdentifier ? true : false}
              helperText={
                errors.sellersProductIdentifier
                  ? errors.sellersProductIdentifier.message
                  : ""
              }
              defaultValue={defaultValues?.sellersProductIdentifier}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {
              // @ts-ignore
              <Autocomplete
                fullWidth
                multiple
                options={tags.sort((a: any, b: any) =>
                  a.name > b.name ? 1 : -1
                )}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                onChange={(event: object, value: any, reason: string) =>
                  handleTagsChange(value)
                }
                getOptionLabel={(tag: any) => tag.name}
                renderOption={(option: any) => (
                  <React.Fragment>{option.name}</React.Fragment>
                )}
                defaultValue={defaultValues?.tags}
                getOptionSelected={(option: any, value: any) =>
                  value.id === option.id
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("searchTerms")}
                    variant="outlined"
                    id="tags"
                    name="tags"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    error={errors.tags ? true : false}
                    helperText={errors.tags ? errors.tags.message : ""}
                  />
                )}
              />
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="ean8"
              label={t("ean8")}
              name="ean8"
              inputRef={register}
              error={errors.ean8 ? true : false}
              helperText={errors.ean8 ? errors.ean8.message : ""}
              defaultValue={defaultValues?.ean8}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="ean13"
              label={t("ean13")}
              name="ean13"
              inputRef={register}
              error={errors.ean13 ? true : false}
              helperText={errors.ean13 ? errors.ean13.message : ""}
              defaultValue={defaultValues?.ean13}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container justify="flex-end" className={classes.actions}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editButton}
          >
            {buttonName}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
