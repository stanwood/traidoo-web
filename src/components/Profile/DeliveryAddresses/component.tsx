import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.common.black,
    },
  })
)(TableCell);

const DeliveryAddresses = ({ deliveryAddresses, className, onDelete }: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box>
      <TableContainer component={Paper} className={className}>
        <Table className={classes.table} aria-label="deliver addresses">
          <TableHead>
            <TableRow>
              <StyledTableCell>{t("companyName")}</StyledTableCell>
              <StyledTableCell>{t("street")}</StyledTableCell>
              <StyledTableCell>{t("city")}</StyledTableCell>
              <StyledTableCell>{t("zip")}</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryAddresses?.map((deliveryAddress: any) => (
              <TableRow key={deliveryAddress.id}>
                <TableCell>{deliveryAddress.companyName}</TableCell>
                <TableCell>{deliveryAddress.street}</TableCell>
                <TableCell>{deliveryAddress.city}</TableCell>
                <TableCell>{deliveryAddress.zip}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onDelete(deliveryAddress.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justify="flex-end" className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/profile/company/deliveryAddress"
        >
          {t("addDeliveryAddress")}
        </Button>
      </Grid>
    </Box>
  );
};

export default DeliveryAddresses;
