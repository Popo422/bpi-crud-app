//create a next api for creating a post

import { NextResponse } from "next/server";
import { db } from "@/db/drizzle/db";
import { users } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import { records } from "@/db/drizzle/schema/records";

export async function GET(request: Request) {
  try {
    // validate email and password
    const allRecords = await db
      .select()
      .from(records)
      .innerJoin(users, eq(records.userId, users.id));
    return NextResponse.json({
      success: true,
      records: allRecords,
      message: "fetched all posts",
    });
  } catch (e) {
   return console.error(e);
    NextResponse.json({
      success: false,
      message: "Something went wrong" + e,
    });
  }
}
