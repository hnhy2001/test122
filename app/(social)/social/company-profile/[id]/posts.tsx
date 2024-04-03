import Link from "next/link";

const Posts = () => {
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
      </div>
    </div>
  );
}
export default Posts