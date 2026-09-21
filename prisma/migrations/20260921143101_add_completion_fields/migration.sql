-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ConnectStatus" ADD VALUE 'COMPLETED';
ALTER TYPE "ConnectStatus" ADD VALUE 'AUTO_CLOSED';

-- AlterTable
ALTER TABLE "ConnectRequest" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "consumerMarkedDoneAt" TIMESTAMP(3),
ADD COLUMN     "providerConfirmedAt" TIMESTAMP(3);
