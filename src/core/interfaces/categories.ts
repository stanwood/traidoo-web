interface CategoryIcon {
  id: number;
  name: string;
  iconUrl: string;
}

export interface Category {
  id: number;
  icon: CategoryIcon;
  name: string;
  ordering: number;
  defaultVat: number;
  parent: number;
}
