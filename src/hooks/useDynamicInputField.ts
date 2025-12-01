import type { DynamicField } from "@/types/inputField.types";
import type { formSchema } from "@/zodSchema/tour.schema";
import { useFieldArray, type Control } from "react-hook-form";
import type { z } from "zod";


export const useDynamicInputField = (formControl: Control<z.infer<typeof formSchema>>, name: DynamicField ) => {
    const { fields, append, remove } = useFieldArray({
        control: formControl,
        name: name,
      });

      return { fields, append, remove };
}