import { getRequest } from '@/hook/api';
import React from 'react'
import PostSocial from '../../social/PostSocial';
import LoadMorePost from '../../supplier/[id]/LoadMorePost';

const PostTab = async ({ id, user }: any) => {
    let posts_list: any = [];
    let total_post;

    try {
        let p_ = await getRequest(
            "/post/list?user_code=" + id + "&user_role=BUYER" + "&page=1&limit=2"
        );
        posts_list = p_?.data;
        total_post = p_?.total_record;
    } catch (error) { }
    return (
        <div className="flex flex-col gap-4 col-span-2 ">
            <p className="text-3xl font-bold">Posts</p>
            <div className="mx-auto flex flex-col gap-4 md:w-2/3">
                {posts_list.map((dt: any, index: any) => (
                    <PostSocial user={user} dt={dt} key={index} />
                ))}
                <LoadMorePost id={id} user={user} length={posts_list.length} total={total_post} type="BUYER" />
            </div>
        </div>
    )
}

export default PostTab