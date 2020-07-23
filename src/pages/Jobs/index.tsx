import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import {
  BooleanParam,
  NumberParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { claimJobRequest } from "../../api/queries/jobs/claim";
import { getJobs } from "../../api/queries/jobs/get";
import { returnJobRequest } from "../../api/queries/jobs/return";
import Page from "../../components/Common/Page";
import JobsList from "../../components/Jobs";

const JobsPage: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("jobs");

  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    my: withDefault(BooleanParam, false),
  });

  const { data, status } = useQuery(["jobs", Object(query)], getJobs);
  const [claim] = useMutation(claimJobRequest);
  const [unclaim] = useMutation(returnJobRequest);

  const onPageChange = useCallback(
    (page: number) => {
      setQuery({ page });
    },
    [setQuery]
  );

  return (
    <Page title={pageTitle}>
      {status === "loading" || !data ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <JobsList
          jobs={data.results}
          count={data.count}
          page={query.page}
          onPageChange={onPageChange}
          onJobClaim={claim}
          onJobReturn={unclaim}
        />
      )}
    </Page>
  );
};

export default JobsPage;
