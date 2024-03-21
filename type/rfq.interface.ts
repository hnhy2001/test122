import { IBuyer } from "./buyer.interface";

export interface IRFQ{
    name: string,
    code: string,
    product_category_name: string,
    source_country: string,
    revenue: number,
    port_destination: string,
    shipment_date: string,
    status: string,
    buyer: IBuyer,
}