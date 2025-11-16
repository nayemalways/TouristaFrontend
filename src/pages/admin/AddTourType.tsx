import { AddTourModal } from "@/components/modules/admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/modules/admin/TourType/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";


// Main component
const AddTourType = () => {
  const { data } = useGetTourTypeQuery(undefined);
  const [removeTourType, {isLoading}] = useRemoveTourTypeMutation();

  // Handle Tour Type Delete
  const handleDelete = async (id: string) => {
    const res = await removeTourType(id);
    if(res.data.success) {
        toast.success(res.data.message);
        return
    }

    toast.error("Delete failed");
  }

  return (
    <div className="w-full h-screen max-w-7xl m-auto ">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Type</h1>
         <AddTourModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader className="bg-slate-500 rounded-2xl ">
            <TableRow>
              <TableHead className="w-[100px] text-center border-r-2 ">
                #No
              </TableHead>
              <TableHead className="text-center w-full">
                Tour Type Name
              </TableHead>
              <TableHead className="text-right w-full">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: {_id: string, name: string }, i: number) => (
              <TableRow key={i + 1}>
                <TableCell className="font-medium border-r-2">
                  {i + 1}
                </TableCell>
                <TableCell className="text-center">{item?.name}</TableCell>
                <TableCell className="text-right">
                    <DeleteConfirmation loading={isLoading} onConfirm={() => handleDelete(item?._id)} >
                        <Button className="cursor-pointer" >
                            <Trash2/>
                        </Button>
                    </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
