'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateRFQ = () => {
    const [open, setOpen] = useState(false);
    const route = useRouter()
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="!max-w-[80%] md:!max-w-[30%] p-0">
                    <div className="flex gap-4 items-center justify-between p-4">
                        <Image
                            src={"/alert.png"}
                            alt="alert"
                            width={64}
                            height={64}
                            className="w-16 h-16 object-contain"
                        />
                        <div>
                            <p>You need to switch to supplier</p>
                        </div>
                        <div className="flex items-start h-full">
                            <DialogClose><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Button onClick={() => {
                getSession().then((session) => {
                    let user = session?.user;
                    if (user.role != "SELLER") {
                        route.push("/rfq/create-rfq");
                    } else {
                        setOpen(true);
                    }
                });
            }}>+ Create RFQ</Button>
        </div>
    )
}

export default CreateRFQ