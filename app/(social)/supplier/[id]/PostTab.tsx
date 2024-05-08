import React from 'react'
import PostSocial from '../../social/PostSocial';
import LoadMorePost from './LoadMorePost';
import { getRequest } from '@/hook/api';

const PostTab = async ({ user, id }: any) => {
    let data: any = [];
    let total_post;
    let po_ = await getRequest(
        "/post/list?user_code=" + id + "&page=1&limit=2"
    );
    data = po_?.data;
    total_post = po_?.total;
    return (
        <div className="flex flex-col gap-4 col-span-2 ">
            <p className="text-3xl font-bold">Posts</p>
            <div className="md:w-2/3 mx-auto flex flex-col gap-4">
                {data.map((dt: any, index: any) => (
                    <PostSocial user={user} dt={dt} key={index} />
                ))}
                <LoadMorePost
                    id={id}
                    user={user}
                    length={data.length}
                    total={total_post}
                    type="SELLER"
                />
            </div>
        </div>
    )
}

export default PostTab