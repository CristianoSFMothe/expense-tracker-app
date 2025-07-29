import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";

import * as Icons from "phosphor-react-native";

import { walletSchema, WalletSchemaType } from "@/schemas/walletSchema";

const WalletModal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const oldWallet: { name: string; image: string; id: string } =
    useLocalSearchParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WalletSchemaType>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  useEffect(() => {
    if (oldWallet?.id) {
      setValue("name", oldWallet.name);
      setValue("image", oldWallet.image);
    }
  }, [oldWallet, setValue]);

  const onSubmit = async (data: WalletSchemaType) => {
    const payload = {
      ...data,
      uid: user?.uid,
      id: oldWallet?.id,
    };

    const response = await createOrUpdateWallet(payload);

    if (response.success) {
      router.back();
    } else {
      Alert.alert("Carteira", response.msg || "Erro ao criar carteira");
    }
  };

  const onDelete = async () => {
    if (!oldWallet?.id) return;

    const response = await deleteWallet(oldWallet.id);

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
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => onDelete(), style: "destructive" },
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

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Carteira</Typo>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    placeholder="Nome da carteira"
                    value={value}
                    onChangeText={onChange}
                    accessibilityLabel="Input Wallet Nome"
                  />
                  {errors.name && (
                    <Typo color={colors.rose} size={12}>
                      {errors.name.message}
                    </Typo>
                  )}
                </>
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Carteira ícone</Typo>
            <Controller
              control={control}
              name="image"
              render={({ field: { value, onChange } }) => (
                <>
                  <ImageUpload
                    file={value}
                    onClear={() => onChange(null)}
                    onSelect={(file) => onChange(file)}
                    placeholder="Upload imagem"
                  />
                  {errors.image && (
                    <Typo color={colors.rose} size={12}>
                      {errors.image.message}
                    </Typo>
                  )}
                </>
              )}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {oldWallet?.id && !isSubmitting && (
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
          onPress={handleSubmit(onSubmit)}
          style={{ flex: 1 }}
          loading={isSubmitting}
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
  inputContainer: {
    gap: spacingY._10,
  },
});
