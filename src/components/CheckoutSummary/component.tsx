import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CheckoutType } from "../../core/types/checkout";
import useStyles from "./styles";

const CheckoutSummary: React.FC<{
  checkout: CheckoutType | undefined;
  summary: { name: string; value: number }[];
  isProceedDisabled: Function;
  onSubmit: Function;
}> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container component={Paper} maxWidth="md" disableGutters>
      <Typography variant="h4" component="h1" className={classes.header}>
        {t("reviewYourOrder")}
      </Typography>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{t("products")}</TableCell>
              <TableCell align="right">{t("amount")}</TableCell>
              <TableCell align="right">{t("price")}</TableCell>
              <TableCell align="right">{t("itemSize")}</TableCell>
              <TableCell align="right">{t("total")}</TableCell>
              <TableCell align="right">{t("vat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.checkout?.items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.product.name}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {item.product.price.toFixed(2)}€ / {item.product.unit}
                </TableCell>
                <TableCell align="right">
                  {item.product.amount} {item.product.unit}
                </TableCell>
                <TableCell align="right">{item.priceNet.toFixed(2)}€</TableCell>
                <TableCell align="right">{item.product.vat}%</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                {t("deposit")}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {props.checkout?.deposit.map((item: any) => (
              <TableRow key={item.sizeClass}>
                <TableCell component="th" scope="row">
                  {item.sizeClass}
                </TableCell>
                <TableCell align="right">{item.count}</TableCell>
                <TableCell align="right">{item.depositPerUnit}</TableCell>
                <TableCell align="right">{item.unit}</TableCell>
                <TableCell align="right">
                  {item.depositTotal.toFixed(2)}€
                </TableCell>
                <TableCell align="right">{item.vat}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        spacing={2}
        justify="flex-end"
        className={classes.summary}
      >
        <Grid item xs={12} md={6}>
          <Table size="small" aria-label="summary">
            <TableBody>
              {props.summary.map((item) => (
                <TableRow key={item.name}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.value.toFixed(2)}€</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid container xs={12} className={classes.actions}>
        <Grid item xs={12} md={3} className={classes.actionText}>
          <Typography>{t("paymentByBankTransfer")}</Typography>
        </Grid>
        <Grid item xs={12} md={9} className={classes.actionButtons}>
          <Button
            type="submit"
            className={classes.button}
            component={Link}
            to={"/checkout"}
          >
            {t("back")}
          </Button>
          <Button
            type="submit"
            className={classes.button}
            component={Link}
            to={"/"}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={props.isProceedDisabled()}
            onClick={() => props.onSubmit()}
          >
            {t("orderWithObligationToPay")}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutSummary;
