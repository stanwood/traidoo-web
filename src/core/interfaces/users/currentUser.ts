import UserGroup from "./groups";

interface CurrentUser {
  id: number;
  groups: UserGroup[];
}

export default CurrentUser;
