import { getRequest } from "@/hook/apiClient";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostSocial from "../PostSocial";
import Loading from "@/components/Loading";
import LoadMorePost from "../../supplier/[id]/LoadMorePost";

const Posts = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    (async () => {
      const session = await getSession();
      const user = session?.user;
      setUser(user)
      setLoading(true);
      getRequest(
        "/post/list?user_code=" + user?.code + "&user_role=BUYER" + "&page=1&limit=2"
      )
        .then((data: any) => setData(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    })();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="py-8 grid md:grid-cols-2 gap-12 relative container">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">Posts</p>
        <div className="text-xs text-[#8C8585]">
          To create new posts, go to the{" "}
          <Link href={"/"} className="text-primary underline">
            Home
          </Link>{" "}
          page
        </div>
        <div className="flex flex-col gap-3">
          {data?.data.map((pd: any, index: any) => (
            <PostSocial key={index} user={null} dt={pd} />
          ))}
        </div>
        <LoadMorePost id={user?.code} user={null} length={data?.data.length} total={data?.total_record} type="BUYER"/>
      </div>
    </div>
  );
};
export default Posts;
