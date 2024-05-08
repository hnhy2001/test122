import { getRequest } from '@/hook/api';
import React from 'react'
import RFQItem from '../../rfq/RFQItem';
import LoadMoreRFQ from './LoadMoreRfq';

const RfqTab = async ({ id, user }: any) => {
    let rfqs: any = [];
    let total_rfq;
    try {
        let r_ = await getRequest(
            "/rfq/list?buyer_code=" + id + "&page=1&limit=2"
        );
        rfqs = r_?.data;
        total_rfq = r_?.total_record;
    } catch (error) { }
    return (
        <div className="flex flex-col gap-20 col-span-2">
            {rfqs.map((rfq: any) => (
                <RFQItem key={rfq.code} dt={rfq} user={user} />
            ))}
            <LoadMoreRFQ id={id} length={rfqs.length} total={total_rfq} user={user} />
        </div>
    )
}

export default RfqTab