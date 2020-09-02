import { CardContent, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  getOverlaysRequest,
  Overlay as IOverlay,
} from "../../api/queries/overlays";
import { resendEmailVerificationRequest } from "../../api/queries/users/resendEmailVerification";
import { UserContext } from "../../contexts/UserContext/context";
import useStyles from "./styles";

const Overlay: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const { data, status } = useQuery("overlays", getOverlaysRequest);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const [mutate] = useMutation(resendEmailVerificationRequest, {
    onSuccess: () => {
      setEmailSent(true);
    },
  });

  const sendEmail = useCallback(() => {
    mutate();
  }, [mutate]);

  const overlayData = useMemo((): IOverlay | undefined => {
    if (!user.id)
      return data?.find((overlay) => overlay.overlayType === "anonymous");
    else if (!user.isEmailVerified)
      return data?.find((overlay) => overlay.overlayType === "not_verified");
    else if (user.groups.length < 1)
      return data?.find((overlay) => overlay.overlayType === "not_approved");
    else if (!user.isCooperativeMember)
      return data?.find((overlay) => overlay.overlayType === "not_cooperative");
    else return undefined;
  }, [user, data]);

  const displayButtonActions = useMemo((): boolean => {
    const buttons = overlayData?.buttons || [];
    return (
      user?.id === undefined ||
      user.isEmailVerified === false ||
      buttons.length > 0
    );
  }, [user?.id, user?.isEmailVerified, overlayData?.buttons]);

  if (status === "loading" || !overlayData) return null;

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        className={classes.media}
        src={overlayData.image}
        title="Image"
      />
      <CardHeader
        avatar={<Avatar src={overlayData.avatar} />}
        title={overlayData.title}
        subheader={overlayData.subtitle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {overlayData.body}
        </Typography>
      </CardContent>
      {displayButtonActions && (
        <CardActions className={classes.actions}>
          {!user?.id && (
            <Button
              size="small"
              color="primary"
              variant="contained"
              component={Link}
              to={"/registration"}
            >
              {t("signUp")}
            </Button>
          )}
          {!user?.id && (
            <Button
              size="small"
              variant="contained"
              component={Link}
              to={"/login"}
            >
              {t("signIn")}
            </Button>
          )}
          {user?.id && !user.isEmailVerified && (
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={sendEmail}
              disabled={emailSent}
            >
              {emailSent
                ? t("verificationEmailSent")
                : t("resendEmailVerification")}
            </Button>
          )}
          {overlayData.buttons
            ?.sort((a, b) => a.order - b.order)
            .map((button) => (
              <Button
                size="small"
                variant="contained"
                href={button.url}
                key={button.order}
              >
                {button.title}
              </Button>
            ))}
        </CardActions>
      )}
    </Card>
  );
};

export default Overlay;
