import { Hidden, IconButton } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { ReactElement, useContext } from "react";
import Img from "react-image";
import LazyLoad from "react-lazyload";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../../../../contexts/CartContext/context";
import { Context } from "../../../../core/context";
import TablePaginationActions from "../Pagination/Pagination.component";
import TableHead from "../TableHead";
import TableToolbar from "../TableToolbar";
import ProductsListProps from "./interfaces";
import useStyles from "./Table.styles";

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
}: ProductsListProps) => {
  const classes = useStyles();
  const context = useContext(Context);
  const { isProductInCart, addProduct, removeProduct } = useContext(
    CartContext
  );
  const user = context.state.user;

  const cartButton = (
    productId: number,
    price: number,
    unit: string,
    name: string,
    amount: number
  ): ReactElement => {
    if (isProductInCart(productId)) {
      return (
        <IconButton
          color="primary"
          aria-label="add to cart"
          onClick={() => removeProduct(productId)}
        >
          <RemoveShoppingCartIcon />
        </IconButton>
      );
    }

    return (
      <IconButton
        color="primary"
        aria-label="add to cart"
        onClick={() =>
          addProduct({ id: productId, amount, name, price, unit, quantity: 1 })
        }
      >
        <AddShoppingCartIcon />
      </IconButton>
    );
  };

  const loggedInData = (
    productId: number,
    name: string,
    price = 0,
    unit = "",
    amount: number
  ): ReactElement | undefined => {
    if (user?.id) {
      if (sellerView) {
        return (
          <TableCell align="right">
            {price.toFixed(2)}€ / {unit}
          </TableCell>
        );
      }

      return (
        <>
          <Hidden smDown>
            <TableCell align="right">
              {price.toFixed(2)}€ / {unit}
            </TableCell>
          </Hidden>
          <TableCell align="right">
            {cartButton(productId, price, unit, name, amount)}
          </TableCell>
        </>
      );
    }
  };

  return (
    <Paper className={classes.paper}>
      {filterBy && (
        <TableToolbar
          filterBy={filterBy}
          onFilterChange={onFilterChange}
          onRequestSort={onSortChange}
        />
      )}
      <TableContainer>
        <Table className={classes.table} aria-label="products list">
          <TableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={onSortChange}
            sellerView={sellerView}
          />
          <TableBody>
            {products?.results.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
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
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={
                      sellerView
                        ? `/seller/products/${row.id}`
                        : `/products/${row.id}`
                    }
                    color="textPrimary"
                    className={classes.link}
                    data-testid="product-link"
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <Hidden smDown>
                  <TableCell align="right">
                    {sellerView && (
                      <Link
                        component={RouterLink}
                        to={`/seller/products?category=${row.category.id}`}
                        color="textPrimary"
                        className={classes.link}
                      >
                        {row.category.name}
                      </Link>
                    )}
                    {!sellerView && (
                      <Link
                        component={RouterLink}
                        to={`/sellers/${row.seller.id}`}
                        color="textPrimary"
                        className={classes.link}
                      >
                        {row.seller.firstName} {row.seller.lastName},{" "}
                        {row.seller.city}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {!sellerView && (
                      <Link
                        component={RouterLink}
                        to={`/products?category=${row.category.id}`}
                        color="textPrimary"
                        className={classes.link}
                      >
                        {row.category.name}
                      </Link>
                    )}
                    {sellerView && row.itemsAvailable}
                  </TableCell>
                </Hidden>
                {loggedInData(
                  row.id,
                  row.name,
                  row.price,
                  row.unit,
                  row.amount
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
    </Paper>
  );
};

export default ProductsList;
