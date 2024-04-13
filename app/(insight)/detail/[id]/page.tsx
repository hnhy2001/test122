import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DetailInsight = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-3 pt-[3.125rem]">
        <div className="col-span-2">
          <p className="text-xl font-bold text-[#4A4A4A] pb-[0.875rem]">News</p>
          <p className="text-[2rem] font-bold text-[#4A4A4A] pb-[0.875rem]">
            Philippines plans to establish corn competitiveness enhancement fund
            to promote local corn industry development
          </p>
          <div className="flex gap-[0.625rem] pb-[0.875rem]">
            <Badge>Maize (Corn)</Badge>
            <Badge>Meat</Badge>

            <Badge>Philippines</Badge>

            <Badge>Regulation & Compliances</Badge>
            <Badge>Innovation & Technology</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-[1.875rem] text-bold text-[#939AA1]">
              <div className="flex gap-[0.4375rem]">
                <Image
                  src={"/penci.png"}
                  alt="penci"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-cover"
                />
                <span>Susantimes</span>
              </div>
              <div className="flex gap-[0.4375rem]">
                <Image
                  src={"/time.png"}
                  alt="penci"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-cover"
                />
                <span>Mar 18, 2024</span>
              </div>
            </div>
            <div className="flex gap-2 relative w-52 justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                <path
                  fillRule="evenodd"
                  d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute top-8 flex gap-[0.625rem] shadow-xl px-[0.8125rem] py-[0.3125rem]">
                <Image
                  alt="Facebook"
                  src={"/fb.png"}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <Image
                  alt="linkedin"
                  src={"/linkedin.png"}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <Image
                  alt="X"
                  src={"/x.png"}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <Image
                  alt="Mail"
                  src={"/mail.png"}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <Image
                  alt="Link"
                  src={"/Link.png"}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 pt-[4.125rem] gap-10 relative">
        <div className="col-span-2">
          <div>
            <p className="font-bold text-xl">Necessitatibus et cum id odit. </p>
            <h1>Necessitatibus et cum id odit.</h1>
            <p>
              Consequatur ullam atque nesciunt eligendi perspiciatis. Aut
              voluptatem ut sint iusto quis qui distinctio quis. Veritatis et
              est sit facilis officia et culpa aspernatur. Est iure explicabo
              omnis vel odio non placeat magni. The Philippine Senate Committee
              on Agriculture, Food and Land Reform has introduced Senate Bill
              No. 2625, or the Corn Development Act, spearheaded by Chairperson
              Cynthia Villar. This bill aims to boost the local corn industry,
              which had a self-sufficiency rate of only 57% in 2020, by creating
              a corn competitiveness enhancement fund. With an annual allocation
              of 3 billion pesos from tariffs on imported corn, the fund seeks
              to support the development of the local corn sector over the next
              ten years. This initiative is designed to complement the
              Livestock, Poultry and Dairy Industry Development Act, addressing
              the high costs of seed and fertilizer, and supporting over 4
              million livelihoods in the corn and livestock sectors. The
              Philippine Senate Committee on Agriculture, Food and Land Reform
              has introduced Senate Bill No. 2625, or the Corn Development Act,
              spearheaded by Chairperson Cynthia Villar. This bill aims to boost
              the local corn industry, which had a self-sufficiency rate of only
              57% in 2020, by creating a corn competitiveness enhancement fund.
              With an annual allocation of 3 billion pesos from tariffs on
              imported corn, the fund seeks to support the development of the
              local corn sector over the next ten years. This initiative is
              designed to complement the Livestock, Poultry and Dairy Industry
              Development Act, addressing the high costs of seed and fertilizer,
              and supporting over 4 million livelihoods in the corn and
              livestock sectors. The Philippine Senate Committee on Agriculture,
              Food and Land Reform has introduced Senate Bill No. 2625, or the
              Corn Development Act, spearheaded by Chairperson Cynthia Villar.
              This bill aims to boost the local corn industry, which had a
              self-sufficiency rate of only 57% in 2020, by creating a corn
              competitiveness enhancement fund. With an annual allocation of 3
              billion pesos from tariffs on imported corn, the fund seeks to
              support the development of the local corn sector over the next ten
              years. This initiative is designed to complement the Livestock,
              Poultry and Dairy Industry Development Act, addressing the high
              costs of seed and fertilizer, and supporting over 4 million
              livelihoods in the corn and livestock sectors. The Philippine
              Senate Committee on Agriculture, Food and Land Reform has
              introduced Senate Bill No. 2625, or the Corn Development Act,
              spearheaded by Chairperson Cynthia Villar. This bill aims to boost
              the local corn industry, which had a self-sufficiency rate of only
              57% in 2020, by creating a corn competitiveness enhancement fund.
              With an annual allocation of 3 billion pesos from tariffs on
              imported corn, the fund seeks to support the development of the
              local corn sector over the next ten years. This initiative is
              designed to complement the Livestock, Poultry and Dairy Industry
              Development Act, addressing the high costs of seed and fertilizer,
              and supporting over 4 million livelihoods in the corn and
              livestock sectors. The Philippine Senate Committee on Agriculture,
              Food and Land Reform has introduced Senate Bill No. 2625, or the
              Corn Development Act, spearheaded by Chairperson Cynthia Villar.
              This bill aims to boost the local corn industry, which had a
              self-sufficiency rate of only 57% in 2020, by creating a corn
              competitiveness enhancement fund. With an annual allocation of 3
              billion pesos from tariffs on imported corn, the fund seeks to
              support the development of the local corn sector over the next ten
              years. This initiative is designed to complement the Livestock,
              Poultry and Dairy Industry Development Act, addressing the high
              costs of seed and fertilizer, and supporting over 4 million
              livelihoods in the corn and livestock sectors.
            </p>
            <p>
              Blanditiis dolor dolor deleniti exercitationem ea non accusantium.
              Impedit saepe minus et beatae harum. Quibusdam commodi possimus
              facere esse voluptatem voluptates nobis.
            </p>
            <p>
              Voluptates quia dolore corporis quia tempore. Quae qui officia
              provident eius.
            </p>
            <p>
              Veniam pariatur aut quia veniam pariatur. Incidunt perspiciatis
              enim reprehenderit nihil odio rerum. Saepe et est blanditiis
              molestiae sunt at.
            </p>
          </div>
          <div className="text-xl pt-8">
            Source: <span className="text-[081342] underline">Foodmate</span>
          </div>
          <div className="pt-[6.25rem]">
            <p className="font-bold text-xl pb-[2.5rem]">
              Read more relevant content
            </p>
            <div className="grid grid-cols-3 gap-x-[1.875rem] gap-y-[2.3125rem]">
              {Array.from({ length: 6 }).map((value: any, index: any) => (
                <Link href={"#"} target="_blank" key={index}>
                  <div className="flex flex-col">
                    <p className="font-bold text-[#4A4A4A] text-base">News</p>
                    <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                      Peru: Non-traditional agricultural exports increased by
                      16.9% in January 2024
                    </p>
                    <div className="flex justify-between text-bold text-[#939AA1]">
                      <div className="flex gap-[0.4375rem]">
                        <Image
                          src={"/penci.png"}
                          alt="penci"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-cover"
                        />
                        <span>Susantimes</span>
                      </div>
                      <div className="flex gap-[0.4375rem]">
                        <Image
                          src={"/time.png"}
                          alt="penci"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-cover"
                        />
                        <span>Mar 18, 2024</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="font-bold text-xl py-[2.5rem]">
              Recommended suppliers for you
            </p>
            <div className="grid grid-cols-3 gap-3 pb-[4.375rem]">
              <div className="flex flex-col gap-4 shadow-lg rounded-lg p-5">
                <Link
                  target="_blank"
                  href={"#"}
                  className="flex flex-col gap-2"
                >
                  <Image
                    src={"/fb.png"}
                    alt={"fb"}
                    width={266}
                    height={266}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="flex gap-3 justify-between">
                    <div>
                      <p className="font-bold text-[#081440]">
                        Al Foah Date Company
                      </p>
                      <div className="flex gap-2 items-center">
                        <Image
                          src={"/Link.png"}
                          alt="flag"
                          width={21}
                          height={18}
                          className="w-6 h-5"
                        />
                        <p className="font-bold text-xs">
                          United Arab Emirates - Food manufacturing / Far...
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-blue-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <Image
                      src={"/x.png"}
                      alt={"x"}
                      width={62}
                      height={62}
                      className="aspect-square w-16 object-cover"
                    />
                  </div>
                  <p className="font-bold text-xs text-[#939AA1] line-clamp-2 min-h-[2rem]">
                    Products: Dried Date · Value Added Date Export
                    History: Africa · Asia · Europe · North
                    America · Oceania · Sout...
                  </p>
                </Link>
                <Link
                  className="flex gap-6 items-center justify-between"
                  href={"#"}
                >
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/Link.png"}
                      alt={"flag"}
                      width={56}
                      height={56}
                      className="w-14 h-14 aspect-square object-cover"
                    />
                    <p className="text-xs font-semibold break-all line-clamp-1">
                      Khalas Dates 500g Pouch
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>

                <div className="flex gap-2 items-center">
                  <Button>Contact now</Button>
                  {/* <Image src={'/folder.png'} width={24} height={24} className='h-6 w-6' alt='folder' /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky h-20 top-0">
          <p className="text-2xl font-bold pb-[1rem]">What to read next</p>
          <div className="flex flex-col gap-[2.5rem]">
            <Link href={"#"} target="_blank">
              <div className="flex flex-col">
                <p className="font-bold text-[#4A4A4A] text-base">News</p>
                <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                  Peru: Non-traditional agricultural exports increased by 16.9%
                  in January 2024
                </p>
                <div className="flex justify-between text-bold text-[#939AA1]">
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/penci.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>Susantimes</span>
                  </div>
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/time.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>Mar 18, 2024</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"#"} target="_blank">
              <div className="flex flex-col">
                <p className="font-bold text-[#4A4A4A] text-base">News</p>
                <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                  Peru: Non-traditional agricultural exports increased by 16.9%
                  in January 2024
                </p>
                <div className="flex justify-between text-bold text-[#939AA1]">
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/penci.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>Susantimes</span>
                  </div>
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/time.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>Mar 18, 2024</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"#"} target="_blank">
              <div className="flex flex-col">
                <p className="font-bold text-[#4A4A4A] text-base">News</p>
                <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                  Peru: Non-traditional agricultural exports increased by 16.9%
                  in January 2024
                </p>
                <div className="flex justify-between text-bold text-[#939AA1]">
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/penci.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>Susantimes</span>
                  </div>
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/time.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>Mar 18, 2024</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInsight;
