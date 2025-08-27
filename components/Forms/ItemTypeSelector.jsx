"use client";
import { Label } from "@/components/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { GoQuestion } from "react-icons/go";
import Tooltip from "../Tooltip2";

export default function ItemTypeSelector({ itemType, onChange }) {
  return (
    <div className="flex items-start gap-x-4">
      <div className="flex items-center gap-1 w-[100px] text-sm font-normal">
        <Label htmlFor="item-type">
          Type
          <Tooltip
            content="Select if this item is a physical good or a service. Remember that you cannot change the type if this item is included in a transaction."
            placement="right"
          >
            <GoQuestion size={15} className="text-gray-800" />
          </Tooltip>
        </Label>
      </div>
      <RadioGroup
        id="item-type"
        defaultValue={itemType}
        onValueChange={onChange}
        className="flex gap-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="goods"
            id="goods"
            className="h-4 w-4 border border-gray-400 rounded-full data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label htmlFor="goods" className="text-sm text-gray-600">
            Goods
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="services"
            id="services"
            className="h-4 w-4 border border-gray-400 rounded-full data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label htmlFor="services" className="text-sm text-gray-600">
            Services
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
