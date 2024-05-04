'use client'
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { postRequest } from '@/hook/apiClient';
import React from 'react'

const ButtonShare = ({ dt, user }: any) => {
    const { toast } = useToast();

    return (
        <Button variant={'outline'} onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/social/' + dt.content.split(' ').join('-') + "-i." + dt.code).then(() => {
                postRequest("/post/update", {
                    code: dt.code,
                    share: 1,
                    user_role: user.role,
                })
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Copy link post",
                })
            }).catch(err => {
                console.error('Không thể sao chép: ', err);
            });
        }} className="w-full">Copy link</Button>
    )
}

export default ButtonShare