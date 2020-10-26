import { TableColumns } from "../../interfaces";

export default interface TableToolbarProps {
  filterBy: string | undefined;
  onFilterChange: any;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableColumns
  ) => void;
}
