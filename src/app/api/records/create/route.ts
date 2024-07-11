//create a next api for creating a post

import { NextResponse } from "next/server";
import { db } from "@/db/drizzle/db";
import { users } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import { records } from "@/db/drizzle/schema/records";

export async function POST(request: Request) {
  try {
    // validate email and password
    const {
      firstName,
      lastName,
      country,
      accountType,
      username,
      contactNumber,
      image,
      userId,
      email,
    } = await request.json();

    const recordExists = await db
      .select()
      .from(records)
      .where(eq(records.username, username))
      .limit(1);

    if (recordExists && recordExists.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Record already exists",
      });
    }
    await db.insert(records).values({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      country: country?.value,
      accountType: accountType?.value,
      username,
      contactNumber,
      image,
      userId,
      email,
      createdAt: new Date(),
    });
    return NextResponse.json({
      success: true,
      message: "Record created successfully",
    });
  } catch (e) {
    console.error(e);
   return NextResponse.json({
      success: false,
      message: "Something went wrong" + e,
    });
  }
}
