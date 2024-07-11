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
      id,
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
    await db
      .update(records)
      .set({
        firstName,
        lastName,
        country: country?.value,
        accountType: accountType?.value,
        username,
        contactNumber,
        image,
        userId,
        email,
      })
      .where(eq(records.id, id));
    return NextResponse.json({
      success: true,
      message: "Record updated successfully",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong" + e,
    });
  }
}
