import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AddSuccessfullDeal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Successful Deal
          </DialogTitle>
          <div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 text-base flex flex-col gap-4">
                <div>Official website</div>
                <div className="text-[#939AA1]">
                  An official website address of your company
                </div>
              </div>
              <div className="text-end">
                <Button variant="default" size={"lg"}>
                  Update
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 text-base flex flex-col gap-4">
                <div>
                  Social media account: LinkedIn, Instagram, Facebook, Twitter
                </div>
                <div className="text-[#939AA1]">
                  Social media account(s) managed by your company
                </div>
              </div>
              <div className="text-end">
                <Button variant="default" size={"lg"}>
                  Update
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 text-base flex flex-col gap-4">
                <div>Business Registration Number</div>
                <div className="text-[#939AA1]">
                  Your company’s business registration number
                </div>
              </div>
              <div className="text-end">
                <Button variant="default" size={"lg"}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default AddSuccessfullDeal;