-- CreateTable
CREATE TABLE "post_details" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "sensitivity" TEXT NOT NULL,

    CONSTRAINT "post_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_details_postId_key" ON "post_details"("postId");
