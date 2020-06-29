import Box from "@material-ui/core/Box";
import React from "react";
import { Helmet } from "react-helmet";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }: PageProps) => {
  return (
    <Box>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
};

export default Page;
