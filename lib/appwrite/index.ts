import { Client } from "node-appwrite"
import { appwriteConfig } from "./config"

export const createSessionClient = async () =>{
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
}

export const createAdminClient = async () =>{
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey)
}