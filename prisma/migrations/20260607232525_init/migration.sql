-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "unsubscribeToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregnancy" (
    "id" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pregnancy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_unsubscribeToken_key" ON "Subscriber"("unsubscribeToken");

-- AddForeignKey
ALTER TABLE "Pregnancy" ADD CONSTRAINT "Pregnancy_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
