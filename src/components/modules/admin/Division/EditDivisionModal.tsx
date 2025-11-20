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
import SingleFileUploader from "@/components/ui/SingleFileUploader";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {  useGetDivisionQuery, useUpdateDivisionMutation } from "@/redux/features/division/division.api";
import { useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Main Component
export function EditDivisionModal({children, id} : {children: ReactElement, id: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [updateDivision, { isLoading }] = useUpdateDivisionMutation();
  const { data } = useGetDivisionQuery(undefined);

  const divisionDetails = data.filter((item: {_id: string, name: string}) => item?._id === id)[0];

  // Form state
  const form = useForm({
    defaultValues: {
      name: divisionDetails?.name,
      description: divisionDetails?.description,
    },
  });

 
  // Form Submit Hanlder
  const onSubmit = async (values: any) => {
    try {
      const formdata = new FormData();

      formdata.append("data", JSON.stringify(values));
      formdata.append("file", image as File);

      const result = await updateDivision({formdata, divisionId: id});

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
    <div  >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="my-8 ">
          <DialogTrigger asChild>
           {
            children
           }
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Division</DialogTitle>
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
              <SingleFileUploader defaultImage={divisionDetails?.thumbnail} onChange={setImage} />

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
                    Save changes
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
