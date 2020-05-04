export type CategoryType = {
  id: number;
  icon: number;
  name: string;
  ordering: number;
  parent: number;
  children: CategoryType[];
};
