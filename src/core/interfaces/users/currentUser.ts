import UserGroup from "./groups";

export default interface CurrentUser {
  id: number;
  groups: UserGroup[];
}
