import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AddPhoto = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-[120px] h-[48px] text-xl font-bold bg-primary rounded-[7px] text-white flex items-center gap-2 justify-center">
          <div>+</div>
          <div>Add photos</div>
        </button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Photo</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label>Title *</Label>
            <Input placeholder="Enter title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea placeholder="Enter Description" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Photo *</Label>
            <DragDropPhoto/>
          </div>
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
};
export default AddPhoto;
