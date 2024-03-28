import { getRequest } from "@/hook/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await getRequest('/product/list?limit=3');
    const products = response.data

    const postEntries: MetadataRoute.Sitemap = products.map((product: any) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/` + product.name.split(" ").join("-") + "-*" + product.code,
        lastModified: new Date(),
    }));

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            lastModified: new Date(),
        },
        ...postEntries,
    ];
}
