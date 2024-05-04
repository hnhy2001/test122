'use client'
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react'
import RFQItem from '../../rfq/RFQItem';
import LoadMoreRFQ from '../../buyer/[id]/LoadMoreRfq';
import { getRequest } from '@/hook/apiClient';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

const RFQSTab = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const user = session?.user;
      setUser(user)
      setLoading(true);
      getRequest(
        "/rfq/list?buyer_code=" + user?.code + "&page=1&limit=2"
      )
        .then((data: any) => setData(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    })();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="py-8 grid md:grid-cols-2 gap-12 relative container">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">RFQs</p>
        <div className="text-xs text-[#8C8585]">
          To create new rfq, go to the{" "}
          <Link href={"/rfq/create-rfq"} className="text-primary underline">
            RFQ
          </Link>{" "}
          page
        </div>
        <div className="flex flex-col gap-20 col-span-2">
          {data?.data.map((rfq: any) => (
            <RFQItem key={rfq.code} dt={rfq} user={user} />
          ))}
          <LoadMoreRFQ id={user?.code} length={data?.data.length} total={data?.total_record} user={user} />
        </div>
      </div>
    </div>

  )
}

export default RFQSTab