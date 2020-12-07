import DateFnsUtils from "@date-io/date-fns";
import { yupResolver } from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format, parse } from "date-fns";
import startOfTomorrow from "date-fns/startOfTomorrow";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import localeMap from "../../core/localeMap";
import i18n from "../../i18n";
import { AddProductItemsContext } from "./context";
import { ProductItemFormData } from "./interfaces";
import addProductItemsValidationSchema from "./validation";

const useAddItemDialogStyles = makeStyles((theme) => ({
  content: {
    overflowY: "hidden",
  },
  actions: {
    backgroundColor: theme.palette.background.default,
  },
}));

interface AddItemDialogProps {
  onSuccess: () => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = (
  props: AddItemDialogProps
) => {
  const classes = useAddItemDialogStyles();
  const { t } = useTranslation();
  const { onSuccess } = props;
  const { dialog, close, addItem, editItem } = useContext(
    AddProductItemsContext
  );

  const dialogDate = dialog.date
    ? parse(dialog.date, "yyyy-MM-dd", new Date())
    : startOfTomorrow();

  const {
    clearErrors,
    errors,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(addProductItemsValidationSchema),
  });

  const [
    selectedLatestDeliveryDate,
    setSelectedLatestDeliveryDate,
  ] = React.useState<Date | null>(dialogDate);

  const handlelatestDeliveryDateChange = (date: Date | null) => {
    setSelectedLatestDeliveryDate(date);
    setValue("latestDeliveryDate", date);
    clearErrors("latestDeliveryDate");
  };

  useEffect(() => {
    register({ name: "latestDeliveryDate" });
    setValue("latestDeliveryDate", dialogDate);
    setSelectedLatestDeliveryDate(dialogDate);
  }, [dialogDate, register, setValue]);

  const handleError = (error: any) => {
    const errorResponse = error.response;

    if (errorResponse?.data?.nonFieldErrors[0].code === "unique") {
      setError("latestDeliveryDate", {
        type: "incorrectData",
        message: t("productItemExistError"),
      });
    }
  };

  const onSubmit = (formData: ProductItemFormData) => {
    // @ts-ignore
    formData.latestDeliveryDate = format(
      // @ts-ignore
      formData.latestDeliveryDate,
      "yyyy-MM-dd"
    );

    if (dialog.itemId) {
      editItem(
        // @ts-ignore
        { productId: dialog.productId, itemId: dialog.itemId, ...formData },
        {
          onSuccess: () => {
            onSuccess();
            close();
          },
          onError: (err: any) => handleError(err),
        }
      );
    } else {
      addItem(
        // @ts-ignore
        { productId: dialog.productId, ...formData },
        {
          onSuccess: () => {
            onSuccess();
            close();
          },
          onError: (err: any) => handleError(err),
        }
      );
    }
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={close}
      aria-labelledby="add-item-dialog-title"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle id="add-item-dialog-title">{t("addItem")}</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                type="number"
                inputProps={{ min: 1 }}
                required
                fullWidth
                defaultValue={dialog.itemsNumber}
                name="quantity"
                label={t("quantity")}
                id="quantity"
                inputRef={register}
                error={errors.quantity ? true : false}
                helperText={errors.quantity ? errors.quantity.message : ""}
                data-testid="input-product-item-quantity"
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap[i18n.language]}
              >
                <DatePicker
                  disablePast={true}
                  minDate={startOfTomorrow()}
                  autoOk={true}
                  variant="inline"
                  margin="normal"
                  format="dd.MM.yyyy"
                  id="latestDeliveryDate"
                  name="latestDeliveryDate"
                  label={t("bestBefore")}
                  value={selectedLatestDeliveryDate}
                  onChange={handlelatestDeliveryDateChange}
                  fullWidth
                  required
                  inputVariant="outlined"
                  error={errors.latestDeliveryDate ? true : false}
                  helperText={
                    errors.latestDeliveryDate
                      ? errors.latestDeliveryDate.message
                      : ""
                  }
                  data-testid="input-product-item-latest-delivery-date"
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            onClick={close}
            color="primary"
            data-testid="product-item-cancel-button"
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            data-testid="product-item-add-button"
          >
            {t("add")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddItemDialog;
