import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { format, parseISO } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../core/context";

const Row = ({
  job,
  onJobClaim,
  onJobReturn,
}: {
  job: any;
  onJobClaim: any;
  onJobReturn: any;
}) => {
  const { t } = useTranslation();

  const appContext = useContext(Context);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (job?.user === appContext.state.user.id) {
      setClaimed(true);
    }
  }, [job]);

  const claimJob = useCallback(
    (job) => {
      onJobClaim({ jobId: job.id });
      setClaimed(true);
    },
    [job.id]
  );

  const returnJob = useCallback(
    (job) => {
      onJobReturn({ jobId: job.id });
      setClaimed(false);
    },
    [job.id]
  );

  const productName = useCallback(
    (job: any) => {
      return (
        <Box>
          <Box>{`${job.orderItem.quantity}x ${job.orderItem.product.containerType.sizeClass}`}</Box>
          <Box>{job.orderItem.product.name}</Box>
          <Box>{`${job.orderItem.product.seller.firstName} ${job.orderItem.product.seller.lastName}`}</Box>
        </Box>
      );
    },
    [job]
  );

  const directions = useCallback(
    (job: any) => {
      return (
        <Box>
          <Box>{`${job.orderItem.product.seller.city} ${job.orderItem.product.seller.street} ${job.orderItem.product.seller.zip}`}</Box>
          <Box>{`${job.orderItem.deliveryAddress.city} ${job.orderItem.deliveryAddress.street} ${job.orderItem.deliveryAddress.zip}`}</Box>
        </Box>
      );
    },
    [job]
  );

  const renderButton = useCallback(
    (job: any) => {
      if (!claimed) {
        return (
          <Button color="primary" onClick={() => claimJob(job)}>
            {t("claim")}
          </Button>
        );
      }

      return (
        <Button color="primary" onClick={() => returnJob(job)}>
          {t("return")}
        </Button>
      );
    },
    [claimed]
  );

  const formatDate = (date: string) => {
    return date ? format(parseISO(date), "Qo LLL") : null;
  };

  return (
    <TableRow key={job.id}>
      <TableCell>{productName(job)}</TableCell>
      <TableCell>{directions(job)}</TableCell>
      <TableCell>
        <Box>{job.orderItem.deliveryFee}&euro;</Box>
        <Box>
          {job.detour} {t("km")}
        </Box>
      </TableCell>
      <TableCell>
        {formatDate(job.orderItem.order.earliestDeliveryDate)}
        {formatDate(job.orderItem.order.latestDeliveryDate)}
      </TableCell>
      <TableCell>{renderButton(job)}</TableCell>
    </TableRow>
  );
};

export default Row;