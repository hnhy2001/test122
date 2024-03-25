import { ICountry } from "./country.interface"

export interface IProduct {
    name: string,
    code: string,
    summary: any,
    avatar: string,
    supplier_name: string,
    supplier_country: ICountry,
    supplier_code: string,
    supplier_type: string,
    origin_country: ICountry
}