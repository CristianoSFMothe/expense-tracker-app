import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (
  uuid: string,
  updatedData: UserDataType,
): Promise<ResponseType> => {
  try {
    const userRef = doc(firestore, "users", uuid);

    await updateDoc(userRef, updatedData);

    return { success: true, msg: "User updated successfully" };
  } catch (error: any) {
    console.log("Error updating user:", error);

    return { success: false, msg: error?.message };
  }
};
