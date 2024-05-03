"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRequest } from "@/hook/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManageFollowing = () => {
  const [listFollowing, setListFollowing] = useState([] as any);
  const [type, setType] = useState("PRODUCT");
  const [listType, setListType] = useState([
    {
      name: "Product",
      type: "PRODUCT",
    },
    {
      name: "Supplier",
      type: "SUPPLIER",
    },
    {
      name: "Buyer",
      type: "BUYER",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const getListData = (type = "PRODUCT") => {
    setIsLoadingData(true);
    getRequest(`/user/following?type=${type}`)
      .then((res: any) => {
        if (res.data && res.data.length) {
          setListFollowing(res.data);
        } else {
          setListFollowing([]);
        }
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };
  const closeModal = () => {
    setIsOpen(false);
    setType("PRODUCT");
  };
  const changeData = (type: any) => {
    setType(type);
    getListData(type);
  };
  useEffect(() => {
    if (isOpen) {
      getListData();
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-[16px] !px-[28px]"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={"/images/plan/management.svg"}
            alt=""
            width={21}
            height={21}
            className="px-[4px]"
          ></Image>
          Manage following
        </Button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <div>Manage Following</div>
            <div className="cursor-pointer" onClick={closeModal}>
              X
            </div>
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="Product" className="w-full mt-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {listType.map((item: any) => (
              <div
                key={item.type}
                className={`p-2 text-center cursor-pointer ${
                  !type || type == item.type ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => changeData(item.type)}
              >
                {item.name}
              </div>
            ))}
          </div>
          {!isLoadingData ? (
            <div>
              {listFollowing && listFollowing.length ? (
                <div className="flex flex-col">
                  {listFollowing.map((item: any) => (
                    <Link
                      target="_blank"
                      href={
                        `/${type.toLowerCase()}/` +
                        item.name.split(" ").join("-") +
                        "-i." +
                        item.code
                      }
                      className="flex items-center gap-2 cursor-pointer border-b py-2"
                    >
                      <Image src={item.avatar} alt="" width={38} height={38} />
                      <div>{item.name}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9" />
                <div>
                  <Skeleton className="h-2 w-64" />
                  <Skeleton className="h-2 w-64" />
                </div>
              </div>
            </div>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default ManageFollowing;
