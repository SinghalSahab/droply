'use server'
import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

const handleError=(error:unknown , message:string) =>
    {
        console.error(message,error);
        throw new Error(message);
    }
export const uploadFile =async ({
    file,
    ownerId,
    accountId,
    path,
  }: UploadFileProps) => {
    const formData = new FormData();
    const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile,
    );

    const fileDocument = {
        type:getFileType(bucketFile.name).type,
        name:bucketFile.name,
        url: constructFileUrl(bucketFile.$id),
        extension:getFileType(bucketFile.name).extension,
        size:bucketFile.sizeOriginal,
        owner:ownerId,
        accountId,
        users: [],
        bucketFileId:bucketFile.$id,
    }

    const newFile = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument,
    )
    .catch(async (error:unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to upload file");
      });

      revalidatePath(path)
      return parseStringify(newFile);
}
catch (error) {
    handleError(error, "Failed to upload file");
  }
};