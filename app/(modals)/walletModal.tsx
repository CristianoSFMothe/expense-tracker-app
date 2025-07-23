import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const WalletModal = () => {
  const { user, updateUserData } = useAuth();
  const router = useRouter();

  const oldWallet: { name: string; image: string; id: string } =
    useLocalSearchParams();

  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });

  useEffect(() => {
    if (oldWallet?.id) {
      setWallet({
        name: oldWallet.name,
        image: oldWallet.image,
      });
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    let { name, image } = wallet;

    if (!name.trim() || !image) {
      Alert.alert("Carteira", "Por favor, preencha todos os campos.");
      return;
    }

    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    };

    if (oldWallet?.id) data.id = oldWallet?.id;

    setIsLoading(true);

    const response = await createOrUpdateWallet(data);

    setIsLoading(false);

    if (response.success) {
      // TODO: Adicionar um toast como "Carteira criada com sucesso"
      router.back();
    } else {
      Alert.alert("Carteira", response.msg || "Erro ao criar carteira");
      // TODO: Adicionar um toast de erro
    }
  };

  const onDelete = async () => {
    if (!oldWallet?.id) return;

    setIsLoading(true);

    const response = await deleteWallet(oldWallet?.id);

    setIsLoading(false);

    if (response.success) {
      router.back();
    } else {
      Alert.alert("Carteira", response.msg || "Erro ao deletar carteira");
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja fazer isso? \nEsta ação removerá todas as transações relacionadas a esta carteira.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => onDelete(),
          style: "destructive",
        },
      ],
    );
  };

  return (
    <ModalWrapper style={styles.container}>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "Editar carteira" : "Nova carteira"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* Form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View
            style={styles.inputContainer}
            accessible={true}
            accessibilityLabel="Campo de nome da carteira"
            testID="input-name-container"
          >
            <Typo color={colors.neutral200}>Carteira</Typo>
            <Input
              placeholder="Nome da carteira"
              value={wallet.name}
              onChangeText={(value) => setWallet({ ...wallet, name: value })}
              accessibilityLabel="Input Wallet Nome"
              testID="input-wallet-name"
            />
          </View>

          <View
            style={styles.inputContainer}
            accessible={true}
            // accessibilityLabel="Campo de nome da carteira"
            // testID="input-name-container"
          >
            <Typo color={colors.neutral200}>Carteira ícone</Typo>
            {/* Image input */}
            <ImageUpload
              file={wallet.image}
              onClear={() => setWallet({ ...wallet, image: null })}
              onSelect={(file) => setWallet({ ...wallet, image: file })}
              placeholder="Upload imagem"
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {oldWallet?.id && !isLoading && (
          <Button
            onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.TrashIcon
              color={colors.white}
              size={verticalScale(24)}
              weight="bold"
            />
          </Button>
        )}
        <Button
          onPress={onSubmit}
          style={{ flex: 1 }}
          loading={isLoading}
          accessibilityLabel="Botão Atualizar"
          testID="submit-button"
        >
          <Typo color={colors.black} fontWeight={"700"}>
            {oldWallet?.id ? "Atualizar carteira" : "Adicionar carteira"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: spacingX._20,
    gap: scale(10),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
