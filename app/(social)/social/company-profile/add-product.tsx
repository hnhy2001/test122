import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1949;
  const [listYear, setListYear] = useState([] as any[]);
  const [purchasingVolume, setPuchasingVolume] = useState(0);
  const [listMonth, setListMonth] = useState([
    { name: "Jan", isChecked: false },
    { name: "Feb", isChecked: false },
    { name: "Mar", isChecked: false },
    { name: "Apr", isChecked: false },
    { name: "May", isChecked: false },
    { name: "Jun", isChecked: false },
    { name: "Jul", isChecked: false },
    { name: "Aug", isChecked: false },
    { name: "Sep", isChecked: false },
    { name: "Oct", isChecked: false },
    { name: "Nov", isChecked: false },
    { name: "Dec", isChecked: false },
  ]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState([] as any)
  const increasingPurchase = (e: any, field: any) => {
    e.preventDefault();
  };
  const decreasingPurchase = (e: any, field: any) => {
    e.preventDefault();
    let value = Number(field.value);
    if (value <= 0) return;
    const result = value - 1;
  };
  const getListYear = () => {
    let list: any[] = [];
    for (let i = currentYear; i >= startYear; i--) {
      list.push(i);
    }
    setListYear(list);
  };
  const changeSelectedMonth = (event: any, i: any) => {
    const result = listMonth.map((item: any) => item)
    result[i].isChecked = event
    setListMonth(result)
    const checkAll = listMonth.every((item: any) => item.isChecked)
    if (checkAll) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false);
    }
  }
  const checkAll = (event: any) => {
    setIsCheckAll(event)
    if (event) {
      const selected = listMonth.map((item: any) => ({
        ...item,
        isChecked: true
      }))
      setListMonth(selected);
    } else {
      const selected = listMonth.map((item: any) => ({
        ...item,
        isChecked: false,
      }));
      setListMonth(selected);
    }
  };
  useEffect(() => {
    getListYear();
  }, [selectedMonth, isCheckAll]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-[120px] h-[48px] text-xl font-bold bg-primary rounded-[7px] text-white flex items-center gap-2 justify-center">
          <div>+</div>
          <div>Add</div>
        </button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%] !h-70% !max-h-[80%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Product</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4 flex-1 max-h-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            <Label>Main Image *</Label>
            <DragDropPhoto />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Other Images</Label>
            <DragDropPhoto />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Product Name *</Label>
            <Input placeholder="Specify product name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Product Category *</Label>
            <Input placeholder="Search and select product a product category" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Representatives *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Representative-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Representative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
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
          </div>
          <div className="flex flex-col gap-2">
            <Label>Country of Origin * </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Việt Nam</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Production Capacity</Label>
            <div className="flex gap-1">
              <div className="relative w-[60%]">
                <Input placeholder="Enter quantity" />
                <div className="absolute top-1/2 right-0 -translate-x-[12px] -translate-y-1/2">
                  <div className="flex space-x-[3px]">
                    <button
                      key="Tentative Purchasing Volume Decrease1"
                      className="w-[24px] h-[24px] bg-[#C84646] text-white font-[900] rounded-[3px]"
                      onClick={(e) =>
                        decreasingPurchase(
                          e,
                          "expected_order_quantity.tentative_purchasing_volume.quantity"
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      key="Tentative Purchasing Volume Increase1"
                      className="w-[24px] h-[24px] bg-[#46C851] text-white font-[900] rounded-[3px]"
                      onClick={(e) =>
                        increasingPurchase(
                          e,
                          "expected_order_quantity.tentative_purchasing_volume.quantity"
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 w-[40%]">
                <Select key={"unit1"}>
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">VND</SelectItem>
                  </SelectContent>
                </Select>
                <Select key={"frequency1"}>
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="relative w-[60%]">
                <Input placeholder="Enter quantity" />
                <div className="absolute top-1/2 right-0 -translate-x-[12px] -translate-y-1/2">
                  <div className="flex space-x-[3px]">
                    <button
                      key="Tentative Purchasing Volume Decrease1"
                      className="w-[24px] h-[24px] bg-[#C84646] text-white font-[900] rounded-[3px]"
                      onClick={(e) =>
                        decreasingPurchase(
                          e,
                          "expected_order_quantity.tentative_purchasing_volume.quantity"
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      key="Tentative Purchasing Volume Increase1"
                      className="w-[24px] h-[24px] bg-[#46C851] text-white font-[900] rounded-[3px]"
                      onClick={(e) =>
                        increasingPurchase(
                          e,
                          "expected_order_quantity.tentative_purchasing_volume.quantity"
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 w-[40%]">
                <Select key={"unit1"}>
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">VND</SelectItem>
                  </SelectContent>
                </Select>
                <Select key={"frequency1"}>
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
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
            <Textarea placeholder="Provide detailed specifications of this product as much as possible" />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="border border-black"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddProduct;
