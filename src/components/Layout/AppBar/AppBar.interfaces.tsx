export default interface Props {
  handleDrawerLeft: any;
  handleDrawerRight: any;
  hideCategories: boolean;
  tabs?: { name: string; link: string }[];
}

export interface LinkTabProps {
  label: string;
  link: string;
}
