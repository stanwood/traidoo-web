export interface Category {
  id: number;
  icon: string;
  name: string;
  ordering: number;
  defaultVat: number;
  parent: number;
}

export interface CategoryTree extends Category {
  children: Category[];
}
