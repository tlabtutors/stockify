import { NextResponse } from "next/server";
import { tenant } from "@/lib/tenantPrisma";

/* ---------------- GET Single Item (Tenant-aware) ---------------- */
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const inventoryItem = await tenant("inventoryItem", req);

    const item = await inventoryItem.findUnique({
      where: { id },
      include: { images: true }, // include images if needed
    });

    if (!item) {
      return NextResponse.json(
        { ok: false, error: "Item not found or you are not authorized" },
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

/* ---------------- DELETE Item (Tenant-aware) ---------------- */
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const inventoryItem = await tenant("inventoryItem", req);
    // Ensure only the user's company item can be deleted
    const existingItem = await inventoryItem.findUnique({ where: { id } });
    if (!existingItem) {
      return NextResponse.json(
        { ok: false, error: "Item not found or you are not authorized" },
        { status: 404 }
      );
    }

    await inventoryItem.delete({ where: { id } });

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