"use client";
import Image from "next/image";
import Link from "next/link";
import AddVideos from "./add-video";
import NewCertificate from "./new-certificate";
import AddProduct from "./add-product";
import PostSocial from "../PostSocial";
import { useEffect, useState } from "react";
import { getRequest } from "@/hook/apiClient";
import ProductItem from "./ProductItem";
import { Loader2, User } from "lucide-react";
import Loading from "@/components/Loading";
import WhyUs from "./WhyUs";
import { Button } from "@/components/ui/button";
import UpdateWhyUs from "./UpdateWhyUs";
import DeleteWhyUs from "./DeleteWhyUs";

const Overview = ({ ce, setCertifications }: any) => {
  const [reload, setReload] = useState(true);
  const [overview, setOverview] = useState<any>({
    verification: {},
    post: [],
    product: [],
    video: null,
    certifications: [],
    representative: [],
    about: {},
  });
  const [whyUs, setWhyUs] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRequest("/user/company-profile?limit=2")
      .then((data) => {
        setOverview(data?.data);
        setWhyUs(data?.data.why_us);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [reload]);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  const {
    verification,
    post,
    product,
    video,
    certifications,
    representative,
    about,
  } = overview;
  useEffect(() => {
    setCertifications(certifications);
  }, [certifications]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="py-8 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 relative container">
      <div className="flex flex-col gap-14">
        {/* <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-primary">Company Story</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <div className="text-xs text-[#8C8585]">
                Tips: Attract potential buyers with stories of your company. Add
                an image at the top to make your company look more attractive.
              </div>
              <div className="text-lg text-[#8C8585]">
                There is no company story to be shown yet.
              </div>
            </div>
            <div className="flex justify-end items-end">
              <EditCompanyStory />
            </div>
          </div>
        </div> */}
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-primary">
            Verification Details
          </p>
          <div className="flex">
            <div className="ring-1 ring-gray-300 p-4 w-full md:w-auto">
              <div className="flex flex-col gap-3 font-medium">
                <div className="text-base text-[#8C8585]">
                  Tips: Add verification details to be recognized as a trusted
                  business partner.
                </div>
                {Object.keys(verification).map((key) => (
                  <div className="flex gap-3 text-xl" key={key}>
                    <p>{key}</p>
                    <p>{verification[key]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-primary">Posts</p>
            <Link
              href={"?type=posts"}
              className="text-xl color text-primary font-normal"
            >
              View all {" >"}
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="text-xs text-[#8C8585]">
                To edit/view all your posts at once, go to the{" "}
                <Link href={"?type=posts"} className="text-primary underline">
                  Post
                </Link>{" "}
                tab.
              </div>
              {(post?.length == 0 || !post) && (
                <div className="text-lg text-[#8C8585]">
                  There are no posts to be shown yet.
                </div>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {post.map((pd: any, index: any) => (
              <PostSocial key={index} user={null} dt={pd} />
            ))}

          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-primary">Products</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="text-xs text-[#8C8585]">
                To edit/view all your posts at once, go to the{" "}
                <Link href={"?type=product"} className="text-primary underline">
                  Product
                </Link>{" "}
                tab.
              </div>
              {(product?.length == 0 || !product) && (
                <div className="text-lg text-[#8C8585]">
                  There are no product to be shown yet.
                </div>
              )}
            </div>
            <div className="flex justify-end items-end">
              <AddProduct setReload={setReload} />
            </div>
          </div>
          {product.map((item: any, index: any) => (
            <ProductItem key={index} item={item} setReload={setReload} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {/* <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-3xl font-bold text-primary">
                  Photos & Videos
                </p>
              </div>
              <div className="text-xs text-[#8C8585]">
                Tips: Add photos and videos that best showcase your business. We
                recommend you to upload high-quality images and/or videos to
                appear more credible.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <p className="text-3xl font-bold text-[#404040]">Photos</p>
              <div className="text-lg text-[#8C8585]">
                There is no photo to be shown yet
              </div>
            </div>
            <div className="flex justify-end items-end">
              <AddPhoto />
            </div>
          </div> */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <p className="text-3xl font-bold text-[#404040]">Videos</p>
              {!video && (
                <div className="text-lg text-[#8C8585]">
                  There is no video to be shown yet
                </div>
              )}
            </div>
            <div className="flex justify-end items-end">
              <AddVideos />
            </div>
          </div>
          {video && (
            <div>
              <p className="font-semibold text-xl">{video?.title}</p>
              <p>{video?.description}</p>
              <video controls className="w-full md:w-3/4 aspect-video">
                <source src={video?.path} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-primary">Certifications</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <div className="text-xs text-[#8C8585]">
                Tips: To edit/view all your certifications at once, go to the{" "}
                <Link
                  href={"?type=certification"}
                  className="text-primary underline"
                >
                  Certifications
                </Link>{" "}
                tab.
              </div>
              {(ce?.length == 0 || !ce) && (
                <div className="text-lg text-[#8C8585]">
                  There are no certifications to be shown yet.
                </div>
              )}
            </div>
            <div className="flex justify-end items-end">
              <NewCertificate setCertifications={setCertifications} />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {ce.map((c: any, index: any) => {
              return (
                <div key={index} className="p-3 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 font-bold ">
                    <p>Certificate</p>
                    <p className="col-span-1">{c["certificate"]?.name}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Certificate Number</p>
                    <p className="col-span-1">{c?.certificate_number}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Organization</p>
                    <p className="col-span-1">{c?.organization}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Date Issued</p>
                    <p className="col-span-1">{c?.date_issued}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>From</p>
                    <p className="col-span-1">{c?.valid_from}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>To</p>
                    <p className="col-span-1">{c?.valid_to}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-primary">Our People</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <div className="text-xs text-[#8C8585]">
                Tips: Edit your profile card.
              </div>
              {/* <div className="flex justify-between items-center">
                <div className="text-lg text-[#8C8585] w-[80%]">
                  You can add up to 3 representatives. To invite members, go to{" "}
                  <Link href={"#"} className="text-primary underline">
                    settings
                  </Link>{" "}
                </div>
                <div className="font-medium text-lg text-[#8C8585]">1/3</div>
              </div> */}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {representative.map((r: any, index: any) => (
              <div
                key={index}
                className="flex flex-col gap-4 border border-gray-300 p-3 rounded-md"
              >
                <div className="flex gap-4 items-center text-lg text-primary font-bold">
                  <Image src={r.avatar || ""} width={67} height={67} alt="" />
                  <div>{r.first_name}</div>
                </div>
                <div className="flex gap-8 text-base underline text-[background: #4A4A4A]">
                  <div>{r.followers} Followers</div>
                  <div>{r.products_followed} Following</div>
                </div>
                <div>
                  <button className="bg-[#8C8585] w-[134px] h-[44px] rounded-[7px]">
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-primary">Why us</p>
            <WhyUs className="!w-full" whyUs={whyUs} setWhyUs={setWhyUs} setReload={setReload}></WhyUs>
          </div>
          <div className="flex flex-col gap-4">
            <span> Tips: add reasons to convince customers</span>
            {whyUs?.map((e: any, index: any) => {
              return (
                <div className="flex gap-4 justify-between items-start" key={index} >
                  <div className="flex items-start w-[95%]">
                    <div>
                      <div className="text-7xl w-16 text-start font-bold text-[#081440]">
                        {index + 1}
                      </div>
                    </div>
                    <div className="p-1">
                      <p className="text-xl font-bold">{e.title}</p>
                      <p className="font-normal">{e.content}</p>
                    </div>
                  </div>
                  <div className="flex pt-1 justify-end w-8 h-8">
                    {/* <UpdateWhyUs whyUs={whyUs} setWhyUs={setWhyUs} setReload={setReload} index={index}></UpdateWhyUs> */}
                    <DeleteWhyUs whyUs={whyUs} setWhyUs={setWhyUs} setReload={setReload} index={index}></DeleteWhyUs>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:pl-12 md:sticky md:h-[30rem] top-4">
        <p className="text-3xl font-bold text-primary">About</p>
        <div>
          <table className="w-full text-lg font-medium">
            {Object.keys(about).map((key) => (
              <tr key={key}>
                <td className="text-gray-700">{key}</td>
                <td>{about[key]}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Overview;
