"use client";
import { Plus, Pencil, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Tooltip from "@/components/Tooltip";

// Fallback mock data - adjusted to better match API structure
const fallbackItem = {
  itemName: "Loading...",
  returnable: false,
  itemType: "N/A",
  sku: "N/A",
  unit: "N/A",
  dimension: "N/A",
  itemWeight: "N/A",
  manufacturer: "N/A",
  brand: "N/A",
  createdSource: "N/A",
  inventoryAccount: "N/A",
  inventoryValuation: "N/A",
  costPrice: "N/A",
  purchaseAccount: "N/A",
  purchaseItemDescription: "N/A",
  sellingPrice: "N/A",
  salesAccount: "N/A",
  salesItemDescription: "N/A",
  accountingStock: { onHand: "0", committed: "0", available: "0" },
  physicalStock: { onHand: "0", committed: "0", available: "0" },
  openingStock: "0",
  // Images is an array, mainImage is now derived from it
  images: [
    {
      url: "https://placehold.co/300x200/e0e0e0/777?text=Loading",
      isPrimary: true,
    },
  ],
};

// Reusable components
const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-2 py-2">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-900">{String(value)}</dd>{" "}
    {/* Ensure value is a string */}
  </div>
);

const StockInfoSection = ({ title, data }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
      {title}
    </h3>
  </div>
);

export default function ItemDetail() {
  const [items, setItems] = useState([]);
  const [singleItem, setSingleItem] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const { id } = useParams();
  const router = useRouter();

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/newItem/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.ok) {
        ///console.log("Data from API:", data.item);
        setSingleItem(data.item);
      } else {
        console.error("API response was not ok:", data);
      }
    } catch (error) {
      console.error("Error loading item:", error);
    }
  };

  useEffect(() => {
    if (id) fetchItem();
  }, [id]);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams({ page, limit, search });
      const res = await fetch(`/api/newItem?${params.toString()}`);
      const data = await res.json();
      if (data.ok) {
        setItems(data.items);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, search]);
  const handleItemClick = (id) => {
    router.push(`/inventory/itemDetails/${id}`);
  };
  const itemDetails = singleItem || fallbackItem;
  // Process the images array to find the main image and thumbnails
  const mainImage = itemDetails.images?.find((img) => img.isPrimary);
  const thumbnails = itemDetails.images?.filter((img) => !img.isPrimary);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans mt-14">
      {/* Sidebar */}
      <aside className="w-1/4 max-w-xs bg-white border-r border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Active Items</h2>
          <Link
            href={`/inventory/items/new`}
            className="flex justify-center items-center w-5 h-5 p-3 rounded-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            <Tooltip content="Create New Item" placement="bottom">
              <Plus size={15} />
            </Tooltip>
          </Link>
        </div>
        <nav>
          <ul>
            {items?.map((item) => (
              <li
                key={item.id} // Use a unique id for the key
                className={`p-3 rounded-lg cursor-pointer ${
                  item.active ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="flex w-full justify-between font-semibold">
                  <div className="flex space-x-1">
                    <input type="checkbox" className="h-4 w-4" />
                    <p
                      className={`font-semibold text-sm ${
                        item.active ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm text-right">R{item.price}</p>
                </div>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-2 px-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {itemDetails.itemName}
            </h1>
            <div className="flex items-center mt-2">
              <div className="h-5 w-5 justify-center items-center text-gray-600 rounded p-1">
                <RotateCcw size={12} />
              </div>

              <label
                htmlFor="returnable"
                className="ml-1 text-sm text-gray-600"
              >
                Returnable item
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/inventory/items/edit/${id}`}
              className="flex  justify-center items-center text-sm p-2 text-black rounded-md border-1 border-gray-200 bg-gray-100"
            >
              <Pencil className="h-4 w-4 cursor-pointer" />
            </Link>
            <button
              href={`/inventory/items/edit/${id}`}
              className="flex items-center px-2 py-2 border rounded-md bg-blue-400 text-white"
            >
              Adjust Stock
            </button>
            <button className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
              More
            </button>
          </div>
        </header>

        {/* Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <dl className="divide-y divide-gray-200">
              <DetailRow label="Item Type" value={itemDetails.itemType} />
              <DetailRow label="SKU" value={itemDetails.sku} />
              <DetailRow label="Unit" value={itemDetails.unit} />
              <DetailRow label="Dimensions" value={itemDetails.dimension} />
              <DetailRow label="Weight" value={itemDetails.itemWeight} />
              <DetailRow
                label="Manufacturer"
                value={itemDetails.manufacturer}
              />
              <DetailRow label="Brand" value={itemDetails.brand} />

              <DetailRow
                label="Inventory Account"
                value={itemDetails.inventoryAccount}
              />
              <DetailRow
                label="Inventory Valuation Method"
                value={itemDetails.inventoryValuation}
              />
            </dl>

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800">
                Purchase Information
              </h3>
              <dl className="mt-2 border-t border-gray-200 divide-y">
                <DetailRow label="Cost Price" value={itemDetails.costPrice} />
                <DetailRow
                  label="Purchase Account"
                  value={itemDetails.purchaseAccount}
                />
                <DetailRow
                  label="Description"
                  value={itemDetails.purchaseItemDescription}
                />
              </dl>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800">
                Sales Information
              </h3>
              <dl className="mt-2 border-t border-gray-200 divide-y">
                <DetailRow
                  label="Selling Price"
                  value={itemDetails.sellingPrice}
                />
                <DetailRow
                  label="Sales Account"
                  value={itemDetails.salesAccount}
                />
                <DetailRow
                  label="Description"
                  value={itemDetails.salesItemDescription}
                />
              </dl>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="relative">
              <img
                src={mainImage?.url || fallbackItem.images[0].url}
                alt="Main product image"
                className="rounded-lg w-full object-cover border-1 border-transparent hover:border-blue-500"
                style={{ width: "300px", height: "200px" }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {thumbnails?.map((thumb) => (
                <img
                  key={thumb.id}
                  src={thumb.url}
                  alt={`Thumbnail ${thumb.id}`}
                  className="rounded-md cursor-pointer w-10 h-10 border-2 border-transparent hover:border-blue-500"
                />
              ))}
            </div>

            <div className="mt-6">
              <DetailRow
                label="Opening Stock"
                value={itemDetails.openingStock}
              />
            </div>

            {/* They will show fallback data until added to the API */}
            <StockInfoSection
              title="Accounting Stock"
              data={itemDetails.accountingStock}
            />
            <StockInfoSection
              title="Physical Stock"
              data={itemDetails.physicalStock}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
