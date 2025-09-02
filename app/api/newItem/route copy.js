import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "bson";

/* ---------------- Create New Item ---------------- */
export async function POST(req) {
  try {
    const formData = await req.formData();
    const allFormData = Object.fromEntries(formData.entries());
    const imageFiles = formData.getAll("images");
    const imageMetadata = formData
      .getAll("imageMetadata")
      .map((m) => JSON.parse(m));

    const {
      dim_length,
      dim_width,
      dim_height,
      images: _i,
      imageMetadata: _m,
      ...cleanData
    } = allFormData;

    const processedData = {
      ...cleanData,
      returnable:
        cleanData.returnable === "true" || cleanData.returnable === true,
      capitalAsset:
        cleanData.capitalAsset === "true" || cleanData.capitalAsset === true,
      trackInventory:
        cleanData.trackInventory === "true" ||
        cleanData.trackInventory === true,
      itemWeight: parseFloat(cleanData.itemWeight),
      sellingPrice: parseFloat(cleanData.sellingPrice),
      costPrice: parseFloat(cleanData.costPrice),
      openingStock: parseInt(cleanData.openingStock) || 0,
      stockRate: parseFloat(cleanData.stockRate) || 0,
      reorderPoint: parseInt(cleanData.reorderPoint) || 0,
    };

    const images = await Promise.all(
      imageFiles
        .map(async (imageFile, index) => {
          if (imageFile instanceof File) {
            const buffer = await imageFile.arrayBuffer();
            const fileName = uuidv4();
            const uploadPath = path.join(
              process.cwd(),
              "public/uploaded_images",
              fileName
            );
            await writeFile(uploadPath, Buffer.from(buffer));

            return {
              id: new ObjectId().toString(),
              url: `/uploaded_images/${fileName}`,
              isPrimary: imageMetadata[index]?.isPrimary || false,
              createdAt: new Date(),
            };
          }
          return null;
        })
        .filter(Boolean)
    );

    const transformedData = {
      ...processedData,
      dimension: `${dim_length}x${dim_width}x${dim_height}`,
      images,
    };

    const item = await prisma.inventoryItem.create({
      data: transformedData,
    });

    return NextResponse.json({
      ok: true,
      item,
      message: "Item created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ ok: false, error: error.message, status: 500 });
  }
}

/* ----------------  List OR Single Item ---------------- */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Fetch single item by ID
    if (id) {
      const item = await prisma.inventoryItem.findUnique({
        where: { id },
      });

      if (!item) {
        return NextResponse.json({
          ok: false,
          error: "Item not found",
          status: 404,
        });
      }

      return NextResponse.json({ ok: true, item });
    }

    // List items with pagination + search
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { sku: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.inventoryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.inventoryItem.count({ where }),
    ]);

    const transformedItems = items.map((item) => ({
      id: item.id,
      name: item.itemName,
      sku: item.sku,
      price: item.sellingPrice,
      stock: item.openingStock ?? 0,
      reorderLevel: item.reorderPoint ?? 0,
      imageUrl:
        item.images?.find((img) => img.isPrimary)?.url ||
        "/uploaded_images/default.png",
    }));

    return NextResponse.json({
      ok: true,
      items: transformedItems,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return NextResponse.json({ ok: false, error: error.message, status: 500 });
  }
}
/* ---------------- Update Inventory Item ---------------- */
export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Item ID is required",
        status: 400,
      });
    }

    // Get existing item to compare images
    const existingItem = await prisma.inventoryItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json({
        ok: false,
        error: "Item not found",
        status: 404,
      });
    }

    const allFormData = Object.fromEntries(formData.entries());
    const imageFiles = formData.getAll("images");
    const imageMetadata = formData
      .getAll("imageMetadata")
      .map((m) => JSON.parse(m));

    // Get existing images from form data
    const existingImagesData = formData
      .getAll("existingImages")
      .map((img) => JSON.parse(img));

    // EXCLUDE THE ID FIELD FROM THE DATA
    const {
      id: _, // This extracts and ignores the id field
      dim_length,
      dim_width,
      dim_height,
      images: _i,
      imageMetadata: _m,
      existingImages: _ei,
      ...cleanData
    } = allFormData;

    const processedData = {
      ...cleanData,
      returnable:
        cleanData.returnable === "true" || cleanData.returnable === true,
      capitalAsset:
        cleanData.capitalAsset === "true" || cleanData.capitalAsset === true,
      trackInventory:
        cleanData.trackInventory === "true" ||
        cleanData.trackInventory === true,
      itemWeight: parseFloat(cleanData.itemWeight) || 0,
      sellingPrice: parseFloat(cleanData.sellingPrice) || 0,
      costPrice: parseFloat(cleanData.costPrice) || 0,
      openingStock: parseInt(cleanData.openingStock) || 0,
      stockRate: parseFloat(cleanData.stockRate) || 0,
      reorderPoint: parseInt(cleanData.reorderPoint) || 0,
    };

    // Process new images
    const newImages = await Promise.all(
      imageFiles
        .map(async (imageFile, index) => {
          if (imageFile instanceof File && imageFile.size > 0) {
            const buffer = await imageFile.arrayBuffer();
            const fileName = uuidv4();
            const uploadPath = path.join(
              process.cwd(),
              "public/uploaded_images",
              fileName
            );
            await writeFile(uploadPath, Buffer.from(buffer));

            return {
              id: new ObjectId().toString(),
              url: `/uploaded_images/${fileName}`,
              isPrimary: imageMetadata[index]?.isPrimary || false,
              createdAt: new Date(),
            };
          }
          return null;
        })
        .filter(Boolean)
    );

    // Combine existing and new images
    const allImages = [...existingImagesData, ...newImages];
    // Ensure only one primary image
    const primaryImages = allImages.filter((img) => img.isPrimary);
    if (primaryImages.length > 1) {
      // If multiple primary images, keep only the first one as primary
      allImages.forEach((img, index) => {
        if (index > 0) img.isPrimary = false;
      });
    } else if (primaryImages.length === 0 && allImages.length > 0) {
      // If no primary image, set the first one as primary
      allImages[0].isPrimary = true;
    }
    const transformedData = {
      ...processedData,
      dimension: `${dim_length}x${dim_width}x${dim_height}`,
      images: allImages,
    };
    // Delete removed images from filesystem (with existence check)
    if (existingItem.images && existingItem.images.length > 0) {
      const removedImages = existingItem.images.filter(
        (existingImg) =>
          !existingImagesData.some((newImg) => newImg.id === existingImg.id)
      );

      for (const img of removedImages) {
        try {
          const filePath = path.join(process.cwd(), "public", img.url);
          // Check if file exists before trying to delete
          try {
            await fs.access(filePath);
            await unlink(filePath);
          } catch (accessError) {
            // File doesn't exist, skip deletion
            console.log(`File ${img.url} doesn't exist, skipping deletion`);
          }
        } catch (error) {
          console.warn(`Could not delete image file: ${img.url}`, error);
        }
      }
    }

    // Add debug logging to see what's being sent to Prisma
    console.log(
      "Updating item with data:",
      JSON.stringify(transformedData, null, 2)
    );

    const item = await prisma.inventoryItem.update({
      where: { id },
      data: transformedData,
    });

    return NextResponse.json({
      ok: true,
      item,
      msg: "Item updated successfully!",
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json({ ok: false, error: error.message, status: 500 });
  }
}
