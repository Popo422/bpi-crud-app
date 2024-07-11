import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
  } from "drizzle-orm/pg-core"
  import postgres from "postgres"
  import { drizzle } from "drizzle-orm/postgres-js"
  import type { AdapterAccountType } from "next-auth/adapters"
import { users } from "./users"

export const authenticators = pgTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: boolean("credentialBackedUp").notNull(),
      transports: text("transports"),
    },
    (authenticator) => ({
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    })
  )