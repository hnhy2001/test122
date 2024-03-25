import { IBuyer } from "./buyer.interface";
import { ICountry } from "./country.interface";



export interface ISocial{
    user_name: string,
    user_avatar: string,
    user_country: ICountry,
    user_code: string,
    user_type: number,
    code: string,
    content: string,
    view: number,
    like: number,
    share: number,
    galleries: string[],
    created_at: string,
    comment_list: any
}