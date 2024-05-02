"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DragDropPhoto from '@/components/ui/drag-drop-photo';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'

const WhyUs = () => {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ Add</Button>
          </DialogTrigger>
          <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Create Why us
              </DialogTitle>
            </DialogHeader>
            <div className="grid flex-1 gap-2">
              <Label className="text-base">Cover *</Label>
              <DragDropPhoto/>
            </div>
            <div className="grid flex-1 gap-2">
              <Label className="text-base">Content</Label>
              <Textarea value="" placeholder="Write story about the company" />
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
}

export default WhyUs