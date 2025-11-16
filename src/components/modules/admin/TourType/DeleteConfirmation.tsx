
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
  loading: boolean;
}

export function DeleteConfirmation({ children, onConfirm, loading }: IProps) {
  
  const handleConfirm = () => {
    onConfirm();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
         { children }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your
            Tour Type.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          {
            loading ? <Spinner/> : <AlertDialogAction onClick={handleConfirm} className="cursor-pointer">Continue</AlertDialogAction>
          }
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
