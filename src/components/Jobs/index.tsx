import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { useTranslation } from "react-i18next";
import Row from "./Row";
import useTableListStyles from "./styles";

const JobsList = ({
  jobs,
  count,
  page,
  onPageChange,
  onJobClaim,
  onJobReturn,
  onToggleJobs,
  myJobs,
}: {
  jobs: any;
  count: number;
  page: number;
  onPageChange: any;
  onJobClaim: any;
  onJobReturn: any;
  onToggleJobs: any;
  myJobs: boolean;
}) => {
  const classes = useTableListStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => onToggleJobs()}
      >
        {myJobs ? t("allJobs") : t("myJobs")}
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="routes table">
          <TableHead>
            <TableRow>
              <TableCell>{t("product")}</TableCell>
              <TableCell>{t("fromTo")}</TableCell>
              <TableCell>{t("priceAndDetour")}</TableCell>
              <TableCell>{t("dates")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job: any) => (
              <Row
                key={job.id}
                job={job}
                onJobClaim={onJobClaim}
                onJobReturn={onJobReturn}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={count}
          rowsPerPage={10}
          onChangePage={(event: any, page: number) => onPageChange(page)}
          page={page}
          className={classes.pagination}
        />
      </TableContainer>
    </Box>
  );
};

export default JobsList;
