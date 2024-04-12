import { getRequest } from "@/hook/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await getRequest('/product/list');
    const products = response.data

    const postEntries: MetadataRoute.Sitemap = products.map((product: any) => ({
        url: `${process.env.NEXT_URL}/product/` + product.name.split(" ").join("-") + "-*" + product.code,
        lastModified: new Date(),
    }));

    return [
        {
            url: `${process.env.NEXT_URL}`,
            lastModified: new Date(),
        },
        ...postEntries,
    ];
}
