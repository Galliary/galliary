-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userFavouriteIds" TEXT[];

-- CreateTable
CREATE TABLE "_UserFavouriteUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavouriteUsers_AB_unique" ON "_UserFavouriteUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavouriteUsers_B_index" ON "_UserFavouriteUsers"("B");

-- AddForeignKey
ALTER TABLE "_UserFavouriteUsers" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavouriteUsers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
