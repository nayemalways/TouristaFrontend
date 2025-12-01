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
import { ChevronDownIcon, Plus, Trash } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { formatISO } from "date-fns";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { Spinner } from "@/components/ui/spinner";
import { formSchema } from "@/zodSchema/tour.schema";
import { toast } from "sonner";
import { useDynamicInputField } from "@/hooks/useDynamicInputField";

// Main Components
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
      minAge: "",
      costFrom: "",
      startDate: undefined,
      endDate: undefined,
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      tourPlan: [{ value: "" }],
      amenities: [{ value: "" }],
    },
  });

  // Dynamic input field
  const {
    fields: includedFields,
    append: includedAppend,
    remove: includedRemove,
  } = useDynamicInputField(form.control, "included");
  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useDynamicInputField(form.control, "excluded");
  const {
    fields: tourPlanFields,
    append: tourPlanAppend,
    remove: tourPlanRemove,
  } = useDynamicInputField(form.control, "tourPlan");
  const {
    fields: amenitiesFields,
    append: amenitiesAppend,
    remove: amenitiesRemove,
  } = useDynamicInputField(form.control, "amenities");

  // Redux query
  const { data: divisionData } = useGetDivisionQuery(undefined);
  const { data: tourTypeData } = useGetTourTypeQuery(undefined);
  const [addTour, { isLoading }] = useAddTourMutation();

  // Form Submit
  const onSubmit = async (values: FieldValues) => {
    const tourPayload = {
      ...values,
      startDate: formatISO(values.startDate),
      minAge: Number(values.minAge),
      costFrom: Number(values.costFrom),
      endDate: formatISO(values.endDate),
      included: values?.included.map((item: { value: string }) => item.value),
      excluded: values?.excluded.map((item: { value: string }) => item.value),
      tourPlan: values?.excluded.map((item: { value: string }) => item.value),
      amenities: values?.excluded.map((item: { value: string }) => item.value),
    };

    console.log(tourPayload);

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(tourPayload));
    images.map((image) => formdata.append("files", image as File));

    try {
      const res = await addTour(formdata).unwrap();

      if (res.success) {
        toast.success(res.message);

        // Clear form
        form.reset();
        setImages([]);
        return;
      }
    } catch (error) {
      console.log(error);

      // Clear form
      form.reset();
      setImages([]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message);
    }
  };

  return (
    <div className="w-full max-w-5xl m-auto h-auto min-h-screen flex flex-col justify-center items-center ">
      <div>
        <h3 className="text-3xl  text-center text-primary font-bold mb-4">
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
                          <SelectValue placeholder="Select a Division" />
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
                          <SelectValue placeholder="Select a Tour Type" />
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
                          className="w-full justify-between text-muted-foreground"
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select start date"}
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
                          className="w-full justify-between text-muted-foreground "
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select end date"}
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

            {/* Cost and Age Limit  */}
            <div className="flex justify-between gap-5">
              <div className="flex flex-col gap-3 flex-1">
                <FormField
                  control={form.control}
                  name="costFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost From</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. 7000 TK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <FormField
                  control={form.control}
                  name="minAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minumum Age </FormLabel>
                      <FormControl>
                        <Input placeholder="eg. 16" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
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
              <MultipleImageUploader value={images} onChange={setImages} />
            </div>

            {/* ---------------------------Multifield Input Part---------------------------------- */}
            <div className="flex flex-col gap-4">
              <h3>Others</h3>
              {/* Multifield Input -Included */}
              <div className="border-t border-slate-700 w-full"></div>
              <div className="flex justify-between">
                <p className="">Included</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => includedAppend({ value: "" })}
                  className="cursor-pointer bg-muted-foreground "
                >
                  <Plus />
                </Button>
              </div>

              {includedFields.map((item, index) => (
                <div key={index} className="flex justify-between gap-2   ">
                  <FormField
                    control={form.control}
                    name={`included.${index}.value`}
                    key={item.id}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>{index + 1}</FormLabel> */}
                        <FormControl>
                          <Input placeholder="eg. Free WiFi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={() => includedRemove(index)}
                    type="button"
                    variant="link"
                    size="icon"
                    className="cursor-pointer "
                  >
                    <Trash />
                  </Button>
                </div>
              ))}

              {/* Multifield Input -Exluded */}
              <div className="border-t border-slate-700 w-full"></div>
              <div className="flex justify-between">
                <p className="">Exluded</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => excludedAppend({ value: "" })}
                  className="cursor-pointer bg-muted-foreground "
                >
                  <Plus />
                </Button>
              </div>

              {excludedFields.map((item, index) => (
                <div key={index} className="flex justify-between gap-2 mt-1 ">
                  <FormField
                    control={form.control}
                    name={`excluded.${index}.value`}
                    key={item.id}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>{index + 1}</FormLabel> */}
                        <FormControl>
                          <Input placeholder="eg. Subsidize meal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={() => excludedRemove(index)}
                    type="button"
                    variant="link"
                    size="icon"
                    className="cursor-pointer "
                  >
                    <Trash />
                  </Button>
                </div>
              ))}

              {/* Multifield Input - Add tour plan */}
              <div className="border-t border-slate-700 w-full"></div>
              <div className="flex justify-between">
                <p className="">Add Tour plan</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => tourPlanAppend({ value: "" })}
                  className="cursor-pointer bg-muted-foreground "
                >
                  <Plus />
                </Button>
              </div>

              {tourPlanFields.map((item, index) => (
                <div key={index} className="flex justify-between gap-2 mt-1 ">
                  <FormField
                    control={form.control}
                    name={`tourPlan.${index}.value`}
                    key={item.id}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>{index + 1}</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="eg. Day-1: Hiking on the heal!"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={() => tourPlanRemove(index)}
                    type="button"
                    variant="link"
                    size="icon"
                    className="cursor-pointer "
                  >
                    <Trash />
                  </Button>
                </div>
              ))}

              {/* Multifield Input - Add tour plan */}
              <div className="border-t border-slate-700 w-full"></div>
              <div className="flex justify-between">
                <p className="">Amenities</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => amenitiesAppend({ value: "" })}
                  className="cursor-pointer bg-muted-foreground "
                >
                  <Plus />
                </Button>
              </div>

              {amenitiesFields.map((item, index) => (
                <div key={index} className="flex justify-between gap-2 mt-1 ">
                  <FormField
                    control={form.control}
                    name={`amenities.${index}.value`}
                    key={item.id}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>{index + 1}</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="eg. Air conditions Hotel room"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={() => amenitiesRemove(index)}
                    type="button"
                    variant="link"
                    size="icon"
                    className="cursor-pointer "
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
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
