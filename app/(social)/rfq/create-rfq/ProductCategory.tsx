import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getRequest } from "@/hook/apiClient";
import { useEffect, useRef, useState } from "react";
import { any } from "zod";

const ProductCategory = (props: any) => {
  const [productSelected, setProductSelected] = useState<any>();
  const [attributeSelected, setAttributeSelected] = useState<any>([]);
  const [child, setChild] = useState<any>(false);
  const [filter, setFilter] = useState<any>();
  const [attribute, setAttribute] = useState<any>([]);
  const [yourSelect, setyourSelect] = useState<any>([]);

  const filterProductSearch = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.search(filter);
    }
  };

  const getAtribute = (e: any) => {
    props.productCategory(e)
    setProductSelected(e);
    getRequest("/product/attribute/" + e.code).then((data: any) => {
      const arr: any[] = [];
      setAttribute(Object.values(data.data));
    });
  };

  const getAttributeSelected = (e: any) => {
    setAttributeSelected((item: any) => {
      if (item.some((i: any) => i.code == e.code && i.value == e.value)) {
        const arr = [...item].filter(
          (i: any) => i.code != e.code && i.value != e.value
        );
        getYourSeclect(arr);
        return arr;
      } else {
        getYourSeclect([...item, e]);
        () => (props.setAtributeSelected([...item, e]))
        return [...item, e];
      }
    });
  };

  const getYourSeclect = (arrs: any) => {
    props.setAtributeSelected(arrs)
    const labelArr = arrs.map((e: any) => e.label);
    const labelSet = new Set(labelArr);
    const arr = [...labelSet];
    const result: any[] = [];
    arr.forEach((e: any) => {
      const arr: any[] = [];
      const obj = {
        label: e,
        arr: arr,
      };
      arrs.forEach((i: any) => {
        if (e == i.label) {
          arr.push(i);
        }
      });
      obj.arr = arr;
      result.push(obj);
    });
    setyourSelect(result);
  };
  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Search and select product category"
        onClick={() => setChild(!child)}
        className="!border !border-black"
        onChange={(event) => setFilter(event.target.value)}
        onKeyDown={filterProductSearch}
        // onBlur={() => !productSelected?setChild(false):""}
      ></Input>
      {child || productSelected ? (
        <div className="w-full border border-gray-400 px-2 py-2 rounded-lg">
          <div className="w-full">
            {!productSelected ? (
              <div className="w-full flex flex-col gap-2">
                <div className="h-[30vh] w-full overflow-y-scroll flex flex-col gap-2">
                  {props.options?.map((e: any, index:any) => (
                    <div key={index}
                      onClick={() => {
                        getAtribute(e)}}
                      className="flex px-2 items-center justify-between w-full h-[5vh] border border-gray-400 rounded-lg hover:bg-yellow-50 cursor-pointer"
                    >
                      <span className="text-lg">{e.code}</span>
                      <img
                        src={e.avatar}
                        alt=""
                        className="h-[4vh] aspect-square border border-back flex justify-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between px-2 items-center border border-gray-400 h-[5vh] rounded-lg">
                  <span className="text-lg">{productSelected.code}</span>
                  <div className="flex gap-4 items-center">
                    <img
                      src={productSelected.avatar}
                      alt=""
                      className="h-[4vh] aspect-square border border-back flex justify-center"
                    />
                    <span
                      className="text-2xl font-bold cursor-pointer"
                      onClick={() => {
                        setAttributeSelected([])
                        props.setAtributeSelected([])
                        setyourSelect([])
                        setProductSelected(undefined);
                        setChild(false);
                        props.productCategory(undefined)
                      }}
                    >
                      x
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-lg">Attributes</span>
                  <span className="text-lg">Optional</span>
                </div>

                {/* <Input className="!h-14" placeholder="Search" /> */}

                <div className="w-full flex flex-col border border-black ">
                  {attribute?.map((e: any, index:any) => {
                    return (
                      <div key={index}>
                        <div className="h-14 bg-slate-200 flex items-center pl-4 text-gray-400 font-bold rounded-t-lg">
                          {e[0]?.label}
                        </div>
                        <div className="flex gap-2 px-6 flex-col py-6">
                          {e?.map((i: any, index:any) => (
                            <div className="flex gap-2 items-center" key={index}>
                              <Checkbox checked={attributeSelected?.filter((check: any) => check.code == i.code && check.value == i.value).length>0}
                                onClick={() => getAttributeSelected(i)}
                              />
                              <span>{i.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                </div>
                <div className="w-full border border-black flex flex-col gap-4 px-6 py-6">
                  <span className="text-xl font-bold text-gray-500">
                    YOUR SELECTION (<span>{attributeSelected?.length}</span>)
                  </span>
                  {yourSelect?.map((e: any, index:any) => (
                    <div className="flex flex-col gap-2" key={index}>
                      <span className="text-lg font-semibold text-gray-500">
                        {e.label}
                      </span>
                      <div className="flex gap-2 flex-wrap  ">
                        {e.arr?.map((i: any, index:any) => (
                          <div className="flex border border-black rounded-sm" key={index}>
                            <div className="flex items-center justify-center py-2 px-2 border-r border-black text-sm font-semibold text-gray-500">
                              {i.value}
                            </div>
                            <span onClick={() => getAttributeSelected(i)} className="flex items-center justify-center py-2 px-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-slate-200">
                              x
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductCategory;
