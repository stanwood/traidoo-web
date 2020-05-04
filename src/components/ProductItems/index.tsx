import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { useTranslation } from "react-i18next";
import AddItemDialog from "./AddItemDialog";
import ProductItem from "./Item";
import { useProductItemsStyles } from "./styles";

const ProductItems = ({
  items,
  onDelete,
  register,
  errors,
  setValue,
  clearError,
  handleSubmit,
  onSubmit,
  openDialog,
  handleDialogOpen,
  handleDialogClose,
}: {
  items: any;
  onDelete: Function;
  register: Function;
  errors: any;
  setValue: Function;
  clearError: Function;
  handleSubmit: Function;
  onSubmit: any;
  openDialog: boolean;
  handleDialogOpen: Function;
  handleDialogClose: any;
}) => {
  const classes = useProductItemsStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table aria-label="items">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>{t("availableItems")}</TableCell>
              <TableCell>{t("bestBefore")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.results.map((item: any) => (
              <ProductItem key={item.id} item={item} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          data-testid="add-items-button"
          onClick={() => handleDialogOpen()}
        >
          {t("addItems")}
        </Button>
      </Box>
      <AddItemDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        setValue={setValue}
        clearError={clearError}
        handleSubmit={handleSubmit}
      />
    </Paper>
  );
};

export default ProductItems;
