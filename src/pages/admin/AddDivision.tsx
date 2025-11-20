import { AddDivisionModal } from "@/components/modules/admin/Division/AddDivisionModal";
import { EditDivisionModal } from "@/components/modules/admin/Division/EditDivisionModal";
import { DeleteConfirmation } from "@/components/modules/admin/TourType/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import {
  useDeleteDivisionMutation,
  useGetDivisionQuery,
} from "@/redux/features/division/division.api";
import { Edit2, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

const AddDivision = () => {
  const { data } = useGetDivisionQuery(undefined);
  const [deleteDivision, { isLoading: divisonDeleteLoading }] =
    useDeleteDivisionMutation();

  const handleDelete = async (divisionId: string) => {
    const res = await deleteDivision(divisionId);
    if (res.data.success) {
      toast.success(res.data.message);
      return;
    }

    toast.error("Delete failed");
  };

  return (
    <div className="w-full h-screen max-w-3xl m-auto">
      <AddDivisionModal />
      <div className="border border-muted rounded-md">
        <div className="rounded-md w-full h-screen">
          <ul className="py-4">
            {data &&
              data.map(
                (item: { _id: string; name: string; thumbnail: string }) => (
                  <li key={item._id} className="border-b-2">
                    <div className="flex items-center bg-muted shadow rounded-lg p-3 max-h-[120px]">
                      {/* Image */}
                      <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <img
                          src={item.thumbnail}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Title */}
                      <div className="flex-1 px-4">
                        <h3 className="text-lg font-medium text-muted-foreground truncate text-center">
                          {item.name}
                        </h3>
                      </div>
                      {/* Buttons */}
                      <div className="flex gap-2 items-center">
                        <EditDivisionModal id={item._id}>
                          <Button className="px-3 py-1  text-sm text-white rounded cursor-pointer">
                            <Edit2 />
                          </Button>
                        </EditDivisionModal>
                        <DeleteConfirmation
                          loading={divisonDeleteLoading}
                          onConfirm={() => handleDelete(item?._id)}
                        >
                          <Button className="px-3 py-1 text-sm text-white rounded cursor-pointer">
                            <Trash2Icon />
                          </Button>
                        </DeleteConfirmation>
                      </div>
                    </div>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddDivision;
