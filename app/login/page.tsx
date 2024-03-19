import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image"

const Login = () => {
  return (
    <div className="flex">
      <Image
        alt=""
        src="/images/login/background.png"
        width={872.32}
        height={0}
        style={{ height: "auto" }}
      />
      <div className="mx-auto my-0 py-[32px]">
        <div className="mb-[32px]">
          <div className="flex items-center">
            <div className="text-primary text-[40px] leading-[50px] font-bold">
              Welcome to
            </div>
            <Image
              alt=""
              src="/images/login/logo.png"
              width={300}
              height={100}
            ></Image>
          </div>
          <div className="text-primary text-[20px] leading-[24px] -translate-y-[16px]">
            Connect with a trusted global network of agri professionals with us.
          </div>
        </div>
        <div className="flex flex-col gap-[32px] mb-[48px]">
          <div className="flex flex-col">
            <Label className="text-primary text-[24px] leading-[30px] mb-[8px] font-bold">
              Email
            </Label>
            <Input
              type="text"
              placeholder="Enter your email"
              className="border-black text-black border-[1px] h-[74px] text-[24px] leading-[30px"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-primary text-[24px] leading-[30px] mb-[8px] font-bold">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Your password"
              className="border-black text-black border-[1px] h-[74px] text-[24px] leading-[30px"
            />
          </div>
          <div className="text-primary text-[20px] leading-[24px] font-bold text-end cursor-pointer hover:underline">
            Forgot your password?
          </div>
          <button className="bg-primary text-white rounded-[6px] w-full font-700 text-[24px] leading-[20px] h-[68px]">
            Sigin In
          </button>
          <div className="font-700 text-[24px] leading-[20px] text-[#939AA1] text-center">
            Or
          </div>
          <div className="flex gap-[4px] flex-nowrap">
            <button className="w-full border border-[#939aa1] h-[58px] flex justify-center items-center rounded-[6px]">
              <Image
                src="/images/plan/google.svg"
                width={38}
                height={38}
                alt=""
              ></Image>
            </button>
            <button className="w-full bg-[#0866FF] border border-[#939aa1] h-[58px] flex justify-center items-center rounded-[6px]">
              <Image
                src="/images/plan/facebook-white.svg"
                width={38}
                height={38}
                alt=""
              ></Image>
            </button>
            <button className="w-full bg-[#0A66C2] border border-[#939aa1] h-[58px] flex justify-center items-center rounded-[6px]">
              <Image
                src="/images/plan/linkedIn-white.svg"
                width={38}
                height={38}
                alt=""
              ></Image>
            </button>
          </div>
        </div>
        <div className="text-primary text-[20px] leading-[24px] text-center">
          Don’t have account?{" "}
          <span className="text-primary text-[24px] leading-[30px] font-bold underline cursor-pointer">
            Create account now!
          </span>
        </div>
      </div>
    </div>
  );
}
export default Login