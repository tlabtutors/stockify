import React from "react";
import NewItemEntryForm from "@/components/Forms/NewItemEntryForm";
import DsFormHeader from "@/components/Forms/DsFormHeader";
import { X } from "lucide-react";
const NewItems = () => {
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
      <NewItemEntryForm />
    </div>
  );
};

export default NewItems;
