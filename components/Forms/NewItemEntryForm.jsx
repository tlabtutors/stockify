"use client";
import React, { useState } from "react";
import { GoQuestion } from "react-icons/go";
import Tooltip from "../Tooltip2";
import MultipleImageUploader from "./MultipleImageUploader";
import ManufacturerSelect from "./ManufacturerSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";
import { Input } from "@/components/shadcn/ui/input";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Textarea } from "@/components/shadcn/ui/textarea";
import ItemTypeSelector from "./ItemTypeSelector";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewItemEntryForm = () => {
  const [showSalesInfo, setShowSalesInfo] = useState(true);
  const [showPurchaseInfo, setShowPurchaseInfo] = useState(true);
  const [showTrackingInventory, setShowTrackingInventory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [itemType, setItemType] = useState("goods");
  const [images, setImages] = useState([]);
  const router = useRouter();

  const initialFormState = {
    itemName: "",
    itemType: "goods",
    sku: "",
    unit: "cm",
    returnable: true,
    capitalAsset: false,
    dimension: "",
    manufacturer: "",
    brand: "",
    dim_length: "",
    dim_width: "",
    dim_height: "",
    itemWeight: "",
    dimensionUnit: "cm",
    itemWeightUnit: "g",
    sellingPrice: "",
    costPrice: "",
    salesAccount: "",
    trackInventory: false,
    purchaseAccount: "",
    salesItemDescription: "",
    purchaseItemDescription: "",
    inventoryAccount: "",
    inventoryValuation: "",
    preferredVendor: "",
    openingStock: 0,
    stockRate: 0,
    reorderPoint: 0,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleItemTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      itemType: value,
      returnable: value === "services" ? false : true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (images.length === 0) {
      toast.error("Please upload at least one image before submitting.");
      setIsSubmitting(false);
      return;
    }

    // show loading toast
    try {
      const formDataToSend = new FormData();

      // Add form data
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Add images
      images.forEach((img) => {
        formDataToSend.append("images", img.file);
        formDataToSend.append(
          "imageMetadata",
          JSON.stringify({ id: img.id, isPrimary: img.isPrimary })
        );
      });

      const res = await fetch("/api/newItem", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      if (data.ok) {
        toast.success("Item created successfully.");
        setFormData(initialFormState); // reset form
        setImages([]); // clear images
        // redirect after short delay
        setTimeout(() => {
          router.push("/dashboard/inventory/items");
        }, 1200);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full bg-gray-50 m-auto mb-10">
      <form onSubmit={handleSubmit} className="p-5">
        <div>
          <div className="flex justify-between gap-x-5">
            <div className="flex flex-col right w-[50%] gap-2">
              {/* Item Type */}
              <div className="flex">
                <ItemTypeSelector
                  itemType={formData.itemType}
                  onChange={handleItemTypeChange}
                />
              </div>

              {/* Name */}
              <div className="flex flex-row space-x-6">
                <Label className="py-1 w-[100px] text-red-600">Name *</Label>
                <Input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-[200px] p-2 rounded !border !border-gray-400 !focus:border-gray-500 !ring-0"
                  required
                />
              </div>

              {/* SKU */}
              <div className="flex flex-row gap-x-6">
                <Label className="py-1 w-[100px]">
                  SKU
                  <Tooltip
                    content="The stock keeping unit of the item."
                    placement="right"
                  >
                    <GoQuestion size={15} />
                  </Tooltip>
                </Label>
                <Input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-[200px] !border !border-gray-400 !focus:border-gray-500 !ring-0 p-2 rounded"
                  required
                />
              </div>

              {/* Unit */}
              <div className="flex flex-row gap-x-6">
                <Label
                  className={`py-1 w-[100px] font-normal ${
                    formData.itemType === "goods"
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {formData.itemType === "goods" ? "Unit*" : "Unit"}
                  <Tooltip
                    content="The item will be measured in terms of this unit (e.g.: kg, dozen)"
                    placement="right"
                  >
                    <GoQuestion size={15} />
                  </Tooltip>
                </Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, unit: value }))
                  }
                >
                  <SelectTrigger className="w-[200px] border border-gray-400 rounded focus:border-gray-600 focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select or type to Add" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                    <SelectItem value="mg">mg</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Returnable Item (only for goods) */}
              {formData.itemType === "goods" && (
                <div className="flex flex-row gap-x-6">
                  <label className="block w-[100px]"></label>
                  <input
                    type="checkbox"
                    name="returnable"
                    checked={formData.returnable}
                    onChange={handleChange}
                  />
                  <span className="flex items-center gap-x-2">
                    Returnable Item
                    <Tooltip
                      content="Enable this option if the item is eligible for sales return"
                      placement="right"
                    >
                      <GoQuestion size={15} />
                    </Tooltip>
                  </span>
                </div>
              )}

              {/* Capital Asset */}
              <div className="flex flex-row gap-x-6">
                <label className="block w-[100px]"></label>
                <input
                  type="checkbox"
                  name="capitalAsset"
                  checked={formData.capitalAsset}
                  onChange={handleChange}
                />
                <span className="flex items-center gap-x-2">
                  It's a capital asset
                  <Tooltip
                    content="Goods or service will be considered a capital asset."
                    placement="right"
                  >
                    <GoQuestion size={15} />
                  </Tooltip>
                </span>
              </div>
            </div>
            <div className="flex left w-[50%]">
              <MultipleImageUploader images={images} setImages={setImages} />
            </div>
          </div>
          {/* Dimensions and Weight */}
          <div className="flex justify-start space-x-10 mt-10">
            <div className="flex">
              <Label className="py-1 w-[100px]">
                Dimensions (Length X Width X Height)
              </Label>
              <div className="flex items-center border-1 rounded px-2 py-0 w-[300px]">
                <Input
                  type="number"
                  name="dim_length"
                  value={formData.dim_length ?? ""}
                  onChange={handleChange}
                  className="w-18 border-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
                <span className="px-1 text-gray-500">×</span>
                <Input
                  type="number"
                  name="dim_width"
                  value={formData.dim_width ?? ""}
                  onChange={handleChange}
                  className="w-18 border-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
                <span className="px-1 text-gray-500">×</span>
                <Input
                  type="number"
                  name="dim_height"
                  value={formData.dim_height ?? ""}
                  onChange={handleChange}
                  className="w-18 border-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
                <Select
                  className="ml-1"
                  value={formData.dimensionUnit}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, dimensionUnit: value }))
                  }
                >
                  <SelectTrigger className="w-auto border-solid focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="cm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex">
              <Label className="py-1 w-[100px]">Weight</Label>
              <Input
                type="number"
                name="itemWeight"
                value={formData.itemWeight ?? ""}
                onChange={handleChange}
                className="w-18 border-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
              <Select
                value={formData.itemWeightUnit}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, itemWeightUnit: value }))
                }
              >
                <SelectTrigger className="w-auto border border-l-0 rounded-l-none ">
                  <SelectValue placeholder="g" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Manufacturer and Brand */}
          <div className="flex justify-start space-x-10 mt-10">
            <div className="flex">
              <ManufacturerSelect
                value={formData.manufacturer}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, manufacturer: value }))
                }
              />
            </div>
            <div className="flex">
              <Label className="py-1 w-[100px]">Brand</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    brand: value,
                  }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brand One">Brand One</SelectItem>
                  <SelectItem value="Brand Two">Brand Two</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sales and Purchase Information */}
          <div className="flex justify-start space-x-10 mt-10">
            {/* Sales Information */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sales-info"
                  checked={showSalesInfo}
                  onCheckedChange={(val) => setShowSalesInfo(!!val)}
                  className={`border border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600`}
                />
                <Label
                  htmlFor="sales-info"
                  className="text-[14px] font-normal text-gray-600"
                >
                  Sales Information
                </Label>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Label
                    className={`font-normal min-w-[100px] ${
                      showSalesInfo ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {showSalesInfo ? "Selling Price*" : "Selling Price"}
                  </Label>
                  <div className="flex">
                    <span className="border border-r-0 px-3 flex items-center bg-gray-100 rounded-l-md">
                      ZAR
                    </span>
                    <Input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice ?? ""}
                      onChange={handleChange}
                      className="w-18 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required={showSalesInfo}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Label
                    className={`font-normal min-w-[100px] ${
                      showSalesInfo ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {showSalesInfo ? "Account*" : "Account"}
                  </Label>
                  <Select
                    value={formData.salesAccount}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, salesAccount: value }))
                    }
                    required={showSalesInfo}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sales Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-1/2">
                  <Label className="w-[120px]">Description</Label>
                  <Textarea
                    name="salesItemDescription"
                    value={formData.salesItemDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    placeholder="Sales description!!!"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Purchase Information */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="purchase-info"
                  checked={showPurchaseInfo}
                  onCheckedChange={(val) => setShowPurchaseInfo(!!val)}
                  className={`border border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600`}
                />
                <Label
                  htmlFor="purchase-info"
                  className="text-[14px] font-normal text-gray-600"
                >
                  Purchase Information
                </Label>
              </div>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Label
                    className={`font-normal min-w-[100px] ${
                      showPurchaseInfo ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {showPurchaseInfo ? "Cost Price*" : "Cost Price"}
                  </Label>
                  <div className="flex">
                    <span className="border border-r-0 px-3 flex items-center bg-gray-100 rounded-l-md">
                      ZAR
                    </span>
                    <Input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      required
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Label
                    className={`font-normal min-w-[100px] ${
                      showPurchaseInfo ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {showPurchaseInfo ? "Account*" : "Account"}
                  </Label>
                  <Select
                    value={formData.purchaseAccount}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        purchaseAccount: value,
                      }))
                    }
                    required={showPurchaseInfo}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cost of Goods Sold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cogs">Cost of Goods Sold</SelectItem>
                      <SelectItem value="expenses">Expenses</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Label className="w-[100px]">Description</Label>
                  <Textarea
                    name="purchaseItemDescription"
                    value={formData.purchaseItemDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Purchase description!"
                  />
                </div>
                <div className="flex space-x-2">
                  <Label className="w-[100px]">Preferred Vendor</Label>
                  <Select
                    value={formData.preferredVendor}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        preferredVendor: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor-a">Vendor A</SelectItem>
                      <SelectItem value="vendor-b">Vendor B</SelectItem>
                      <SelectItem value="vendor-c">Vendor C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Tracking */}
          <div className="flex flex-col justify-around space-x-10 mt-10">
            <div className="flex items-start gap-3">
              <Checkbox
                id="track-inventory"
                checked={showTrackingInventory}
                onCheckedChange={(val) => setShowTrackingInventory(!!val)}
                className={`border border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600`}
              />
              <div>
                <Label
                  htmlFor="track-inventory"
                  className="text-[14px] font-normal text-gray-700"
                >
                  Track Inventory for this item
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  You cannot enable/disable inventory tracking once you've
                  created transactions for this item
                </p>
              </div>
            </div>
            {showTrackingInventory && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col gap-2.5">
                  {/* Inventory Account */}
                  <div className="flex space-x-5">
                    <Tooltip
                      content="The account which tracks the inventory of this item"
                      placement="right"
                    >
                      <Label className="text-red-600 text-sm font-medium text-nowrap w-[102px]">
                        Inventory Account*
                      </Label>
                    </Tooltip>
                    <Select
                      value={formData.inventoryAccount}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          inventoryAccount: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full border border-gray-400">
                        <SelectValue placeholder="Select Inventory Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Finished Goods">
                          Finished Goods
                        </SelectItem>
                        <SelectItem value="Raw Materials">
                          Raw Materials
                        </SelectItem>
                        <SelectItem value="Work In Progress">
                          Work In Progress
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Opening Stock */}
                  <div className="flex space-x-2">
                    <Tooltip
                      content="The stock available for sale at the beginning of the accounting period"
                      placement="right"
                    >
                      <Label className="text-sm font-medium text-gray-700 text-nowrap min-w-[112px]">
                        Opening Stock
                      </Label>
                    </Tooltip>
                    <Input
                      type="number"
                      name="openingStock"
                      value={formData.openingStock ?? 0}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  {/* Reorder Point */}
                  <div className="flex space-x-2">
                    <Tooltip
                      content="When the stock reaches the reorder point, a notification will be sent to you"
                      placement="right"
                    >
                      <Label className="text-sm font-medium text-gray-700 text-nowrap min-w-[112px]">
                        Reorder Point
                      </Label>
                    </Tooltip>
                    <Input
                      type="number"
                      name="reorderPoint"
                      value={formData.reorderPoint ?? 0}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  {/* Inventory Valuation Method */}
                  <div className="flex space-x-2">
                    <Tooltip
                      content="The method you select here will be used for inventory valuation"
                      placement="right"
                    >
                      <Label className="text-red-600 text-sm font-medium text-wrap min-w-[120px]">
                        Inventory Valuation Method*
                      </Label>
                    </Tooltip>
                    <Select
                      value={formData.inventoryValuation}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          inventoryValuation: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full border border-gray-400 ">
                        <SelectValue placeholder="Select Valuation Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIFO">
                          FIFO (First In First Out)
                        </SelectItem>
                        <SelectItem value="LIFO">
                          LIFO (Last In First Out)
                        </SelectItem>
                        <SelectItem value="WAC">
                          Weighted Average Cost
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Opening Stock Rate per Unit */}
                  <div className="flex space-x-2">
                    <Tooltip
                      content="The rate at which you bought each unit of the opening stock"
                      placement="right"
                    >
                      <Label className="text-sm font-medium text-gray-700 w-[120px]">
                        Opening Stock Rate per Unit
                      </Label>
                    </Tooltip>
                    <Input
                      type="number"
                      name="stockRate"
                      value={formData.stockRate ?? 0}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 col-span-1">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white px-2 py-1 rounded-md font-medium disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Item..." : "Add Item"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewItemEntryForm;
