import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import LazyLoad from "react-lazyload";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext/context";
import { getCurrencySymbol } from "../../../../core/constants/currencies";
import AvilableItems from "../../availableItems";
import TablePaginationActions from "../Pagination/Pagination.component";
import TableHead from "../TableHead";
import TableToolbar from "../TableToolbar";
import ProductsListProps from "./interfaces";
import useStyles from "./Table.styles";
import ProductCartButton from "../CartButton";

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onPageChange,
  onFilterChange,
  onSortChange,
  page,
  order,
  orderBy,
  filterBy,
  sellerView,
  deleteProduct,
}: ProductsListProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { canBuy } = useContext(UserContext);

  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = React.useState<
    number | undefined
  >(undefined);

  const handleProductDelete = (productId: number) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (deleteProduct && selectedProductId) {
      deleteProduct(selectedProductId);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedProductId(undefined);
    setOpen(false);
  };

  const loggedInData = (
    productId: number,
    name: string,
    price: number | undefined,
    unit = "",
    amount: number,
    itemsAvailable: number | null
  ): ReactElement | undefined => {
    if (price) {
      if (sellerView) {
        return (
          <>
            <TableCell align="right">
              {price.toFixed(2)}
              {getCurrencySymbol()} / {t(unit)}
            </TableCell>
            <TableCell align="right">
              <IconButton
                aria-label="delete"
                onClick={() => handleProductDelete(productId)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </>
        );
      }

      return (
        <>
          <Hidden smDown>
            <TableCell align="right">
              {price.toFixed(2)}
              {getCurrencySymbol()} / {t(unit)}
            </TableCell>
          </Hidden>
          <TableCell align="right">
            <ProductCartButton
              productId={productId}
              price={price}
              unit={unit}
              name={name}
              amount={amount}
              itemsAvailable={itemsAvailable}
            />
          </TableCell>
        </>
      );
    }
  };

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        filterBy={filterBy}
        onFilterChange={onFilterChange}
        onRequestSort={onSortChange}
      />
      <TableContainer>
        <Table aria-label="products list">
          <TableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={onSortChange}
            sellerView={sellerView}
          />
          <TableBody>
            {products?.results.map((row, index) => (
              <TableRow
                key={row.id}
                className={index % 2 ? classes.alternatingRow : ""}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.imageCell}
                >
                  <LazyLoad>
                    <Img
                      src={row.image}
                      loader={
                        <Skeleton
                          variant="rect"
                          className={classes.imageLoader}
                        />
                      }
                      className={classes.image}
                    />
                  </LazyLoad>
                </TableCell>
                <TableCell align="left">
                  <Link
                    component={RouterLink}
                    to={
                      sellerView
                        ? `/seller/products/${row.id}`
                        : `/products/${row.id}`
                    }
                    color="textPrimary"
                    className={classes.mainLink}
                    data-testid="product-link"
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <Hidden smDown>
                  <TableCell align="left">
                    {sellerView && (
                      <Link
                        component={RouterLink}
                        to={`/seller/products?category=${row.category.id}`}
                        color="textSecondary"
                        className={classes.link}
                      >
                        {row.category.name}
                      </Link>
                    )}
                    {!sellerView && (
                      <Link
                        component={RouterLink}
                        to={`/sellers/${row.seller.id}`}
                        color="textSecondary"
                        className={classes.link}
                      >
                        {row.seller.companyName}, {row.seller.city}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {!sellerView && (
                      <Link
                        component={RouterLink}
                        to={`/products?category=${row.category.id}`}
                        color="textSecondary"
                        className={classes.link}
                      >
                        {row.category.name}
                      </Link>
                    )}
                    {sellerView && (
                      <AvilableItems
                        productId={row.id}
                        itemsNumber={row.itemsAvailable || 0}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">{row.region.name}</TableCell>
                </Hidden>
                {canBuy &&
                  loggedInData(
                    row.id,
                    row.name,
                    row.price,
                    row.unit,
                    row.amount,
                    row.itemsAvailable
                  )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={10}
                rowsPerPageOptions={[]}
                count={products!.count}
                page={page}
                onChangePage={onPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby={t("deleteTheProduct")}
        aria-describedby={t("deleteOperationDescription")}
      >
        <DialogTitle id="alert-dialog-title">
          {t("deleteTheProduct")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("deleteOperationDescription")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            {t("cancel")}
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductsList;
