import { options } from "@/app/api/auth/[...nextauth]/options";
import { getRequest } from "@/hook/apiClient";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostSocial from "../PostSocial";

const Posts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      const user = session?.user;

      getRequest(
        "/post/list?user_code=" + user?.code + "&user_role=" + user?.role
      )
        .then((data: any) => setData(data?.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div className="py-8 grid grid-cols-2 gap-12 relative">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">Posts</p>
        <div className="text-xs text-[#8C8585]">
          To create new posts, go to the{" "}
          <Link href={"/"} className="text-primary underline">
            Home
          </Link>{" "}
          page
        </div>
        <div>
          {data.map((pd: any, index: any) => (
            <PostSocial key={index} user={null} dt={pd} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Posts;
