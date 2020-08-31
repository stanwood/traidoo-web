import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { Link } from "react-router-dom";

interface LinkTabProps {
  label: string;
  path: string;
}

export interface TabProps {
  key: string;
  label: string;
  path: string;
  order: number;
}

interface TraidooAppBarTabsProps {
  activeTab: number;
  tabs: TabProps[];
}

const useTraidooAppBarTabsStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      flexGrow: 1,
      maxWidth: "none",
      flexBasis: 0,
      flexShrink: 1,
    },
  })
);

const a11yProps = (index: number) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
};

const LinkTab: React.FC<LinkTabProps> = (props: LinkTabProps) => {
  const { path, label } = props;
  const classes = useTraidooAppBarTabsStyles();

  return (
    <Tab component={Link} to={path} label={label} className={classes.tab} />
  );
};

const TraidooAppBarTabs: React.FC<TraidooAppBarTabsProps> = (
  props: TraidooAppBarTabsProps
) => {
  const { activeTab, tabs } = props;

  return (
    <Tabs variant="fullWidth" value={activeTab} aria-label="nav tabs">
      {tabs.map((tab) => (
        <LinkTab
          key={tab.key}
          label={tab.label}
          path={tab.path}
          {...a11yProps(tab.order)}
        />
      ))}
    </Tabs>
  );
};

export default TraidooAppBarTabs;
