"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Trash2, X } from "lucide-react";
import { toast } from "sonner"; // Import toast from sonner

// Modal component
const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 opacity-90 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Deletion
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-center">
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex justify-center items-center gap-x-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

export default function InventoryItemList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page, limit, search });
      const res = await fetch(`/api/newItem?${params.toString()}`);
      const data = await res.json();
      if (data.ok) {
        setItems(data.items.map((item) => ({ ...item, isChecked: false })));
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search]);

  const handleItemClick = (id) => {
    router.push(`/dashboard/inventory/itemDetails/${id}`);
  };

  const handleCheckboxChange = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsModalOpen(false);
    if (!selectedItem) return;

    try {
      const res = await fetch(`/api/newItem/${selectedItem.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        setItems((prev) => prev.filter((item) => item.id !== selectedItem.id));
        // Use Sonner's toast.success function
        toast.success(`Successfully deleted "${selectedItem.name}"`);
      } else {
        // Use Sonner's toast.error function
        toast.error(`Failed to delete "${selectedItem.name}"`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("An error occurred during deletion.");
    }
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-xs font-sans">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the item "${selectedItem?.name}"? This action cannot be undone.`}
      />

      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="border border-gray-300 rounded-lg px-3 py-2 pl-10 text-sm w-full md:w-[250px] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="relative py-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
              </th>
              <TableHeader>Name</TableHeader>
              <TableHeader>SKU</TableHeader>
              <TableHeader>Stock on Hand</TableHeader>
              <TableHeader>Reorder Level</TableHeader>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: limit }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-2 flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                    <div className="ml-4 h-4 w-24 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-2"></td>
                </tr>
              ))
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={item.isChecked}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td
                    className="px-6 py-2 whitespace-nowrap flex items-center cursor-pointer"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <img
                      className="h-10 w-10 rounded-md object-cover"
                      src={item.imageUrl}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/40x40/e0e0e0/777?text=Err";
                      }}
                    />
                    <span className="ml-4 text-sm font-medium text-blue-600">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.sku}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.stock.toFixed(2)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.reorderLevel.toFixed(2)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                    {item.isChecked && (
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!loading && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
