import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { registerSchema, RegisterSchemaType } from "@/schemas/registerSchema";
import { verticalScale } from "@/utils/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setIsLoading(true);

    const response = await registerUser(data.email, data.password, data.name);

    setIsLoading(false);

    if (!response.success) {
      Alert.alert("Cadastrar", response.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Vamos,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Começar
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Crie uma conta para controlar suas despesas
          </Typo>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe seu nome"
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
                icon={
                  <Icons.UserIcon
                    size={verticalScale(26)}
                    color={colors.neutral300}
                    weight="fill"
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe seu e-mail"
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                icon={
                  <Icons.AtIcon
                    size={verticalScale(26)}
                    color={colors.neutral300}
                    weight="fill"
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe sua senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                icon={
                  <Icons.LockIcon
                    size={verticalScale(26)}
                    color={colors.neutral300}
                    weight="fill"
                  />
                }
              />
            )}
          />

          <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Cadastrar
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Já tem uma conta?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Entrar
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
