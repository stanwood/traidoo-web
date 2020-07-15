export default interface Props {
  displayLeftMenuButton: boolean;
  displayCartIcon: boolean;
  tabs?: { name: string; link: string }[];
}

export interface LinkTabProps {
  label: string;
  link: string;
}
