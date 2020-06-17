import { Box, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import LazyLoad from "react-lazyload";
import useStyles from "./Profile.styles";

const Profile = (props: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { seller, pending, error } = props;

  if (pending) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  if (error) {
    return <Alert severity="error">{t("error")}</Alert>;
  }

  return (
    <>
      <LazyLoad>
        <Img
          src={seller.imageUrl}
          loader={<Skeleton variant="rect" className={classes.imageLoader} />}
          className={classes.image}
        />
      </LazyLoad>
      <Box
        className={classes.content}
        display="flex"
        flex="1"
        flexDirection="column"
      >
        <Typography>
          {seller.firstName} {seller.lastName}
        </Typography>
        <Typography className={classes.marginBottom} variant="body2">
          {t("from")} {seller.city}
        </Typography>

        <Typography>{seller.description}</Typography>
      </Box>
    </>
  );
};

export default Profile;
