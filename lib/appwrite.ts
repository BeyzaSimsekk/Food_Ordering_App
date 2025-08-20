import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!, //! Ensure this is not undefined
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.byz.foodordering",
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
    menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
    customizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
    menuCustomizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!,
}

export const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client)
const avatars = new Avatars(client);

export const createUser = async({email, password, name} : CreateUserParams) => {
    try {
        
        const newAccount = await account.create(ID.unique(),email, password, name);

        if(!newAccount) {
            throw new Error("Failed to create user account");
        }

        // kullanıcı oluşturulduktan sonra otomatik giriş
        await signIn({email, password})

        const avatarUrl =  avatars.getInitialsURL(name)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );

        return newUser;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const signIn = async({email, password} : SignInParams) => {
    try {

        // önce mevcut session var mı diye bak
    const existing = await account.get().catch(() => null);

    if (existing) {
      // zaten login, yeni session açma
      return existing;
    }

        // session yoksa giriş yap
    return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) {
            throw new Error("No user is currently signed in");
        }

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentAccount) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        throw new Error(error as string);
    }
}
