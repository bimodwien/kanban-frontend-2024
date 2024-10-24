import { TUser } from "./user.model";

export type TTodos = {
  id: string;
  title?: string;
  content?: string;
  status?: string;
  order?: string;
  user?: TUser;
  createdAt?: Date;
  updatedAt?: Date;
};
