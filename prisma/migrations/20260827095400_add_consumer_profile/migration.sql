-- CreateTable
CREATE TABLE "ConsumerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "campusLocation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsumerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerProfile_userId_key" ON "ConsumerProfile"("userId");

-- AddForeignKey
ALTER TABLE "ConsumerProfile" ADD CONSTRAINT "ConsumerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
