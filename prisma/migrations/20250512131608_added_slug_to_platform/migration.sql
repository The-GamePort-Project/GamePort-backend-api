/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Platform` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Platform" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Platform_slug_key" ON "Platform"("slug");
