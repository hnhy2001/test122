import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
};

const Signup = () => {
  return (
    <div className="container flex justify-center py-16">
      <div className="flex items-center w-1/2 flex-col gap-10">
        <div className="flex justify-content w-full">
          <div className="flex flex-col gap-2 items-center w-1/4">
            <div>Email & password</div>
            <div className="w-4 h-4 rounded-full bg-black"></div>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div>Company information</div>
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div>Profile information</div>
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div>Email verification</div>
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-8">
          <div className="flex flex-col gap-2 w-full items-center">
            <span className="text-4xl font-black">
              To get started, add your work email
            </span>
            <div className="px-16 w-full text-center">
              <span className="text-sm">
                Built for trust, our platform allows verified businesses to get
                exclusive access to advanced Tridge features and benefits.
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-6">
            <div className="flex flex-col gap-2 w-3/4">
                <span className="text-lg font-bold">Work email</span>
                <Input
                  type="text"
                  placeholder="Work email"
                  className="border-black border w-full h-16 text-lg"
                />
            </div>

            <div className="flex flex-col gap-2 w-3/4">
                <span className="text-lg font-bold">Password</span>
                <Input
                  type="text"
                  placeholder="Password"
                  className="border-black border w-full h-16 text-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
