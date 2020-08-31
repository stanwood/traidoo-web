import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";

interface BackButtonProps {
  styleName?: string;
}

const BackButton: React.FC<BackButtonProps> = (props: BackButtonProps) => {
  const { styleName } = props;
  const history = useHistory();

  return (
    <IconButton
      edge="start"
      className={styleName}
      color="inherit"
      aria-label="back"
      onClick={() => history.goBack()}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
