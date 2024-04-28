'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'

const SendMessage = () => {
    const route = useRouter()
    const { toast } = useToast();
    return (
        <Button onClick={() =>
            getSession().then((session) => {
                let user = session?.user;
                if (!user) {
                    toast({
                        variant: "warning",
                        title: "Warning!",
                        description: "Please Login",
                        action: <ToastAction altText="Try again">Done</ToastAction>,
                    });
                    route.push('/signin')
                }
            })
        }
        > Send Message</Button >
    )
}

export default SendMessage