"use client";

import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input"; // Import your input component
import { RiSettings4Line } from "react-icons/ri";
export default function ManufacturerSelect({ value, onChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [manufacturers, setManufacturers] = useState([
    "TechTraders",
    "TeoTraders",
  ]);
  const [addingNew, setAddingNew] = useState(false);
  const [newManufacturer, setNewManufacturer] = useState("");

  const handleSave = () => {
    if (!newManufacturer.trim()) return;
    const updated = [...manufacturers, newManufacturer.trim()];
    setManufacturers(updated);
    onChange(newManufacturer.trim()); // set and select
    setNewManufacturer("");
    setAddingNew(false);
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-x-5 w-[300px]">
        <label className="block w-[100px]">Manufacturer</label>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select or add Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {manufacturers.length > 0 ? (
                manufacturers.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <div className="px-4 py-2 text-muted-foreground">
                  No manufacturers found
                </div>
              )}
              <div className="border-t mt-2 pt-2 px-4">
                <Button
                  variant="button"
                  className="text-blue-600 p-0 h-auto flex space-x-2"
                  onClick={() => setModalOpen(true)}
                >
                  <RiSettings4Line /> Manage Manufacturers
                </Button>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Manufacturers</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            {!addingNew ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setAddingNew(true)}
              >
                + New Manufacturer
              </Button>
            ) : (
              <div className="space-y-3 bg-gray-50 p-4 rounded border">
                <label className="text-red-600 font-semibold">
                  Manufacturer Name<span className="ml-1 text-red-500">*</span>
                </label>
                <Input
                  value={newManufacturer}
                  onChange={(e) => setNewManufacturer(e.target.value)}
                  placeholder="Enter name"
                  required
                />
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSave}
                  >
                    Save and Select
                  </Button>
                  <Button variant="outline" onClick={() => setAddingNew(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="text-xs font-semibold text-gray-500">
              MANUFACTURERS
            </div>
            <ul className="space-y-1">
              {manufacturers.map((name) => (
                <li key={name} className="text-sm text-gray-800">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
