//create a next api for creating a post

import { NextResponse } from "next/server";
import { db } from "@/db/drizzle/db";
import { users } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import { records } from "@/db/drizzle/schema/records";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // validate email and password
    const record = await db
      .select()
      .from(records)
      .where(eq(records.id, params.id));

    return NextResponse.json({
      success: true,
      record: record[0],
      message: "fetched record with id" + params.id,
    });
  } catch (e) {
    console.error(e);
    NextResponse.json({
      success: false,
      message: "Something went wrong" + e,
    });
  }
}
