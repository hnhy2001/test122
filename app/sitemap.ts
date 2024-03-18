import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await fetch("https://dummyjson.com/posts");
    const { posts }: any = await response.json();

    const postEntries: MetadataRoute.Sitemap = posts.map(({ id }: any) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
    }));

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            lastModified: new Date(),
        },
        ...postEntries,
    ];
}
