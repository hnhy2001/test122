import { IAddress } from "./address.interface";
import { IType } from "./type.interface";

export interface ICompany{
    name: string,
    address: IAddress,
    website: string,
    type: IType,
    revenue: number,
    number_members: number
}