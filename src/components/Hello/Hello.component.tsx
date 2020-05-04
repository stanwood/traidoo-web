import { Button, CardContent, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useStyles from "./Hello.styles";

export default function Hello(props: any) {
  // TODO: add type
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={props.className}>
      <CardMedia
        component="img"
        className={classes.media}
        src="https://picsum.photos/800"
        title="Image"
      />
      <CardHeader
        avatar={<Avatar aria-label="recipe">M</Avatar>}
        title={t("anonymousCardTitle")}
        subheader={t("anonymousCardSubTitle")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {t("anonymousCardText")}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          component={Link}
          to={"/registration"}
        >
          {t("signUp")}
        </Button>
        <Button size="small" variant="contained" component={Link} to={"/login"}>
          {t("signIn")}
        </Button>
        <Button size="small" variant="contained">
          {t("learnMore")}
        </Button>
      </CardActions>
    </Card>
  );
}
