'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRequest } from "@/hook/apiClient";
import Image from "next/image";
import { useEffect, useState } from "react";

const ManageFollowing = () => {
  const [listFollowing, setListFollowing] = useState([] as any)
  const [type, setType] = useState('PRODUCT')
  const [isLoadingData, setIsLoadingData] = useState(false)
  const getListData = (type = 'PRODUCT') => {

    getRequest(`/user/following?type=${type}`).then((res: any) => {
      
    })
  }
  useEffect(() => {
    getListData('PRODUCT')
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-[16px] !px-[28px]">
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
          <DialogTitle>Manage Following</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="Product" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Product">Product</TabsTrigger>
            <TabsTrigger value="Buyer">Buyer</TabsTrigger>
            <TabsTrigger value="Supplier">Supplier</TabsTrigger>
          </TabsList>
          <TabsContent value="Product" className="py-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src={"/images/plan/image meat.svg"}
                alt=""
                width={38}
                height={38}
              />
              <div>Fresh Whole Beef</div>
            </div>
          </TabsContent>
          <TabsContent value="Buyer" className="py-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src={"/images/plan/image meat.svg"}
                alt=""
                width={38}
                height={38}
              />
              <div>Fresh Whole Beef1</div>
            </div>
          </TabsContent>
          <TabsContent value="Supplier" className="py-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src={"/images/plan/image meat.svg"}
                alt=""
                width={38}
                height={38}
              />
              <div>Fresh Whole Beef2</div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
export default ManageFollowing