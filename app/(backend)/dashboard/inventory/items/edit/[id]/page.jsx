import React from "react";
import InventoryItemEditForm from "@/components/Forms/InventoryItemEditForm";
import DsFormHeader from "@/components/Forms/DsFormHeader";
import { X } from "lucide-react";
const EditItem = ({ params }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-2">
      <DsFormHeader
        title="New Item"
        href="/#"
        elem={
          <button>
            <X />
          </button>
        }
      />
      <InventoryItemEditForm itemId={params.id} />
    </div>
  );
};

export default EditItem;
