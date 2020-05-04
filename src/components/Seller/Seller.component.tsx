import { Box, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import ProductsList from "../Products/components/Table/Table.component";
import Profile from "./Profile";
import useStyles from "./Seller.styles";

const Seller = ({
  products,
  productsError,
  seller,
  sellerPending,
  sellerError,
  onPageChange,
  onFilterChange,
  onSortChange,
  page,
  order,
  orderBy,
  filterBy,
  addToCart,
  removeFromCart,
}: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Box
            component={Paper}
            className={classes.paper}
            display="flex"
            flex="1"
            flexDirection="column"
          >
            <Profile
              pending={sellerPending}
              seller={seller}
              error={sellerError}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductsList
            products={products}
            page={page}
            onPageChange={onPageChange}
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            order={order}
            orderBy={orderBy}
            filterBy={filterBy}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Seller;
