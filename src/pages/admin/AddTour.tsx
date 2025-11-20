"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { formatISO } from "date-fns";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// Form Zod Schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least  characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least  characters.",
  }),
  division: z.string().min(24, {
    message: "Please select a division",
  }),
  tourType: z.string().min(24, {
    message: "Please select a Tour Type",
  }),
  startDate: z.date({ message: "Start date required" }),
  endDate: z.date({ message: "End date required" }),
});

function AddTour() {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [images, setImages] = useState<(File | FileMetadata)[]>([]);

  // Use Form Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      division: "",
      tourType: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { data: divisionData } = useGetDivisionQuery(undefined);
  const { data: tourTypeData } = useGetTourTypeQuery(undefined);
  const [addTour, { isLoading }] = useAddTourMutation();

  // Form Submit
  const onSubmit = async (values: FieldValues) => {
    const tourPayload = {
      ...values,
      startDate: formatISO(values.startDate),
      endDate: formatISO(values.endDate),
    };

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(tourPayload));
    images.map((image) => formdata.append("files", image as File));

    try {
      const res = await addTour(formdata).unwrap();

      if (res.success) {
        toast.success(res.message);
        return;
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message);
    }
  };

  return (
    <div className="w-full max-w-5xl m-auto h-auto min-h-screen flex flex-col justify-center items-center ">
      <div>
        <h3 className="text-3xl  text-center text-primary font-bold">
          Add Tour
        </h3>
      </div>
      <div className="w-full max-w-xl m-auto bg-muted px-6 py-8 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Cox's bazar sea beach camping"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-5">
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {divisionData &&
                              divisionData.map(
                                (
                                  item: { _id: string; name: string },
                                  i: number
                                ) => (
                                  <SelectItem key={i} value={item?._id}>
                                    {item?.name}
                                  </SelectItem>
                                )
                              )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Tour Types</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {tourTypeData &&
                              tourTypeData.map(
                                (
                                  item: { _id: string; name: string },
                                  i: number
                                ) => (
                                  <SelectItem key={i} value={item?._id}>
                                    {item?.name}
                                  </SelectItem>
                                )
                              )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Calender  */}
            <div className="flex justify-between gap-5">
              <div className="flex flex-col gap-3 flex-1">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <Popover open={startOpen} onOpenChange={setStartOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setStartOpen(false);
                          }}
                          //   Enable toaday's date also
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <Popover open={endOpen} onOpenChange={setEndOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setEndOpen(false);
                          }}
                          //   Enable toaday's date also
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>

            {/* Description  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-43"
                      placeholder="Enter tour details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multiple Image uploader  */}
            <div>
              <MultipleImageUploader onChange={setImages} />
            </div>

            {isLoading ? (
              <Spinner />
            ) : (
              <Button className="cursor-pointer" type="submit">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddTour;
