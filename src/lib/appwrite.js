import { Account, Client, Databases, ID, Query } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const favoriteCollectionId = import.meta.env
  .VITE_APPWRITE_FAVORITES_COLLECTION_ID;
const usersCollectionId = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID;

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);

// Configure CORS for production
const isProd = window.location.hostname !== "localhost";
if (isProd) {
  client.setSelfSigned(false); // Ensure SSL verification in production
}

const account = new Account(client);
const databases = new Databases(client);

export const createAccount = async (email, password, username, level) => {
  try {
    const userId = ID.unique();

    const newAccount = await account.create(userId, email, password, username);
    if (!newAccount) {
      throw new Error("Failed to create account");
    }

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        userId: userId,
        username: username,
        email: email,
        developer_level: level,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error("Failed to sign in");
    }
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    try {
      const session = await account.getSession("current");
      if (!session) return null;
    } catch (error) {
      return null;
    }

    try {
      const user = await account.get();
      if (!user) return null;

      const users = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [Query.equal("userId", user.$id)]
      );

      if (!users || users.documents.length === 0) return null;
      return users.documents[0];
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};
