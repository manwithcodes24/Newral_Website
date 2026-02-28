import { account } from "./appwrite";

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};