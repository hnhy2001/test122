"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const formSchema = z.object({
    price: z.number(),
    total: z.number(),
    country: z.string(),
    delivery: z.string(),
    deleveryData: z.string()
})

const SubmitQuote = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Submit Quote
                </Button>
            </DialogTrigger>
            <DialogContent className='!max-w-[80%] md:!max-w-[60%] h-[70vh] p-0'>
                <div className='p-6'>
                    <p className='text-xl font-bold'>Submit Quote</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Suggested Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} placeholder="10000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitQuote