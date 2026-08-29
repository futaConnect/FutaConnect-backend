-- CreateTable
CREATE TABLE "ProviderNiche" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "nicheId" TEXT NOT NULL,
    "subServices" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "ProviderNiche_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderNiche_providerId_nicheId_key" ON "ProviderNiche"("providerId", "nicheId");

-- AddForeignKey
ALTER TABLE "ProviderNiche" ADD CONSTRAINT "ProviderNiche_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProviderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderNiche" ADD CONSTRAINT "ProviderNiche_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
