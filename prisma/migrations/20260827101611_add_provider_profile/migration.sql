-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('ACTIVE', 'BUSY', 'INACTIVE');

-- CreateEnum
CREATE TYPE "VerificationTier" AS ENUM ('STEP1', 'STEP2', 'STEP3');

-- CreateTable
CREATE TABLE "ProviderProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skillLevel" TEXT NOT NULL,
    "campusLocation" TEXT NOT NULL,
    "availabilityStatus" "AvailabilityStatus" NOT NULL DEFAULT 'ACTIVE',
    "phoneNumber" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "socialLinks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "department" TEXT NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "verificationTier" "VerificationTier" NOT NULL DEFAULT 'STEP3',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProviderProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderProfile_userId_key" ON "ProviderProfile"("userId");

-- AddForeignKey
ALTER TABLE "ProviderProfile" ADD CONSTRAINT "ProviderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
