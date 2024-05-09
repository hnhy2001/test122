"use client";
import ProductCategory from "@/components/ProductCategory";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getRequest, postRequestWithFormData } from "@/hook/apiClient";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AddProduct = ({ setReload }: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>();
  const [detail, setDetail] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [originCountry, setOriginCountry] = useState<any>();
  const [countries, setCountries] = useState<any>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getRequest("/config/countries").then((data: any) =>
      // setCategoryies(getAllLevelThreeItems(data.data))
      setCountries(data.data)
    );
  }, []);

  useEffect(() => {
    if (category?.code) {
      getRequest("/product/attribute/" + category?.code).then((data: any) =>
        setDetails(data.data)
      );
    }
  }, [category]);

  const handleCancel = () => {
    setCategory(null);
    setDetail([]);
    setOriginCountry({});
  };
  const handleSubmit = async () => {
    if (!category || detail.length == 0 || !originCountry) {
      toast({
        variant: "destructive",
        title: "Fail",
        description: "You need to enter all fields",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("category", JSON.stringify(category));
    formData.append("detail", JSON.stringify(detail));
    formData.append("origin_country", JSON.stringify(originCountry));
    formData.append("user_role", "BUYER");
    postRequestWithFormData("/product/create-for-buyer", formData)
      .then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: "Create Product",
        });
        setReload((prev: any) => !prev);
        setOpen(false);
        handleCancel();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Create Product",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add</Button>
      </DialogTrigger>
      <DialogContent className="!min-w-[60%] !h-70% !max-h-[80%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Product</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4 flex-1 max-h-full overflow-y-auto px-4">
          {/* <div className="flex flex-col gap-2">
            <Label>Main Image *</Label>
            <DragDropPhoto img={avatar} setImg={setAvatar} multiple={false} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Other Images</Label>
            <DragDropPhoto
              img={galleries}
              setImg={setGalleries}
              multiple={true}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Product Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Specify product name"
            />
          </div> */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Product Category <span className="text-red-500">*</span></Label>
            {/* <Select
              onValueChange={(e: any) => {
                setCategory(
                  categories.find((c: any) => c.code == e.split("*")[0])
                );
              }} 
            >
              <SelectTrigger className="w-full" >
                <SelectValue placeholder="Select a fruit" className="w-full">
                  {
                    category &&
                    <div className="flex gap-3 items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <strong>{category.name}</strong>
                      </div>
                      <Image
                        src={category.avatar}
                        alt={category.name}
                        width={24}
                        height={24}
                      />
                    </div>
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-w-[calc(100vw-6rem)] xs:max-w-[calc(60vw-6rem)]">
                {categories.map((category: any, index: any) => (
                  <SelectItem
                    key={category.code + "*" + index}
                    value={category.code + "*" + index}
                    className="w-full border-b border-gray-200"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <strong>{category.name}</strong>
                        <p className="text-gray-400 break-all">{category.description}</p>
                        <p className="text-gray-400 break-words">{category.category_path}</p>
                      </div>
                      <Image
                        src={category.avatar}
                        alt={category.name}
                        width={32}
                        height={32}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            <ProductCategory category={category} setCategory={setCategory} />

          </div>
          <div className="flex flex-col gap-2">
            <Label>Country of Origin <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(e: any) =>
                setOriginCountry(
                  countries.find((i: any) => i.code == e.split("*")[0])
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries?.map((country: any, index: any) => (
                  <SelectItem
                    key={country.code + "*" + index}
                    value={country.code + "*" + index}
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {details &&
              Object.keys(details)?.map((value: any, idx: any) => {
                return (
                  <div key={idx}>
                    <div key={idx} className="font-bold py-2">
                      {details[value][0]?.label}
                    </div>
                    <div className="flex flex-col gap-2">
                      {details[value].map((item: any, index: any) => (
                        <div className="flex items-center gap-2" key={index}>
                          <Checkbox
                            id={item._id}
                            value={item.value}
                            onCheckedChange={(e) => {
                              if (e) {
                                setDetail((prev: any) => [...prev, item]);
                              } else {
                                let detail_ = detail.filter(
                                  (d: any) => d._id !== item?._id
                                );
                                setDetail(detail_);
                              }
                            }}
                          />
                          <label
                            htmlFor={item.value}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label>Representatives *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Representative-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Representative</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Award</Label>
            <div className="flex gap-1 w-full">
              <div className="w-full flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-[80%]">
                    <Input placeholder="Type to search award" />
                  </div>
                  <div className="w-[20%]">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {listYear.map((item: any) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-[70%]">
                    <Input placeholder="Enter medal/prize" />
                  </div>
                  <div className="w-[30%]">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button className="h-full px-8">Add</Button>
            </div>
            <div className="flex gap-4">
              <div>Non Gmo - 2018 - medal/prize - score</div>
              <button>X</button>
            </div>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Country of Origin * </Label>
            <Select
              onValueChange={(e: any) =>
                setOriginCountry(
                  countries.find((i: any) => i.code == e.split("*")[0])
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries?.map((country: any, index: any) => (
                  <SelectItem
                    key={country.code + "*" + index}
                    value={country.code + "*" + index}
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Production Capacity</Label>
            <div className="flex gap-1">
              <div className="relative w-[60%]">
                <Input
                  type="number"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
               
              </div>
              <div className="grid grid-cols-2 gap-1 w-[40%]">
                <Select
                  key={"unit1"}
                  onValueChange={(e: any) =>
                    setExportUnit({
                      code: e.split("*")[0],
                      name: e.split("*")[1],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit: any) => (
                      <SelectItem
                        key={unit.code}
                        value={unit.code + "*" + unit.name}
                      >
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  key={"frequency1"}
                  onValueChange={(e) =>
                    setExportFrequency({
                      code: e.split("*")[0],
                      name: e.split("*")[1],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequency.map((f: any) => (
                      <SelectItem key={f.code} value={f.code + "*" + f.name}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
           
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap">
              {listMonth.map((item: any, index: any) => (
                <div className="flex items-center gap-2" key={item.name}>
                  <Checkbox
                    id={item.name}
                    value={item}
                    checked={item.isChecked}
                    onCheckedChange={(e) => changeSelectedMonth(e, index)}
                  />
                  <label
                    htmlFor={item}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="terms"
                checked={isCheckAll}
                onCheckedChange={(e) => checkAll(e)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                All season
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed specifications of this product as much as possible"
            />
          </div> */}
        </div>
        <DialogFooter className="sm:justify-end">
          <div className="flex gap-3 justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="border border-black"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </DialogClose>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button variant="default" onClick={handleSubmit}>
                Confirm
              </Button>
            )}

          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddProduct;
