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
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/tour/tour.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Main Component
export function AddDivisionModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [addDivision, { isLoading }] = useAddDivisionMutation();

  // Fomr state
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Form Submit Hanlder
  const onSubmit = async (values: any) => {
    try {
      const divisionPayload = {...values};
      const result = await addDivision(divisionPayload);
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
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-between my-8">
            <h1 className="text-xl font-semibold">Division</h1>
            <Button className="cursor-pointer" variant="outline">
              Add Tour Type
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
            <DialogDescription>
              Provide a name and add a Divison.
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
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Write here" />
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
    </div>
  );
}
