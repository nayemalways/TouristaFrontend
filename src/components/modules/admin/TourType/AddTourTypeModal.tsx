/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


// Main Component
export function AddTourModal() {
     const [isOpen, setIsOpen] = useState(false);
  const [addTour, { isLoading }] = useAddTourTypeMutation();

  // Fomr state
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  // Form Submit Hanlder
  const onSubmit = async (values: any) => {
    try {
      const result = await addTour(values);
      if (result?.data?.success) {
        toast.success(result.data.message);
        setIsOpen(false);
        form.reset();
        return;
      }
      // ERROR CASE
      if ("error" in result) {
        const errorMessage =
          (result.error as any)?.data?.message || "Something went wrong";
        toast.error(errorMessage);
        return;
      }

    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Dialog  open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add Tour Type <Plus/> </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tour Type</DialogTitle>
          <DialogDescription>
            Provide a name and create a tour type.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter tour type name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>

              {isLoading ? (
                <Spinner />
              ) : (
                <Button className="cursor-pointer" type="submit">
                  Add
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
