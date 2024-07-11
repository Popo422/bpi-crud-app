//create a record schema country , account type , username ,firstName , lastName , email , Contact Number, Photo,

import { timestamp, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const records = pgTable("records", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text("firstName"),
  lastName: text("lastName"),
  country: text("country"),
  accountType: text("accountType"),
  username: text("username"),
  contactNumber: text("contactNumber"),
  image: text("image"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }),
});
