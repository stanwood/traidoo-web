import UserGroup from "./groups";

interface SellerProfile {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  city: string;
  image: string;
  groups: UserGroup[];
}

export default SellerProfile;
