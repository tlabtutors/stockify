import React from "react";
import DsFormHeader from "@/components/Forms/DsFormHeader";
import { X } from "lucide-react";
import InventoryItemForm from "@/components/Forms/InventoryItemForm";

const NewItemsGroup = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center  mt-20">
      <DsFormHeader
        title={`New Item Group`}
        href={`X`}
        elem={
          <button>
            <X />
          </button>
        }
      />
      <InventoryItemForm />
    </div>
  );
};

export default NewItemsGroup;
