export default interface Props {
  handleDrawerLeft: any;
  handleDrawerRight: any;
  displayLeftMenuButton: boolean;
  tabs?: { name: string; link: string }[];
}

export interface LinkTabProps {
  label: string;
  link: string;
}
