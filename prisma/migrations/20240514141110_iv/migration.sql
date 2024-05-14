/*
  Warnings:

  - Added the required column `iv` to the `Passwords` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passwords" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "website" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Passwords" ("createdAt", "id", "password", "user_id", "username", "website") SELECT "createdAt", "id", "password", "user_id", "username", "website" FROM "Passwords";
DROP TABLE "Passwords";
ALTER TABLE "new_Passwords" RENAME TO "Passwords";
PRAGMA foreign_key_check("Passwords");
PRAGMA foreign_keys=ON;
