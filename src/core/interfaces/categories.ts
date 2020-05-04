export default interface Category {
  id: number;
  icon: number;
  name: string;
  ordering: number;
  parent: number;
  children: Category[];
}
