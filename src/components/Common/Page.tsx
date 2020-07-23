import Box from "@material-ui/core/Box";
import React from "react";
import { Helmet } from "react-helmet";
import usePageStyles from "./styles";

interface PageProps {
  title: string;
  children: React.ReactNode;
  padding?: boolean;
}

const Page: React.FC<PageProps> = (props: PageProps) => {
  const classes = usePageStyles();
  const { title, children, padding = true } = props;

  return (
    <Box className={padding ? classes.root : ""}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
};

export default Page;
