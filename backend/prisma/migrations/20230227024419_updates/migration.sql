-- AlterTable
ALTER TABLE "Org" ADD COLUMN "eventUrl" TEXT;
ALTER TABLE "Org" ADD COLUMN "picture" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "username" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "op" TEXT,
    "uoHash" TEXT,
    "txHash" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
