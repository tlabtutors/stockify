import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

// GET single item
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const item = await prisma.inventoryItem.findUnique({
      where: { id },
      include: { images: true }, // include images if needed
    });

    if (!item) {
      return NextResponse.json(
        { ok: false, error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

//  DELETE item
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.inventoryItem.delete({
      where: { id },
    });

    return NextResponse.json({
      ok: true,
      msg: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
