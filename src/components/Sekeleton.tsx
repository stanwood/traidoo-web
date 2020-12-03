import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

export const SkeletonList = () => (
  <Box>
    {Array.from(Array(10).keys()).map((number) => (
      <Skeleton key={number} />
    ))}
  </Box>
);
