import Box from "@material-ui/core/Box";
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
import { format, parseISO } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import statusMapping from "../../core/utils/statusMapping";
import useOrderDetailsStyles from "./styles";

interface OrderItemProps {
  order: any;
  onFileDownload: Function;
}

const ItemLine: React.FC<{ item: any }> = (props: { item: any }) => {
  const { item } = props;
  return (
    <TableRow key={item.id}>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell align="right">
        {item.count} {item.unit}
      </TableCell>
      <TableCell align="right">
        {item.price}€ / {item.unit}
      </TableCell>
      <TableCell align="right">
        {item.amount * item.count * item.price}€
      </TableCell>
      <TableCell align="right">{item.vatRate}%</TableCell>
    </TableRow>
  );
};

const OrderItem: React.FC<OrderItemProps> = (props: OrderItemProps) => {
  const classes = useOrderDetailsStyles();
  const { t } = useTranslation();
  const { order, onFileDownload } = props;

  return (
    <Container component={Paper} maxWidth="md" className={classes.root}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        className={classes.pageTitle}
      >
        {t("Order")} {order.id}
      </Typography>

      <Table aria-label="info" className={classes.info} size="small">
        <TableBody>
          <TableRow>
            <TableCell className={classes.infoTitle}>{t("date")}</TableCell>
            <TableCell className={classes.infoTitle}>{t("status")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoValue}>
              {format(parseISO(order.date), "yyyy-dd-MM")}
            </TableCell>
            <TableCell className={classes.infoValue}>
              {statusMapping[order.status]}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TableContainer className={classes.data}>
        <Table aria-label="order items">
          <TableHead>
            <TableRow>
              <TableCell className={classes.secondaryText}>
                {t("products")}
              </TableCell>
              <TableCell align="right" className={classes.secondaryText}>
                {t("itemSize")}
              </TableCell>
              <TableCell align="right" className={classes.secondaryText}>
                {t("price")}
              </TableCell>
              <TableCell align="right" className={classes.secondaryText}>
                {t("total")}
              </TableCell>
              <TableCell align="right" className={classes.secondaryText}>
                {t("vat")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products.map((item: any) => (
              <ItemLine key={item.name} item={item} />
            ))}
            <TableRow>
              <TableCell className={classes.secondaryText}>
                {t("deposit")}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {order.deposits.map((item: any) => (
              <ItemLine key={item.name} item={item} />
            ))}

            <TableRow>
              <TableCell className={classes.secondaryText}>
                {t("platform")}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {order.platforms.map((item: any) => (
              <ItemLine key={item.name} item={item} />
            ))}

            <TableRow>
              <TableCell className={classes.secondaryText}>
                {t("logistics")}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {order.logistics.map((item: any) => (
              <ItemLine key={item.name} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={10} className={classes.summary}>
        <Grid item xs={12} md={6}>
          <TableContainer>
            <Table aria-label="summary">
              <TableBody>
                <TableRow>
                  <TableCell>{t("products")}</TableCell>
                  <TableCell align="right">
                    {order.summary.productsPrice}€
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("deposit")}</TableCell>
                  <TableCell align="right">
                    {order.summary.depositsPrice}€
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("platormFee")}</TableCell>
                  <TableCell align="right">
                    {order.summary.platformsPrice}€
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("deliveryFee")}</TableCell>
                  <TableCell align="right">
                    {order.summary.logisticsPrice}€
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("totalNet")}</TableCell>
                  <TableCell align="right">{order.summary.totalNet}€</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer>
            <Table aria-label="summary">
              <TableBody>
                {Object.entries(order.summary.vat).map(
                  ([key, value], index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {t("vat")} {key}%
                      </TableCell>
                      <TableCell align="right">{value}€</TableCell>
                    </TableRow>
                  )
                )}
                <TableRow>
                  <TableCell>{t("totalVat")}</TableCell>
                  <TableCell align="right">{order.summary.totalVat}€</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.boldText}>
                    {t("totalGross")}
                  </TableCell>
                  <TableCell align="right" className={classes.boldText}>
                    {order.summary.totalGross}€
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Box className={classes.actions}>
        <Button color="primary" onClick={onFileDownload}>
          {t("downloadPdf")}
        </Button>
      </Box>
    </Container>
  );
};

export default OrderItem;
