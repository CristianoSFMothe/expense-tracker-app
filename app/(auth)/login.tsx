import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { z } from "zod";

// Schema de validação
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
type LoginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: loginUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    const response = await loginUser(data.email, data.password);
    setIsLoading(false);

    if (!response.success) {
      Alert.alert("Entrar", response.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Olá,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            bem-vindo de volta!
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Faça login agora para acompanhar suas despesas
          </Typo>

          {/* Campo Email */}
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

          {/* Campo Senha */}
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

          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Esqueceu a senha?
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Entrar
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Não tem uma conta?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/register")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Inscrever-se
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
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
});
