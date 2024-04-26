import React from "react";
import { cache } from "react";
import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import PostSocial from "../PostSocial";

const getPost = cache(async (id: string) => {
    const post: any = await getRequest("/post/detail/" + id);
    return post;
});

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.id.split("-i-")[1];
    const post: any = await getPost(id);
    console.log(post)
    return {
        title: post.post?.content,
        openGraph: {
            images: [],
        },
    };
}

const ProductDetail = async ({ params }: any) => {
    const session = await getServerSession(options);
    const user = session?.user;
    const id = params.id.split("-i-")[1];
    const post: any = await getPost(id);

    return (
        <div className="py-11 container grid md:grid-cols-3">
            <div>

            </div>
            <PostSocial dt={post.post} user={user} />
        </div>
    );
};

export default ProductDetail;
