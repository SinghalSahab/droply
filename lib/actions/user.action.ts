'use server';

import { Query, ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email:string) => {
    const {databases} = await createAdminClient();

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
    )

    return result.total>0?result.documents[0]:null;

}
const handleError=(error:unknown , message:string) =>
{
    console.error(message,error);
    throw new Error(message);
}
export const sendEmailOTP = async ({ email }: { email: string }) => {
    const { account } = await createAdminClient();
    console.log("sendEmailOTP called");
  
    try {
        
      const session = await account.createEmailToken(ID.unique(), email);
      return session.userId;
    } catch (error) {
      console.log(error);
      handleError(error, "Failed to send email OTP");
    }
};
  
export const createAccount = async ({fullName,email}:{fullName : string, email:string}) => {
    console.log("createAccount called");
    const existingUser = await getUserByEmail(email);
    console.log("Existing user checked");

    const accountId = await sendEmailOTP({email});
    console.log("Email OTP sent");

    if(!accountId){
        throw new Error("Failed to create account");
    }

    if(!existingUser){
        const {databases} = await createAdminClient();
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(), 
            {
                fullName,
                email,
                avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                accountId
            }
        );
        console.log("New user created");
    }
    return parseStringify({accountId});
}

export const verifySecret = async ({ accountId, password }: { accountId: string; password: string }) => {
    console.log("verifySecret called");
    
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(accountId, password);

        (await cookies()).set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,

    });
    return parseStringify({sessionId:session.$id});
    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }
    
}
