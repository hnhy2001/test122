import { ICountry } from "./country.interface"

export interface ISupplier {
    name: string,
    code: string,
    avatar: string,
    supplier_avatar: string,
    supplier_name: string,
    supplier_country: ICountry,
    supplier_code: string,
    supplier_type: object
}