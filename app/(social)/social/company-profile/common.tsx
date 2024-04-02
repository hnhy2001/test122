import Image from "next/image";

const Common = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#FBE7C6] p-8 text-xl border border-[#E0A23E] flex flex-col gap-4">
        <div>
          Become a verified supplier to publish your basic profile on{" "}
          <a href="#" className="underline">
            Social Marketplace
          </a>{" "}
          and gain full access to Social Marketplace features: submit quotes,
          participate in the social feed, and exchange messages with verified
          buyers and suppliers worldwide.{" "}
          <a href="#" className="underline">
            Learn More
          </a>
        </div>
        <ul className="list-disc pl-14">
          <li>
            Upload your{" "}
            <a href="#" className="underline">
              business documents
            </a>{" "}
            or sign in with a Tridge-verified work email.
          </li>
          <li>
            Add your{" "}
            <a href="#" className="underline">
              product(s).
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full border border-dashed py-8 flex justify-center items-center">
        <div>
          <Image src="/camera.png" width={22} height={17} alt="" />
        </div>
      </div>
    </div>
  );
}
export default Common;