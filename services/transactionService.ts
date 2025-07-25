import { firestore } from "@/config/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>,
): Promise<ResponseType> => {
  try {
    const { id, type, walletId, amount, image } = transactionData;

    if (!amount || amount <= 0 || !type || !walletId) {
      return { success: false, msg: "Dados de transação inválidos!" };
    }

    if (id) {
      // TODO: update transaction
    } else {
      let response = await updateWalletForNewTransaction(
        walletId!,
        Number(amount),
        type,
      );

      if (!response.success) return response;
    }

    if (image) {
      const imageUploadResponse = await uploadFileToCloudinary(
        image,
        "transactions",
      );

      if (!imageUploadResponse.success) {
        return {
          success: false,
          msg: imageUploadResponse.msg || "Falha ao enviar imagem de receita",
        };
      }

      transactionData.image = imageUploadResponse.data;
    }

    const transactionRef = id
      ? doc(firestore, "transactions", id)
      : doc(collection(firestore, "transactions"));

    await setDoc(transactionRef, transactionData, { merge: true });

    return {
      success: true,
      data: { ...transactionData, id: transactionRef.id },
    };
  } catch (error: any) {
    console.log("Erro ao create ou atualizar transação: ", error);
    return {
      success: false,
      msg: error.message,
    };
  }
};

const updateWalletForNewTransaction = async (
  walletId: string,
  amount: number,
  type: string,
) => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);

    const walletSnapshot = await getDoc(walletRef);

    if (!walletSnapshot.exists()) {
      return { success: false, msg: "Carteira não encontrada!" };
    }

    const walletData = walletSnapshot.data() as WalletType;

    if (type === "expense" && walletData.amount! - amount < 0) {
      return {
        success: false,
        msg: "A carteira selecionada não tem saldo suficiente!",
      };
    }

    const updatedType = type === "income" ? "totalIncome" : "totalExpenses";
    const updatedWalletAmount =
      type === "income"
        ? Number(walletData.amount) + amount
        : Number(walletData.amount) - amount;

    const updatedTotals =
      type === "income"
        ? Number(walletData.totalIncome) + amount
        : Number(walletData.totalExpenses) + amount;

    await updateDoc(walletRef, {
      amount: updatedWalletAmount,
      [updatedType]: updatedTotals,
    });

    return { success: true };
  } catch (error: any) {
    console.log("Erro ao atualizar carteira para uma nova transação: ", error);
    return {
      success: false,
      msg: error.message,
    };
  }
};
