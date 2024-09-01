import { User } from "./User";

export interface LoginResponse extends User {
  type: string;
  access_token: string;
  refresh_token: string;
}
