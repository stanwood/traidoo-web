import Box from "@material-ui/core/Box";
import clsx from "clsx";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet";
import { GlobalErrorFallback } from "../../core/errorBoundary";
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
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <Box className={clsx(classes.root, padding && classes.padding)}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </Box>
    </ErrorBoundary>
  );
};

export default Page;
