import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useProductFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      "&:focus": {
        backgroundColor: "transparent"
      }
    }
  })
);

export default useProductFilterStyles;
