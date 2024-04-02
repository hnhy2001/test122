import { IAddress } from "./address.interface";
import { IType } from "./type.interface";

export interface ICompany {
  name: string;
  address: string;
  website: string;
  type: IType;
  revenue: number;
  number_members: number;
  location: any;
  description: string
}