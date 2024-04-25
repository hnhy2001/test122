'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = (props: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState<any>()
    const router = useRouter();

    const onSign = async () => {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });

        if (!res?.error) {
            const callbackUrl = decodeURIComponent(window.location.href.split("=")[1]); // Extract callback URL from current URL (if present)
            if (callbackUrl) {
                router.push(`${callbackUrl}`);
            } else {
                router.push("/"); 
            }
        }
        else {
            setErr(res?.error)
        }
    }

    return (
      <div className="flex relative w-full xl:h-full min-h-screen">
        <div className="xl:w-[60%] bg-cover w-full h-[130%] bg-login bg-no-repeat absolute xl:relative xl:h-[130vh]">
          {/* <Image
            alt=""
            width={0}
            height={0}
            src="/images/login/background.png"
            style={{ height: "auto", width: "fit-content" }}
          /> */}
        </div>
        <div className="mx-auto my-0 py-8 absolute z-1 left-1/2 -translate-x-1/2 xl:relative xl:translate-x-0 xl:left-0 xl:top-0 top-[3%] px-8 rounded-lg xl:bg-white bg-[#ccccccab]">
          <div className="">
            <div className="mb-8">
              <div className="flex flex-col xl:flex-row items-center">
                <div className="text-primary text-4xl font-bold">
                  Welcome to
                </div>
                <Image
                  alt=""
                  src="/images/login/logo.png"
                  width={300}
                  height={100}
                ></Image>
              </div>
              <div className="text-primary text-xl -translate-y-4 text-center xl:text-start">
                Connect with a trusted global network of agri professionals with
                us.
              </div>
            </div>
            <div className="flex flex-col gap-8 mb-12">
              {err && (
                <p className="text-xl font-semibold text-red-500">
                  Tài khoản hoặc mật khẩu không chính xác
                </p>
              )}
              <div className="flex flex-col">
                <Label className="text-primary text-2xl mb-2 font-bold">
                  Email
                </Label>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-black text-black border-[1px] h-20 text-2xl"
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-primary text-2xl mb-2 font-bold">
                  Password
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="border-black text-black border-[1px] h-20 text-2xl"
                />
              </div>
              <div className="text-primary text-xl font-bold text-end cursor-pointer hover:underline">
                Forgot your password?
              </div>
              <button
                onClick={() => onSign()}
                className="bg-primary text-white rounded-[6px] w-full font-700 text-2xl h-[68px]"
              >
                Sign In
              </button>
              <div className="font-700 text-2xl text-[#939AA1] text-center">
                Or
              </div>
              <div className="flex gap-1 flex-nowrap">
                <button className="w-full border border-[#939aa1] h-14 flex justify-center items-center rounded-[6px]">
                  <Image
                    src="/images/plan/google.svg"
                    width={38}
                    height={38}
                    alt=""
                  ></Image>
                </button>
                <button className="w-full bg-[#0866FF] border border-[#939aa1] h-14 flex justify-center items-center rounded-[6px]">
                  <Image
                    src="/images/plan/facebook-white.svg"
                    width={38}
                    height={38}
                    alt=""
                  ></Image>
                </button>
                <button className="w-full bg-[#0A66C2] border border-[#939aa1] h-14 flex justify-center items-center rounded-[6px]">
                  <Image
                    src="/images/plan/linkedIn-white.svg"
                    width={38}
                    height={38}
                    alt=""
                  ></Image>
                </button>
              </div>
            </div>
            <div className="text-primary text-xl text-center">
              Don’t have account?{" "}
              <Link
                href={"/register"}
                className="text-primary text-2xl font-bold underline cursor-pointer"
              >
                Create account now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Login