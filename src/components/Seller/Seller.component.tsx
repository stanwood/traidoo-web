import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
}: any) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.root} bgcolor="background.paper">
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box
            component={Paper}
            className={classes.paper}
            display="flex"
            flex="1"
            flexDirection="column"
            flexGrow={1}
          >
            <Profile
              pending={sellerPending}
              seller={seller}
              error={sellerError}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9} className={classes.productsList}>
          <ProductsList
            products={products}
            page={page}
            onPageChange={onPageChange}
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            order={order}
            orderBy={orderBy}
            filterBy={filterBy}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Seller;
