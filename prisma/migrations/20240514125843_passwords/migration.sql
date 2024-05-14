-- CreateTable
CREATE TABLE "Passwords" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "website" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
