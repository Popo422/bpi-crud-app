//create a next api for creating a post

import { NextResponse } from "next/server";
import { db } from "@/db/drizzle/db";
import { users } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import { records } from "@/db/drizzle/schema/records";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // validate email and password
    await db.delete(records).where(eq(records.id, params.id));
    return NextResponse.json({
      success: true,
      message: "Deleted record  successfully",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong" + e,
    });
  }
}
