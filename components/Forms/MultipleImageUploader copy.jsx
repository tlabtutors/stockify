"use client";

import React, { useState, useRef } from "react";

const MultipleImageUploader = ({
  images,
  setImages,
  existingImages = [],
  setExistingImages,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const imagePreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      isNew: true,
    }));

    setImages((prev) => {
      const allImages = [...prev, ...imagePreviews];
      return allImages.length === imagePreviews.length
        ? markPrimary(allImages, imagePreviews[0].id)
        : allImages;
    });
  };

  const markPrimary = (imgArray, primaryId) =>
    imgArray.map((img) => ({ ...img, isPrimary: img.id === primaryId }));

  const handleSetPrimary = (id, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: img.id === id,
        }))
      );
    } else {
      setImages((prev) => markPrimary(prev, id));
    }
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    } else {
      setImages((prev) => {
        const updated = [...prev];
        const [removed] = updated.splice(index, 1);
        URL.revokeObjectURL(removed.url);
        if (removed.isPrimary && updated.length > 0) {
          updated[0].isPrimary = true;
        }
        return [...updated];
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  // Check if any image is set as primary
  const hasPrimary = [...existingImages, ...images].some(
    (img) => img.isPrimary
  );

  return (
    <div className="w-full max-w-[250px] mx-auto p-2 bg-white rounded-xl shadow-md text-gray-500">
      <div
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-all ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <p className="text-gray-600">
          Drag image(s) here or
          <span className="text-blue-600"> Browse images</span>
        </p>
      </div>

      {/* Thumbnails */}
      {(existingImages.length > 0 || images.length > 0) && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Existing Images */}
          {existingImages.map((img, index) => (
            <div
              key={img.id}
              className={`relative group rounded-lg overflow-hidden border shadow ${
                img.isPrimary ? "ring-4 ring-green-500" : ""
              }`}
            >
              <img
                src={img.url}
                alt={`preview-${index}`}
                className="w-24 h-10 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index, true)}
                className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                title="Remove"
              >
                ×
              </button>
              {!img.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(img.id, true)}
                  className="absolute bottom-1 left-1 bg-white text-xs px-1 py-0.5 rounded shadow text-nowrap text-gray-800 hover:bg-gray-100"
                >
                  Make Primary
                </button>
              )}
              {img.isPrimary && (
                <span className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded shadow">
                  Primary
                </span>
              )}
            </div>
          ))}

          {/* New Images */}
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`relative group rounded-lg overflow-hidden border shadow ${
                img.isPrimary ? "ring-4 ring-green-500" : ""
              }`}
            >
              <img
                src={img.url}
                alt={`preview-${index}`}
                className="w-16 h-16 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                title="Remove"
              >
                ×
              </button>
              {!img.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(img.id)}
                  className="absolute bottom-1 left-1 bg-white text-xs px-2 py-0.5 rounded shadow text-gray-800 hover:bg-gray-100"
                >
                  Set as Primary
                </button>
              )}
              {img.isPrimary && (
                <span className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded shadow">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {!hasPrimary && (existingImages.length > 0 || images.length > 0) && (
        <p className="text-red-500 text-xs mt-2">Please set a primary image</p>
      )}
    </div>
  );
};

export default MultipleImageUploader;
