import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import startOfTomorrow from "date-fns/startOfTomorrow";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AddItemDialogProps } from "./interfaces";
import { useAddItemDialogStyles } from "./styles";

const AddItemDialog = (props: AddItemDialogProps) => {
  const { t } = useTranslation();
  const {
    onClose,
    onSubmit,
    open,
    register,
    setValue,
    errors,
    clearError,
    handleSubmit,
  } = props;
  const classes = useAddItemDialogStyles();

  const [
    selectedLatestDeliveryDate,
    setSelectedLatestDeliveryDate,
  ] = React.useState<Date | null>(startOfTomorrow());

  const handlelatestDeliveryDateChange = (date: Date | null) => {
    setSelectedLatestDeliveryDate(date);
    setValue("latestDeliveryDate", date);
    clearError("latestDeliveryDate");
  };

  useEffect(() => {
    register({ name: "latestDeliveryDate" });
    setValue("latestDeliveryDate", startOfTomorrow());
  }, [register, setValue]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              onClick={onClose}
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
    </div>
  );
};

export default AddItemDialog;
