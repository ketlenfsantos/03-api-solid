/*
  Warnings:

  - You are about to drop the column `valided_at` on the `check_ins` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "valided_at",
ADD COLUMN     "validated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'MEMBER';
