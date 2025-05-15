/*
  Warnings:

  - You are about to drop the column `slug` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Platform` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Genre_slug_key";

-- DropIndex
DROP INDEX "Platform_slug_key";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "slug";
