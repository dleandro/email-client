-- CreateEnum
CREATE TYPE "Folder" AS ENUM ('INBOX', 'SENT', 'DRAFTS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('READ', 'UNREAD');

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folder" "Folder" NOT NULL,
    "tag" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);
