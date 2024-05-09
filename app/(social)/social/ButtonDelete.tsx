'use client'
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getRequest } from '@/hook/apiClient';
import React from 'react'

const ButtonDelete = ({ dt, user }: any) => {
    const { toast } = useToast();

    return (
        <div onClick={() => {
            getRequest("/post/delete/" + dt.code)
                .then(data => {
                    toast({
                        variant: "success",
                        title: "Success",
                        description: data?.message,
                    })
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                    toast({
                        variant: "destructive",
                        title: "Fail",
                        description: JSON.stringify(err?.response.data?.message),
                    })
                })
        }}
            className="w-full cursor-pointer text-red-700">Delete Post</div>
    )
}

export default ButtonDelete