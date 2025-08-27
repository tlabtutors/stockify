import React from "react";
import DsFormHeader from "@/components/Forms/DsFormHeader";
import { X } from "lucide-react";
import NewItemEntryForm from "@/components/Forms/NewItemEntryForm";

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
      <NewItemEntryForm />
    </div>
  );
};

export default NewItemsGroup;
