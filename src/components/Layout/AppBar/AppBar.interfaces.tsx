export default interface Props {
  handleDrawerLeft: any;
  handleDrawerRight: any;
  displayLeftMenuButton: boolean;
  displayCartIcon: boolean;
  tabs?: { name: string; link: string }[];
}

export interface LinkTabProps {
  label: string;
  link: string;
}
